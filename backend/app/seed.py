"""
Seed the database with impressive sample data for the portfolio.
Called once on first startup when the DB is empty.
"""

from datetime import date

from sqlalchemy.orm import Session

from app.models import About, Project, Skill, SocialLink, TimelineEntry


def seed_database(db: Session) -> None:
    """Populate every table with realistic sample data."""

    # ── About ─────────────────────────────────────────────────────────────
    about = About(
        id=1,
        name="Alex Rivera",
        tagline="Designer & Video Editor — Crafting Visual Stories",
        bio=(
            "I'm a passionate creative professional with over 6 years of experience "
            "spanning brand identity design, video editing, and motion graphics. I "
            "believe every project is an opportunity to tell a story that resonates — "
            "whether it's a 30-second social spot or a complete brand overhaul. My work "
            "blends bold aesthetics with strategic thinking, helping brands stand out in "
            "crowded markets.\n\n"
            "When I'm not pushing pixels or cutting timelines, you'll find me exploring "
            "experimental typography, shooting street photography, or diving into the "
            "latest design trends. I thrive on collaboration and love turning ambitious "
            "ideas into polished, scroll-stopping visuals. Let's create something "
            "extraordinary together."
        ),
        photo_url="/assets/alex-photo.jpg",
        resume_url="/assets/alex-rivera-resume.pdf",
        availability="available",
    )
    db.add(about)

    # ── Projects ──────────────────────────────────────────────────────────
    projects = [
        Project(
            title="Neon Dreams",
            description=(
                "A vibrant brand identity system for a futuristic nightlife venue. "
                "The project included logo design, color palette, typography, "
                "merchandise mockups, and a full social-media kit that captured the "
                "electric energy of the brand."
            ),
            category="design",
            thumbnail_url="/assets/project1.jpg",
            video_url=None,
            live_link="https://neondreams.example.com",
            download_url="/assets/downloads/project1.zip",
            download_filename="NeonDreams-BrandKit.zip",
            tags="branding,identity,logo,nightlife",
            created_at=date(2024, 11, 15),
            featured=True,
            sort_order=1,
        ),
        Project(
            title="Urban Pulse",
            description=(
                "Official music video edit for indie artist Kaia Moon's breakout "
                "single. Shot across downtown LA, the edit combines rapid-fire cuts "
                "with dreamy slow-motion sequences and custom LUT color grading."
            ),
            category="video",
            thumbnail_url="/assets/project2.jpg",
            video_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            live_link=None,
            download_url="/assets/downloads/project2.zip",
            download_filename="UrbanPulse-BTS.zip",
            tags="music video,editing,color grading,indie",
            created_at=date(2024, 9, 20),
            featured=True,
            sort_order=2,
        ),
        Project(
            title="Ethereal Flow",
            description=(
                "A 90-second motion graphics reel showcasing fluid simulations, "
                "particle systems, and kinetic typography. Created in After Effects "
                "and Cinema 4D to demonstrate versatility across 2D and 3D animation."
            ),
            category="motion",
            thumbnail_url="/assets/project3.jpg",
            video_url="https://www.youtube.com/watch?v=ScMzIvxBSi4",
            live_link=None,
            download_url="/assets/downloads/project3.zip",
            download_filename="EtherealFlow-Reel.zip",
            tags="motion graphics,animation,3D,reel",
            created_at=date(2024, 7, 5),
            featured=True,
            sort_order=3,
        ),
        Project(
            title="Luxe Minimal",
            description=(
                "Complete brand identity for a high-end skincare line. The minimal "
                "design language — muted earth tones, refined serif typography, and "
                "foil-stamped packaging — communicates understated luxury."
            ),
            category="branding",
            thumbnail_url="/assets/project4.jpg",
            video_url=None,
            live_link="https://luxeminimal.example.com",
            download_url="/assets/downloads/project4.zip",
            download_filename="LuxeMinimal-Guidelines.zip",
            tags="luxury,branding,packaging,skincare",
            created_at=date(2024, 5, 12),
            featured=False,
            sort_order=4,
        ),
        Project(
            title="Chromatic",
            description=(
                "Color grading and finishing for the award-winning short film "
                "'Chromatic.' The grade transforms flat LOG footage into a richly "
                "saturated, film-emulation look inspired by 1970s cinema."
            ),
            category="video",
            thumbnail_url="/assets/project5.jpg",
            video_url="https://www.youtube.com/watch?v=LXb3EKWsInQ",
            live_link=None,
            download_url="/assets/downloads/project5.zip",
            download_filename="Chromatic-Stills.zip",
            tags="short film,color grading,DaVinci Resolve,cinema",
            created_at=date(2024, 3, 8),
            featured=False,
            sort_order=5,
        ),
        Project(
            title="Geometric Fusion",
            description=(
                "A limited-edition poster series exploring the intersection of "
                "geometric abstraction and organic textures. Each poster uses a "
                "restricted palette and mathematical compositions to create visually "
                "striking artwork."
            ),
            category="design",
            thumbnail_url="/assets/project6.jpg",
            video_url=None,
            live_link=None,
            download_url="/assets/downloads/project6.zip",
            download_filename="GeometricFusion-Posters.zip",
            tags="poster,geometric,abstract,print",
            created_at=date(2024, 1, 22),
            featured=False,
            sort_order=6,
        ),
    ]
    db.add_all(projects)

    # ── Social Links ──────────────────────────────────────────────────────
    socials = [
        SocialLink(platform="Instagram", url="https://instagram.com/alexrivera", icon="FaInstagram", username="@alexrivera", sort_order=1),
        SocialLink(platform="YouTube", url="https://youtube.com/@alexrivera", icon="FaYoutube", username="Alex Rivera", sort_order=2),
        SocialLink(platform="Behance", url="https://behance.net/alexrivera", icon="FaBehance", username="alexrivera", sort_order=3),
        SocialLink(platform="Dribbble", url="https://dribbble.com/alexrivera", icon="FaDribbble", username="alexrivera", sort_order=4),
        SocialLink(platform="LinkedIn", url="https://linkedin.com/in/alexrivera", icon="FaLinkedin", username="Alex Rivera", sort_order=5),
        SocialLink(platform="X", url="https://x.com/alexrivera", icon="FaXTwitter", username="@alexrivera", sort_order=6),
    ]
    db.add_all(socials)

    # ── Skills ────────────────────────────────────────────────────────────
    skills = [
        Skill(name="Photoshop", icon="Ps", proficiency=95, category="design"),
        Skill(name="After Effects", icon="Ae", proficiency=90, category="video"),
        Skill(name="Premiere Pro", icon="Pr", proficiency=92, category="video"),
        Skill(name="Figma", icon="Fg", proficiency=88, category="design"),
        Skill(name="Illustrator", icon="Ai", proficiency=85, category="design"),
        Skill(name="DaVinci Resolve", icon="Dv", proficiency=80, category="video"),
        Skill(name="Cinema 4D", icon="C4D", proficiency=75, category="video"),
        Skill(name="Blender", icon="Bl", proficiency=70, category="design"),
    ]
    db.add_all(skills)

    # ── Timeline ──────────────────────────────────────────────────────────
    timeline = [
        TimelineEntry(
            title="Senior Designer",
            organization="Creative Co",
            description=(
                "Lead visual design for flagship clients, mentor junior designers, "
                "and drive the creative direction of multi-platform campaigns."
            ),
            start_date="2023",
            end_date="Present",
            type="work",
            sort_order=1,
        ),
        TimelineEntry(
            title="Freelance Video Editor",
            organization="Self-Employed",
            description=(
                "Delivered end-to-end video production for indie artists, startups, "
                "and agencies — from storyboarding through final color grade and delivery."
            ),
            start_date="2021",
            end_date="2023",
            type="work",
            sort_order=2,
        ),
        TimelineEntry(
            title="Junior Designer",
            organization="Design Hub",
            description=(
                "Created brand identities, social assets, and print collateral for a "
                "diverse roster of clients across fashion, tech, and hospitality."
            ),
            start_date="2019",
            end_date="2021",
            type="work",
            sort_order=3,
        ),
        TimelineEntry(
            title="BA in Graphic Design",
            organization="Art University",
            description=(
                "Four-year program covering typography, color theory, UX fundamentals, "
                "motion design, and portfolio development. Graduated with honors."
            ),
            start_date="2015",
            end_date="2019",
            type="education",
            sort_order=4,
        ),
    ]
    db.add_all(timeline)

    db.commit()
