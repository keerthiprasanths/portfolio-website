"""
Skills routes — list and create.
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Skill
from app.schemas import SkillCreate, SkillResponse

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("/", response_model=list[SkillResponse])
def list_skills(db: Session = Depends(get_db)):
    """Return all skills."""
    return db.query(Skill).all()


@router.post("/", response_model=SkillResponse, status_code=201)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    """Add a new skill."""
    db_skill = Skill(**skill.model_dump())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill
