"""
Message routes — contact form submissions.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Message
from app.schemas import MessageCreate, MessageResponse

router = APIRouter(prefix="/messages", tags=["Messages"])


@router.get("/", response_model=list[MessageResponse])
def list_messages(db: Session = Depends(get_db)):
    """Return all messages, newest first."""
    return db.query(Message).order_by(Message.created_at.desc()).all()


@router.post("/", response_model=MessageResponse, status_code=201)
def create_message(message: MessageCreate, db: Session = Depends(get_db)):
    """Submit a new contact-form message."""
    db_message = Message(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


@router.put("/{message_id}/read", response_model=MessageResponse)
def mark_message_read(message_id: int, db: Session = Depends(get_db)):
    """Mark a message as read."""
    db_message = db.query(Message).filter(Message.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    db_message.is_read = True
    db.commit()
    db.refresh(db_message)
    return db_message
