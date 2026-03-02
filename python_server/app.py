from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pathlib import Path
import re
from career_simulation_model import simulate_career

app = FastAPI(title="SkillGPS Recommendation Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


def normalize_text(value):
    text = str(value or "").lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    return re.sub(r"\s+", " ", text).strip()


try:
    data_path = Path(__file__).resolve().parent / "courses.csv"
    df = pd.read_csv(data_path)
    df["title"] = df["title"].fillna("")
    df["category"] = df["category"].fillna("")
    df["skills_covered"] = df["skills_covered"].fillna("")
    df["difficulty"] = df["difficulty"].fillna("Intermediate")
    df["search_text"] = (
        df["title"] + " " + df["category"] + " " + df["skills_covered"] + " " + df["difficulty"]
    ).apply(normalize_text)

    vectorizer = TfidfVectorizer(stop_words="english")
    course_vectors = vectorizer.fit_transform(df["search_text"])
except Exception as e:
    print(f"Warning: Failed to initialize recommendation engine. Error: {e}")
    df = None
    vectorizer = None
    course_vectors = None


class RecommendationRequest(BaseModel):
    extracted_skills: list[str] = []
    target_role: str | None = None
    search_query: str | None = None
    difficulty: str | None = None
    max_results: int = 6


class CareerSimulationRequest(BaseModel):
    role: str | None = None
    selected_skills: list[str] = []
    experience_years: int = 0
    resume_skills: list[str] = []


@app.post("/api/recommend")
async def get_recommendations(req: RecommendationRequest):
    if df is None or vectorizer is None or course_vectors is None:
        raise HTTPException(status_code=500, detail="Recommendation engine not initialized properly.")

    role_text = normalize_text(req.target_role)
    skill_text = " ".join(normalize_text(skill) for skill in req.extracted_skills if skill)
    search_text = normalize_text(req.search_query)
    query_text = " ".join(part for part in [role_text, skill_text, search_text] if part).strip()

    candidate_df = df
    if req.difficulty and req.difficulty.lower() != "any":
        difficulty_norm = req.difficulty.strip().lower()
        candidate_df = df[df["difficulty"].str.lower() == difficulty_norm]

    if candidate_df.empty:
        candidate_df = df

    max_results = max(1, min(int(req.max_results or 6), len(candidate_df)))

    if not query_text:
        base = candidate_df.sort_values(by=["difficulty", "duration_hours", "course_id"], ascending=[True, True, True]).head(max_results).copy()
        base["match_score"] = 0.0
        return {
            "query": "",
            "recommendations": base.to_dict(orient="records")
        }

    candidate_vectors = course_vectors[candidate_df.index]
    if search_text:
        search_vector = vectorizer.transform([search_text])
        search_sim = cosine_similarity(search_vector, candidate_vectors).flatten()

        base_query = " ".join(part for part in [role_text, skill_text] if part).strip()
        if base_query:
            base_vector = vectorizer.transform([base_query])
            base_sim = cosine_similarity(base_vector, candidate_vectors).flatten()
        else:
            base_sim = pd.Series([0.0] * len(candidate_df)).to_numpy()

        sim_scores = (0.7 * search_sim) + (0.3 * base_sim)
    else:
        user_vector = vectorizer.transform([query_text])
        sim_scores = cosine_similarity(user_vector, candidate_vectors).flatten()

    query_tokens = set(query_text.split())
    lexical_boost = []
    for _, row in candidate_df.iterrows():
        row_tokens = set(normalize_text(row["title"] + " " + row["skills_covered"]).split())
        overlap = len(query_tokens.intersection(row_tokens))
        lexical_boost.append(overlap / max(1, len(query_tokens)))

    blended_scores = (0.85 * sim_scores) + (0.15 * pd.Series(lexical_boost).to_numpy())
    ranked_indices = blended_scores.argsort()[::-1][:max_results]
    ranked_df = candidate_df.iloc[ranked_indices].copy()
    ranked_df["match_score"] = [float(blended_scores[i]) for i in ranked_indices]

    return {
        "query": query_text,
        "recommendations": ranked_df.to_dict(orient="records")
    }


@app.post("/api/career-simulation-model")
async def career_simulation_model(req: CareerSimulationRequest):
    payload = simulate_career(
        role=req.role,
        selected_skills=req.selected_skills,
        experience_years=req.experience_years,
        resume_skills=req.resume_skills
    )
    return payload


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
