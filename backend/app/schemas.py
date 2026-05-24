"""
Pydantic v2 schemas for request validation and response serialization.
Each model has Base (shared fields), Create (input), and Response (output) variants.
"""

from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


# ── Projects ──────────────────────────────────────────────────────────────────

class ProjectBase(BaseModel):
    title: str
    description: str
    category: str
    thumbnail_url: str
    video_url: Optional[str] = None
    live_link: Optional[str] = None
    download_url: Optional[str] = None
    download_filename: Optional[str] = None
    tags: str = ""
    featured: bool = False
    sort_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectResponse(ProjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: date


# ── About ─────────────────────────────────────────────────────────────────────

class AboutBase(BaseModel):
    name: str
    tagline: str
    bio: str
    photo_url: str = ""
    resume_url: Optional[str] = None
    availability: str = "available"


class AboutUpdate(AboutBase):
    pass


class AboutResponse(AboutBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ── Social Links ──────────────────────────────────────────────────────────────

class SocialLinkBase(BaseModel):
    platform: str
    url: str
    icon: str
    username: str
    sort_order: int = 0


class SocialLinkCreate(SocialLinkBase):
    pass


class SocialLinkResponse(SocialLinkBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ── Skills ────────────────────────────────────────────────────────────────────

class SkillBase(BaseModel):
    name: str
    icon: str
    proficiency: int
    category: str


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ── Timeline ──────────────────────────────────────────────────────────────────

class TimelineBase(BaseModel):
    title: str
    organization: str
    description: str
    start_date: str
    end_date: Optional[str] = None
    type: str
    sort_order: int = 0


class TimelineCreate(TimelineBase):
    pass


class TimelineResponse(TimelineBase):
    model_config = ConfigDict(from_attributes=True)

    id: int


# ── Messages ──────────────────────────────────────────────────────────────────

class MessageBase(BaseModel):
    sender_name: str
    sender_email: str
    subject: str
    message: str


class MessageCreate(MessageBase):
    pass


class MessageResponse(MessageBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    is_read: bool
