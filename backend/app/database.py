"""
Database configuration and session management.
Uses SQLite with SQLAlchemy for the portfolio backend.
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database URL — file stored in project root
SQLALCHEMY_DATABASE_URL = "sqlite:///./portfolio.db"

# Create engine with SQLite-specific setting to allow multi-threaded access
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

# Session factory — no autocommit/autoflush so we control transactions explicitly
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative base for all ORM models
Base = declarative_base()


def get_db():
    """FastAPI dependency that provides a database session per request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
