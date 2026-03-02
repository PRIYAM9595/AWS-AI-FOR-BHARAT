
# SkillGPS UI Design

## Services
- `client` (Vite + React): runs on `http://localhost:5173`
- `server` (Node + Express): runs on `http://localhost:5000`
- `python_server` (FastAPI recommender): runs on `http://127.0.0.1:8000`

## Setup
1. Install dependencies:
   - `cd client && npm install`
   - `cd ../server && npm install`
   - `cd ../python_server && pip install -r requirements.txt`
2. Create env files:
   - `client/.env` from `client/.env.example`
   - `server/.env` from `server/.env.example`

## Run
1. Start Python backend:
   - `cd python_server && python app.py`
2. Start Node backend:
   - `cd server && npm run dev`
3. Start frontend:
   - `cd client && npm run dev`
  
