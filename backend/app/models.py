"""
SQLAlchemy ORM models for the portfolio database.
Defines 6 tables: Project, About, SocialLink, Skill, TimelineEntry, Message.
"""

from datetime import date, datetime, timezone

from sqlalchemy import Boolean, Column, Integer, String, Text, Date, DateTime

from app.database import Base


class Project(Base):
    """Portfolio project — design work, video edits, motion graphics, branding."""
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    category = Column(String, nullable=False)  # 'design' | 'video' | 'motion' | 'branding'
    thumbnail_url = Column(String, nullable=False)
    video_url = Column(String, nullable=True)
    live_link = Column(String, nullable=True)
    download_url = Column(String, nullable=True)
    download_filename = Column(String, nullable=True)
    tags = Column(String, nullable=False, default="")  # Comma-separated tags
    created_at = Column(Date, default=date.today)
    featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)


class About(Base):
    """Single-row table holding the portfolio owner's bio and info."""
    __tablename__ = "about"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    tagline = Column(String, nullable=False)
    bio = Column(Text, nullable=False)
    photo_url = Column(String, nullable=False, default="")
    resume_url = Column(String, nullable=True)
    availability = Column(String, default="available")  # 'available' | 'busy' | 'unavailable'


class SocialLink(Base):
    """Social media / external profile links displayed in the portfolio."""
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    platform = Column(String, nullable=False)
    url = Column(String, nullable=False)
    icon = Column(String, nullable=False)  # react-icons component name
    username = Column(String, nullable=False)
    sort_order = Column(Integer, default=0)


class Skill(Base):
    """Creative tool / skill with proficiency level."""
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    icon = Column(String, nullable=False)
    proficiency = Column(Integer, nullable=False)  # 0–100
    category = Column(String, nullable=False)  # 'design' | 'video'


class TimelineEntry(Base):
    """Work experience or education entry for the résumé timeline."""
    __tablename__ = "timeline_entries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, nullable=False)
    organization = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    start_date = Column(String, nullable=False)  # e.g. "2023"
    end_date = Column(String, nullable=True)       # e.g. "Present" or null
    type = Column(String, nullable=False)           # 'work' | 'education'
    sort_order = Column(Integer, default=0)


class Message(Base):
    """Contact-form message submitted by a visitor."""
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sender_name = Column(String, nullable=False)
    sender_email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    is_read = Column(Boolean, default=False)
