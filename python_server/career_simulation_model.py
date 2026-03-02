from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

DATA_DIR = Path(__file__).resolve().parent / "data"
FEATURE_COLS = [
    "Experience",
    "DemandScore",
    "SkillLevel",
    "LearningMonths",
    "JobOpenings",
    "HoursPerWeek",
    "CapitalGain",
    "CapitalLoss",
    "EngineeringSkillIndex",
    "PortfolioStrength",
]

ADULT_COLUMNS = [
    "age",
    "workclass",
    "fnlwgt",
    "education",
    "educational-num",
    "marital-status",
    "occupation",
    "relationship",
    "race",
    "gender",
    "capital-gain",
    "capital-loss",
    "hours-per-week",
    "native-country",
    "income",
]

ROLE_LIBRARY: dict[str, dict[str, Any]] = {
    "Software Engineer": {
        "demand": 8,
        "skill": 3,
        "openings": 1900,
        "learning_months": 6,
        "salary_factor": 1.06,
        "growth_rate": 0.010,
        "core_skills": ["python", "java", "node.js", "system design", "sql", "docker"],
        "overview": "Build and scale production-grade software systems across backend, APIs, and platform services.",
        "industries": ["SaaS", "FinTech", "E-commerce"],
        "responsibilities": ["Design robust APIs", "Write maintainable production code", "Improve system performance"],
        "certifications": ["AWS Cloud Practitioner", "Oracle Java Foundations", "Docker Certified Associate"],
        "tools": ["Git", "Docker", "PostgreSQL", "CI/CD"]
    },
    "Data Scientist": {
        "demand": 8,
        "skill": 4,
        "openings": 1400,
        "learning_months": 8,
        "salary_factor": 1.10,
        "growth_rate": 0.011,
        "core_skills": ["python", "machine learning", "sql", "statistics", "pandas", "numpy"],
        "overview": "Translate business problems into data models, insights, and predictive decision systems.",
        "industries": ["HealthTech", "FinTech", "Retail Analytics"],
        "responsibilities": ["Build prediction models", "Create insight dashboards", "Run A/B experiments"],
        "certifications": ["Google Data Analytics", "IBM Data Science", "Azure AI Fundamentals"],
        "tools": ["Python", "Jupyter", "Scikit-learn", "Power BI"]
    },
    "Cloud Engineer": {
        "demand": 9,
        "skill": 4,
        "openings": 1600,
        "learning_months": 7,
        "salary_factor": 1.12,
        "growth_rate": 0.012,
        "core_skills": ["aws", "kubernetes", "docker", "terraform", "linux", "networking"],
        "overview": "Design secure cloud infrastructure, automate deployment pipelines, and optimize reliability.",
        "industries": ["SaaS", "EdTech", "Enterprise IT"],
        "responsibilities": ["Deploy scalable infra", "Set up monitoring", "Manage cloud cost and reliability"],
        "certifications": ["AWS Solutions Architect", "CKA", "Terraform Associate"],
        "tools": ["AWS", "Terraform", "Kubernetes", "Prometheus"]
    },
    "DevOps Engineer": {
        "demand": 9,
        "skill": 4,
        "openings": 1500,
        "learning_months": 7,
        "salary_factor": 1.10,
        "growth_rate": 0.011,
        "core_skills": ["ci/cd", "docker", "kubernetes", "linux", "aws", "monitoring"],
        "overview": "Bridge development and operations through automation, release engineering, and SRE practices.",
        "industries": ["Cloud Platforms", "SaaS", "Banking Tech"],
        "responsibilities": ["Automate deployments", "Build CI/CD pipelines", "Improve uptime"],
        "certifications": ["AWS DevOps Engineer", "CKAD", "Jenkins Engineer"],
        "tools": ["Jenkins", "GitHub Actions", "Kubernetes", "Grafana"]
    },
    "Cybersecurity Analyst": {
        "demand": 8,
        "skill": 4,
        "openings": 1200,
        "learning_months": 8,
        "salary_factor": 1.09,
        "growth_rate": 0.010,
        "core_skills": ["network security", "siem", "python", "risk", "incident response"],
        "overview": "Protect systems through threat detection, response workflows, and proactive security hardening.",
        "industries": ["Finance", "Healthcare", "GovTech"],
        "responsibilities": ["Monitor security alerts", "Perform risk assessment", "Drive incident response"],
        "certifications": ["CompTIA Security+", "CEH", "CISSP"],
        "tools": ["Splunk", "Wireshark", "SIEM", "IAM"]
    },
    "Product Manager": {
        "demand": 7,
        "skill": 3,
        "openings": 1100,
        "learning_months": 6,
        "salary_factor": 1.08,
        "growth_rate": 0.009,
        "core_skills": ["roadmapping", "analytics", "communication", "prioritization", "agile"],
        "overview": "Own product strategy, define roadmap priorities, and align cross-functional teams.",
        "industries": ["Consumer Apps", "SaaS", "E-commerce"],
        "responsibilities": ["Define roadmap", "Write PRDs", "Coordinate engineering and business teams"],
        "certifications": ["Product School", "Scrum Product Owner", "Google PM"],
        "tools": ["Jira", "Notion", "Mixpanel", "Figma"]
    },
    "UI/UX Designer": {
        "demand": 7,
        "skill": 3,
        "openings": 1000,
        "learning_months": 5,
        "salary_factor": 1.00,
        "growth_rate": 0.008,
        "core_skills": ["figma", "wireframing", "ux research", "design systems", "prototyping"],
        "overview": "Craft user-centered product experiences through research, interaction design, and usability testing.",
        "industries": ["Consumer Internet", "EdTech", "Design Agencies"],
        "responsibilities": ["Build wireframes", "Run user testing", "Design reusable systems"],
        "certifications": ["Google UX", "Nielsen Norman UX", "Interaction Design Foundation"],
        "tools": ["Figma", "Adobe XD", "Miro", "Hotjar"]
    },
    "QA Automation Engineer": {
        "demand": 7,
        "skill": 3,
        "openings": 1050,
        "learning_months": 5,
        "salary_factor": 1.02,
        "growth_rate": 0.009,
        "core_skills": ["selenium", "api testing", "python", "test strategy", "ci/cd"],
        "overview": "Ensure software quality via robust automation frameworks and release confidence checks.",
        "industries": ["SaaS", "E-commerce", "Enterprise Software"],
        "responsibilities": ["Automate regression tests", "Design test strategy", "Improve release quality"],
        "certifications": ["ISTQB", "Selenium WebDriver", "Postman API Testing"],
        "tools": ["Selenium", "Cypress", "Postman", "Jenkins"]
    },
}


@dataclass
class TrainedCareerModel:
    model: LinearRegression
    occupation_encoder: LabelEncoder
    workclass_encoder: LabelEncoder
    metrics: dict[str, float]
    training_rows: int


_MODEL_CACHE: TrainedCareerModel | None = None


def _normalize_skill(skill: str) -> str:
    return str(skill or "").strip().lower()


def _load_adult_raw_df() -> pd.DataFrame | None:
    candidates = [
        DATA_DIR / "adult.data",
        DATA_DIR / "adult.csv",
        Path(__file__).resolve().parent / "adult.data",
        Path(__file__).resolve().parent / "adult.csv",
    ]

    for candidate in candidates:
        if not candidate.exists():
            continue

        if candidate.suffix.lower() == ".csv":
            raw = pd.read_csv(candidate)
            cols = {c.lower(): c for c in raw.columns}
            if "educational-num" not in cols and "education-num" in cols:
                raw = raw.rename(columns={cols["education-num"]: "educational-num"})
            return raw

        raw = pd.read_csv(candidate, header=None, names=ADULT_COLUMNS, skipinitialspace=True)
        return raw

    return None


def _synthetic_fallback_df(rows: int = 4000) -> pd.DataFrame:
    rng = np.random.default_rng(42)
    occupations = [
        "Software Engineer", "Data Scientist", "Cloud Engineer", "DevOps Engineer",
        "QA Engineer", "Support Specialist", "Business Analyst", "Product Manager"
    ]
    workclasses = ["Private", "Self-emp", "Government", "Contract"]

    age = rng.integers(21, 58, size=rows)
    hours = rng.integers(30, 58, size=rows)
    education_num = rng.integers(8, 17, size=rows)
    occupation = rng.choice(occupations, size=rows)
    workclass = rng.choice(workclasses, size=rows)
    capital_gain = rng.choice([0, 0, 0, 0, 5000, 10000, 15000], size=rows)
    capital_loss = rng.choice([0, 0, 0, 0, 1200, 2200], size=rows)

    df = pd.DataFrame(
        {
            "age": age,
            "workclass": workclass,
            "occupation": occupation,
            "educational-num": education_num,
            "hours-per-week": hours,
            "capital-gain": capital_gain,
            "capital-loss": capital_loss,
        }
    )

    high_income_signal = (
        (education_num >= 12).astype(int)
        + (hours >= 42).astype(int)
        + np.array([1 if "Engineer" in x or "Scientist" in x or "Manager" in x else 0 for x in occupation])
        + (capital_gain > 0).astype(int)
    )
    df["income"] = np.where(high_income_signal >= 2, ">50K", "<=50K")
    return df


def _clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    data = df.copy()

    if "education-num" in data.columns and "educational-num" not in data.columns:
        data = data.rename(columns={"education-num": "educational-num"})

    required_defaults = {
        "age": 30,
        "occupation": "Unknown",
        "workclass": "Private",
        "educational-num": 10,
        "hours-per-week": 40,
        "capital-gain": 0,
        "capital-loss": 0,
        "income": "<=50K",
    }

    for col, default in required_defaults.items():
        if col not in data.columns:
            data[col] = default

    for col in ["occupation", "workclass", "income"]:
        data[col] = data[col].astype(str).str.strip().replace("?", "Unknown")

    numeric_cols = ["age", "educational-num", "hours-per-week", "capital-gain", "capital-loss"]
    for col in numeric_cols:
        data[col] = pd.to_numeric(data[col], errors="coerce").fillna(required_defaults[col])

    return data


def _build_career_features(data: pd.DataFrame) -> tuple[pd.DataFrame, LabelEncoder, LabelEncoder]:
    le_occ = LabelEncoder()
    le_work = LabelEncoder()

    occupation_enc = le_occ.fit_transform(data["occupation"].astype(str))
    workclass_enc = le_work.fit_transform(data["workclass"].astype(str))

    career_df = pd.DataFrame()
    career_df["Experience"] = (data["age"] - 18).clip(lower=0)
    career_df["DemandScore"] = (occupation_enc % 10) + 1

    career_df["SkillLevel"] = pd.cut(
        data["educational-num"],
        bins=[0, 6, 9, 12, 16, 30],
        labels=[1, 2, 3, 4, 5],
        include_lowest=True,
    ).astype(int)

    career_df["LearningMonths"] = career_df["SkillLevel"] * 3
    career_df["JobOpenings"] = (occupation_enc * 120) + (workclass_enc * 80) + 500
    career_df["HoursPerWeek"] = data["hours-per-week"].clip(lower=10, upper=80)
    career_df["CapitalGain"] = data["capital-gain"].clip(lower=0)
    career_df["CapitalLoss"] = data["capital-loss"].clip(lower=0)

    engineering_keywords = ["engineer", "developer", "architect", "scientist", "devops", "cloud", "data", "qa"]
    occ_lower = data["occupation"].str.lower()
    engineering_bonus = occ_lower.apply(lambda x: 1 if any(k in x for k in engineering_keywords) else 0)

    career_df["EngineeringSkillIndex"] = (
        career_df["SkillLevel"]
        + engineering_bonus
        + (career_df["DemandScore"] >= 7).astype(int)
    )

    career_df["PortfolioStrength"] = (
        (career_df["HoursPerWeek"] / 10.0)
        + (career_df["CapitalGain"] > 0).astype(int)
        + (career_df["LearningMonths"] / 6.0)
    ).clip(lower=1)

    income_text = data["income"].astype(str)
    base_salary = income_text.apply(lambda x: 1_200_000 if ">50K" in x else 420_000)

    career_df["Salary"] = (
        base_salary
        + (career_df["DemandScore"] * 32_000)
        + (career_df["EngineeringSkillIndex"] * 21_000)
        + (career_df["HoursPerWeek"] * 2_200)
        + np.where(career_df["CapitalGain"] > 0, 85_000, 0)
        - np.where(career_df["CapitalLoss"] > 0, 22_000, 0)
    ).astype(int)

    return career_df, le_occ, le_work


def _train_model() -> TrainedCareerModel:
    raw_df = _load_adult_raw_df()
    if raw_df is None:
        raw_df = _synthetic_fallback_df()

    clean_df = _clean_dataframe(raw_df)
    career_df, le_occ, le_work = _build_career_features(clean_df)

    X = career_df[FEATURE_COLS]
    y = career_df["Salary"]

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    model = LinearRegression()
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    r2 = float(r2_score(y_test, y_pred))

    return TrainedCareerModel(
        model=model,
        occupation_encoder=le_occ,
        workclass_encoder=le_work,
        metrics={"r2": round(r2, 3)},
        training_rows=len(career_df),
    )


def _get_model() -> TrainedCareerModel:
    global _MODEL_CACHE
    if _MODEL_CACHE is None:
        _MODEL_CACHE = _train_model()
    return _MODEL_CACHE


def _role_from_request(role: str | None, skills: list[str]) -> str:
    if role and role in ROLE_LIBRARY:
        return role

    lower = {_normalize_skill(s) for s in skills}
    if any(s in lower for s in ["aws", "kubernetes", "terraform", "cloud"]):
        return "Cloud Engineer"
    if any(s in lower for s in ["machine learning", "data science", "pytorch", "tensorflow"]):
        return "Data Scientist"
    if any(s in lower for s in ["qa", "selenium", "cypress", "testing"]):
        return "QA Automation Engineer"
    return "Software Engineer"


def _skill_level_from_skills(skills: list[str], role_cfg: dict[str, Any]) -> int:
    lower = {_normalize_skill(s) for s in skills}
    role_core = {_normalize_skill(s) for s in role_cfg.get("core_skills", [])}
    overlap = len(lower.intersection(role_core))

    base = int(role_cfg.get("skill", 3))
    if overlap >= 4:
        return min(5, base + 2)
    if overlap >= 2:
        return min(5, base + 1)
    if overlap == 0:
        return max(1, base - 1)
    return base


def _build_user_feature_row(skills: list[str], experience_years: int, role_cfg: dict[str, Any]) -> pd.DataFrame:
    demand = int(role_cfg.get("demand", 7))
    skill_level = _skill_level_from_skills(skills, role_cfg)
    learning_months = int(role_cfg.get("learning_months", 6))
    openings = int(role_cfg.get("openings", 1200))

    engineering_index = min(10, skill_level + (1 if demand >= 8 else 0) + (1 if len(skills) >= 5 else 0))
    portfolio_strength = min(10.0, 2.5 + (len(skills) * 0.35) + (skill_level * 0.55) + (experience_years * 0.08))

    row = {
        "Experience": max(0, int(experience_years)),
        "DemandScore": max(1, min(10, demand + (1 if len(skills) >= 6 else 0))),
        "SkillLevel": skill_level,
        "LearningMonths": learning_months,
        "JobOpenings": openings + min(600, len(skills) * 45),
        "HoursPerWeek": 40,
        "CapitalGain": 0,
        "CapitalLoss": 0,
        "EngineeringSkillIndex": engineering_index,
        "PortfolioStrength": portfolio_strength,
    }

    return pd.DataFrame([row], columns=FEATURE_COLS)


def _predict_salary(model_bundle: TrainedCareerModel, role_name: str, years: int, skills: list[str]) -> int:
    role_cfg = ROLE_LIBRARY[role_name]
    row = _build_user_feature_row(skills, years, role_cfg)
    predicted = float(model_bundle.model.predict(row)[0])
    adjusted = predicted * float(role_cfg.get("salary_factor", 1.0))
    return int(max(320_000, min(4_500_000, adjusted)))


def _monthly_projection(start_salary: int, skill_count: int, years: int, role_name: str) -> list[dict[str, int | str]]:
    role_cfg = ROLE_LIBRARY[role_name]
    growth = float(role_cfg.get("growth_rate", 0.009)) + min(0.006, skill_count * 0.0006) + min(0.004, years * 0.0005)
    current = float(start_salary)
    points = []
    for m in range(1, 13):
        current = current * (1 + growth)
        points.append({"month": f"M{m}", "salary": int(current)})
    return points


def _yearly_projection(start_salary: int, role_name: str) -> list[dict[str, int | str]]:
    role_cfg = ROLE_LIBRARY[role_name]
    growth = float(role_cfg.get("growth_rate", 0.009)) * 12.0
    current = float(start_salary)
    result = []
    for year in range(1, 6):
        current = current * (1 + growth)
        result.append({"year": f"Y{year}", "salary": int(current)})
    return result


def simulate_career(
    *,
    role: str | None,
    selected_skills: list[str] | None,
    experience_years: int | None,
    resume_skills: list[str] | None = None,
) -> dict[str, Any]:
    model_bundle = _get_model()

    selected = list(selected_skills or [])
    resume = list(resume_skills or [])
    merged_skills = list(dict.fromkeys([*selected, *resume]))
    if not merged_skills:
        merged_skills = ["problem solving", "software engineering"]

    years = max(0, int(experience_years or 0))
    chosen_role = _role_from_request(role, merged_skills)
    role_cfg = ROLE_LIBRARY[chosen_role]

    salary_now = _predict_salary(model_bundle, chosen_role, years, merged_skills)
    monthly_projection = _monthly_projection(salary_now, len(merged_skills), years, chosen_role)
    yearly_projection = _yearly_projection(salary_now, chosen_role)
    salary_3_year = yearly_projection[2]["salary"] if len(yearly_projection) > 2 else salary_now

    aws_salary = _predict_salary(model_bundle, "Cloud Engineer", years, [*merged_skills, "aws", "kubernetes", "terraform"])
    ds_salary = _predict_salary(model_bundle, "Data Scientist", years, [*merged_skills, "python", "machine learning", "statistics"])
    diff_pct = round(((aws_salary - ds_salary) / max(ds_salary, 1)) * 100, 2)

    benchmarks = []
    for role_name in ROLE_LIBRARY:
        now_val = _predict_salary(model_bundle, role_name, years, merged_skills)
        future_val = _yearly_projection(now_val, role_name)[2]["salary"]
        benchmarks.append(
            {
                "role": role_name,
                "salaryNowINR": int(now_val),
                "salary3YearINR": int(future_val),
                "demandScore": int(ROLE_LIBRARY[role_name]["demand"]),
            }
        )

    benchmarks = sorted(benchmarks, key=lambda x: x["salaryNowINR"], reverse=True)

    top_skills = merged_skills[:7]
    confidence = int(max(55, min(97, 58 + years * 2 + len(merged_skills) * 3 + (model_bundle.metrics.get("r2", 0.0) * 10))))

    scenario = (
        f"For {chosen_role}, your current profile ({years} years, skills: {', '.join(top_skills)}) "
        "shows strong upward potential if you execute focused projects and role-specific depth."
    )

    challenges = [
        "Convert broad learning into profession-specific execution quality.",
        "Build measurable project outcomes that prove business impact.",
        "Improve interview readiness for advanced role expectations."
    ]

    success_metrics = [
        "Ship one portfolio-grade outcome every 3 weeks.",
        "Complete two profession-specific mock interviews weekly.",
        "Track salary-readiness metrics and close top 3 competency gaps."
    ]

    milestones = [
        {"window": "30 Days", "goal": "Foundation + role mapping", "focus": "Core skill gap closure"},
        {"window": "60 Days", "goal": "Execution acceleration", "focus": "Projects + applied depth"},
        {"window": "90 Days", "goal": "Interview conversion", "focus": "Portfolio + case/mock loops"},
    ]

    estimated_impact = (
        f"Current simulated annual pay for {chosen_role}: INR {salary_now:,}. "
        f"3-year projection: INR {int(salary_3_year):,} with disciplined execution."
    )

    return {
        "role": chosen_role,
        "simulation": {
            "scenario": scenario,
            "challenges": challenges,
            "successMetrics": success_metrics,
            "estimatedImpact": estimated_impact,
        },
        "professionDetails": {
            "overview": role_cfg["overview"],
            "industries": role_cfg["industries"],
            "responsibilities": role_cfg["responsibilities"],
            "certifications": role_cfg["certifications"],
            "tools": role_cfg["tools"],
        },
        "meta": {
            "experienceYears": years,
            "skillsConsidered": top_skills,
            "confidence": confidence,
            "modelR2": model_bundle.metrics.get("r2", 0.0),
            "trainingRows": model_bundle.training_rows,
            "salaryNowINR": salary_now,
            "salary3YearINR": int(salary_3_year),
            "demandScore": int(role_cfg["demand"]),
            "learningMonths": int(role_cfg["learning_months"]),
            "pathComparison": {
                "awsPathSalaryINR": aws_salary,
                "dataSciencePathSalaryINR": ds_salary,
                "awsVsDataSciencePct": diff_pct,
            },
        },
        "milestones": milestones,
        "salaryProjection": monthly_projection,
        "yearlyProjection": yearly_projection,
        "marketBenchmarks": benchmarks[:6],
        "availableProfessions": list(ROLE_LIBRARY.keys()),
    }
