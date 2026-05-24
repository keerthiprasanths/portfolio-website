# 🎨 Creative Portfolio Website

A stunning portfolio website for designers & video editors, built with React + FastAPI.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Animations | Motion + CSS Animations |
| Backend | Python FastAPI |
| Database | SQLite |

## Quick Start

### 1. Start the Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
web portfolio/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── styles/      # CSS files
│   │   └── services/    # API service
│   └── index.html
├── backend/           # Python FastAPI
│   ├── app/
│   │   ├── routes/    # API endpoints
│   │   ├── models.py  # Database models
│   │   ├── schemas.py # Pydantic schemas
│   │   └── main.py    # App entry point
│   └── requirements.txt
└── README.md
```

## Features

- 🌙 Dark metallic chrome theme with colorful gradients
- 🪟 Glassmorphism effects throughout
- ✨ Smooth page transitions & micro-animations
- 📱 Fully responsive design
- 🎬 Video player for showreels
- ⬇️ Download button on every project
- 📧 Contact form
- 🔗 Social media integration
