"""
FastAPI application entry point.
- Configures CORS for the React dev server
- Registers all API routers under /api
- Creates tables and seeds sample data on first startup
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine, SessionLocal
from app.models import About  # noqa: F401 — ensure all models are imported for table creation
from app.seed import seed_database

from app.routes import projects, about, social, skills, timeline, messages


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables on startup and seed if the database is empty."""
    # Import models so Base.metadata knows about every table
    import app.models  # noqa: F401

    Base.metadata.create_all(bind=engine)

    # Seed only when the about table is empty (first run)
    db = SessionLocal()
    try:
        if db.query(About).first() is None:
            seed_database(db)
    finally:
        db.close()

    yield  # Application runs here


app = FastAPI(
    title="Portfolio API",
    description="REST API backend for a designer / video editor portfolio",
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS — allow React dev servers ────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register routers under /api ───────────────────────────────────────────────
app.include_router(projects.router, prefix="/api")
app.include_router(about.router, prefix="/api")
app.include_router(social.router, prefix="/api")
app.include_router(skills.router, prefix="/api")
app.include_router(timeline.router, prefix="/api")
app.include_router(messages.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Portfolio API"}
