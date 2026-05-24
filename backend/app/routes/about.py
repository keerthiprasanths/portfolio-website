"""
About routes — single-record GET and PUT for the portfolio owner's bio.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import About
from app.schemas import AboutUpdate, AboutResponse

router = APIRouter(prefix="/about", tags=["About"])


@router.get("/", response_model=AboutResponse)
def get_about(db: Session = Depends(get_db)):
    """Return the first (and only) about record."""
    about = db.query(About).first()
    if not about:
        raise HTTPException(status_code=404, detail="About info not found")
    return about


@router.put("/", response_model=AboutResponse)
def update_about(about: AboutUpdate, db: Session = Depends(get_db)):
    """Update the about record (creates one with id=1 if none exists)."""
    db_about = db.query(About).first()
    if not db_about:
        db_about = About(id=1, **about.model_dump())
        db.add(db_about)
    else:
        for key, value in about.model_dump().items():
            setattr(db_about, key, value)
    db.commit()
    db.refresh(db_about)
    return db_about
