"""
Timeline routes — list and create experience/education entries.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import TimelineEntry
from app.schemas import TimelineCreate, TimelineResponse

router = APIRouter(prefix="/timeline", tags=["Timeline"])


@router.get("/", response_model=list[TimelineResponse])
def list_timeline(db: Session = Depends(get_db)):
    """Return all timeline entries ordered by sort_order."""
    return db.query(TimelineEntry).order_by(TimelineEntry.sort_order).all()


@router.post("/", response_model=TimelineResponse, status_code=201)
def create_timeline_entry(entry: TimelineCreate, db: Session = Depends(get_db)):
    """Add a new timeline entry."""
    db_entry = TimelineEntry(**entry.model_dump())
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry
