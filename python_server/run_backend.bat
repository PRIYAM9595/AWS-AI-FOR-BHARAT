@echo off
echo Starting Python Backend in Virtual Environment...
call venv\Scripts\activate
pip install -r requirements.txt
python app.py
pause
