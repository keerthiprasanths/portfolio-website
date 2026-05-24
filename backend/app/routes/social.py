"""
Social link routes — list, create, delete.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import SocialLink
from app.schemas import SocialLinkCreate, SocialLinkResponse

router = APIRouter(prefix="/social", tags=["Social Links"])


@router.get("/", response_model=list[SocialLinkResponse])
def list_social_links(db: Session = Depends(get_db)):
    """Return all social links ordered by sort_order."""
    return db.query(SocialLink).order_by(SocialLink.sort_order).all()


@router.post("/", response_model=SocialLinkResponse, status_code=201)
def create_social_link(link: SocialLinkCreate, db: Session = Depends(get_db)):
    """Add a new social link."""
    db_link = SocialLink(**link.model_dump())
    db.add(db_link)
    db.commit()
    db.refresh(db_link)
    return db_link


@router.delete("/{link_id}", status_code=204)
def delete_social_link(link_id: int, db: Session = Depends(get_db)):
    """Remove a social link by ID."""
    db_link = db.query(SocialLink).filter(SocialLink.id == link_id).first()
    if not db_link:
        raise HTTPException(status_code=404, detail="Social link not found")
    db.delete(db_link)
    db.commit()
