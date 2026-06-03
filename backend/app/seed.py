"""
Seed the database with Keerthi Prasanth S's portfolio data.
Called once on first startup when the DB is empty.
"""

from datetime import date

from sqlalchemy.orm import Session

from app.models import About, Project, Skill, SocialLink, TimelineEntry


def seed_database(db: Session) -> None:
    """Populate every table with real portfolio data."""

    # ── About ─────────────────────────────────────────────────────────────
    about = About(
        id=1,
        name="Keerthi Prasanth S",
        tagline="Designer & Video Editor — Crafting Visual Stories",
        bio=(
            "I'm a creative designer and video editor currently pursuing my MCA at "
            "SRM Institute of Science and Technology, Kattankulathur. With hands-on "
            "experience in video editing, graphic design, and digital marketing, I "
            "bring ideas to life through compelling visuals and engaging content. "
            "During my internship at SRM Tamilperayam, I honed my skills in social "
            "media management, video production, and design automation.\n\n"
            "Beyond design, I'm passionate about technology — from building AI-powered "
            "applications to web development with Python, HTML, and CSS. I've been "
            "recognized with a World Records Union Certificate and an All India Books "
            "of Record for organizing cultural fests with 6000+ students. As the Overall "
            "Students Convenor of Paarivendhar Students Tamil Association at SRMIST, I "
            "thrive on leadership, creativity, and turning ambitious ideas into reality. "
            "Let's create something extraordinary together."
        ),
        photo_url="/assets/keerthi-photo.jpg",
        resume_url="/assets/keerthi-prasanth-resume.pdf",
        availability="available",
    )
    db.add(about)

    # ── Projects ──────────────────────────────────────────────────────────
    projects = [
        Project(
            title="Smart Election System",
            description=(
                "AI-Based Digital Voting Platform built with Python, OpenCV, "
                "Scikit-learn, and Machine Learning. Developed an intelligent digital "
                "voting system to improve election security, efficiency, and "
                "accessibility through AI-driven voter authentication."
            ),
            category="design",
            thumbnail_url="/assets/project1.jpg",
            video_url=None,
            live_link=None,
            download_url="/assets/downloads/smart-election.zip",
            download_filename="SmartElection-Project.zip",
            tags="python,AI,machine learning,OpenCV",
            created_at=date(2025, 6, 15),
            featured=True,
            sort_order=1,
        ),
        Project(
            title="SRM Tamilperayam — Social Media Content",
            description=(
                "Designed and edited social media content for SRM Tamilperayam's "
                "official pages. Created engaging video content, posters, and digital "
                "assets that boosted engagement and brand visibility across platforms."
            ),
            category="video",
            thumbnail_url="/assets/project2.jpg",
            video_url=None,
            live_link=None,
            download_url="/assets/downloads/tamilperayam-content.zip",
            download_filename="Tamilperayam-Portfolio.zip",
            tags="video editing,social media,design,content creation",
            created_at=date(2024, 8, 20),
            featured=True,
            sort_order=2,
        ),
        Project(
            title="Vande Mataram — World Record Event",
            description=(
                "Coordinated the historic Largest Human Formation of the word "
                "'Vande Mataram' at SRM Institute of Science and Technology. "
                "Recognized by the World Records Union Certificate. Handled "
                "technical & media coordination for this massive event."
            ),
            category="branding",
            thumbnail_url="/assets/project3.jpg",
            video_url=None,
            live_link=None,
            download_url="/assets/downloads/vande-mataram.zip",
            download_filename="VandeMataram-Event.zip",
            tags="event management,world record,coordination,media",
            created_at=date(2026, 1, 15),
            featured=True,
            sort_order=3,
        ),
        Project(
            title="Sol Thamizha Sol — Cultural Fest",
            description=(
                "Organized and designed branding materials for 'Sol Thamizha Sol' "
                "cultural fest. Recognized by the Chancellor of SRMIST. Created "
                "posters, video promotions, and event branding that attracted "
                "6000+ students."
            ),
            category="design",
            thumbnail_url="/assets/project4.jpg",
            video_url=None,
            live_link=None,
            download_url="/assets/downloads/sol-thamizha.zip",
            download_filename="SolThamizha-Branding.zip",
            tags="cultural fest,branding,poster design,event",
            created_at=date(2025, 3, 10),
            featured=True,
            sort_order=4,
        ),
        Project(
            title="Digital Marketing Campaign",
            description=(
                "Completed Social Media Bootcamp for Digital Marketing from Zoho Social. "
                "Applied learnings to create data-driven social media strategies, "
                "content calendars, and performance analytics for real-world campaigns."
            ),
            category="branding",
            thumbnail_url="/assets/project5.jpg",
            video_url=None,
            live_link=None,
            download_url="/assets/downloads/digital-marketing.zip",
            download_filename="DigitalMarketing-Campaign.zip",
            tags="digital marketing,social media,zoho,strategy",
            created_at=date(2026, 2, 5),
            featured=False,
            sort_order=5,
        ),
        Project(
            title="UI/UX Design Portfolio",
            description=(
                "A collection of user-centered design work exploring UI/UX fundamentals. "
                "Built during the UI/UX Fundamentals certification from NxtWave. "
                "Includes wireframes, prototypes, and responsive web layouts."
            ),
            category="design",
            thumbnail_url="/assets/project6.jpg",
            video_url=None,
            live_link=None,
            download_url="/assets/downloads/uiux-portfolio.zip",
            download_filename="UIUX-Portfolio.zip",
            tags="UI/UX,wireframing,prototyping,web design",
            created_at=date(2025, 5, 18),
            featured=False,
            sort_order=6,
        ),
    ]
    db.add_all(projects)

    # ── Social Links ──────────────────────────────────────────────────────
    socials = [
        SocialLink(platform="LinkedIn", url="https://linkedin.com/in/keerthiprasanths", icon="FaLinkedin", username="Keerthi Prasanth S", sort_order=1),
        SocialLink(platform="Instagram", url="https://instagram.com/keerthiprasanths", icon="FaInstagram", username="@keerthiprasanths", sort_order=2),
        SocialLink(platform="YouTube", url="https://youtube.com/@keerthiprasanths", icon="FaYoutube", username="Keerthi Prasanth S", sort_order=3),
        SocialLink(platform="Behance", url="https://behance.net/keerthiprasanths", icon="FaBehance", username="keerthiprasanths", sort_order=4),
        SocialLink(platform="GitHub", url="https://github.com/keerthiprasanths", icon="FaGithub", username="keerthiprasanths", sort_order=5),
        SocialLink(platform="X", url="https://x.com/keerthiprasanths", icon="FaXTwitter", username="@keerthiprasanths", sort_order=6),
    ]
    db.add_all(socials)

    # ── Skills ────────────────────────────────────────────────────────────
    skills = [
        Skill(name="Adobe Photoshop", icon="Ps", proficiency=90, category="design"),
        Skill(name="Video Editing", icon="Ve", proficiency=88, category="video"),
        Skill(name="Python", icon="Py", proficiency=85, category="design"),
        Skill(name="HTML & CSS", icon="Ht", proficiency=88, category="design"),
        Skill(name="Digital Marketing", icon="Dm", proficiency=82, category="design"),
        Skill(name="UI/UX Design", icon="Ux", proficiency=78, category="design"),
        Skill(name="Graphic Design", icon="Gd", proficiency=85, category="design"),
        Skill(name="Social Media Management", icon="Sm", proficiency=80, category="design"),
    ]
    db.add_all(skills)

    # ── Timeline ──────────────────────────────────────────────────────────
    timeline = [
        TimelineEntry(
            title="MCA — Master of Computer Applications",
            organization="SRM Institute of Science and Technology, Kattankulathur",
            description=(
                "Currently pursuing MCA with 7.8 CGPA. Deepening expertise in "
                "software development, AI/ML, and full-stack web technologies."
            ),
            start_date="2024",
            end_date="2026",
            type="education",
            sort_order=1,
        ),
        TimelineEntry(
            title="Video Editor & Designer — Intern",
            organization="SRM Tamilperayam",
            description=(
                "Managed social media pages, handled documentation, designed visual "
                "content, and edited videos. Worked with digital systems tools, "
                "automation, and technical operations."
            ),
            start_date="June 2024",
            end_date="August 2024",
            type="work",
            sort_order=2,
        ),
        TimelineEntry(
            title="Overall Students Convenor",
            organization="Paarivendhar Students Tamil Association, SRMIST",
            description=(
                "Leading the association as Overall Students Convenor. Previously served "
                "as Technical & Media Convenor from 2022-2025. Organized cultural fests "
                "recognized by All India Books of Record and Nova World Record."
            ),
            start_date="2022",
            end_date="2026",
            type="work",
            sort_order=3,
        ),
        TimelineEntry(
            title="B.Sc Computer Science",
            organization="SRM Arts and Science College, Kattankulathur",
            description=(
                "Graduated with 77%. Built strong foundation in programming, "
                "data structures, and web development technologies."
            ),
            start_date="2022",
            end_date="2025",
            type="education",
            sort_order=4,
        ),
    ]
    db.add_all(timeline)

    db.commit()
