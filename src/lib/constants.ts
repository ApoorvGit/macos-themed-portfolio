// Application constants
export const APP_NAME = "Portfolio";
export const LOCK_PASSWORD = "meow";

// Desktop icon IDs
export const ICON_IDS = {
  PROJECTS: "projects",
  EXPERIENCE: "experience",
  SKILLS: "skills",
  BLOG: "blog",
  GALLERY: "gallery",
  CONTACT: "contact",
  FACETIME: "facetime",
  MESSAGES: "messages",
  SIRI: "siri",
} as const;

// Window default sizes and positions
export const WINDOW_DEFAULTS = {
  [ICON_IDS.PROJECTS]: {
    x: 100,
    y: 80,
    width: 1100,
    height: 700,
  },
  [ICON_IDS.EXPERIENCE]: {
    x: 120,
    y: 100,
    width: 750,
    height: 550,
  },
  [ICON_IDS.SKILLS]: {
    x: 140,
    y: 120,
    width: 700,
    height: 500,
  },
  [ICON_IDS.BLOG]: {
    x: 160,
    y: 140,
    width: 850,
    height: 650,
  },
  [ICON_IDS.GALLERY]: {
    x: 180,
    y: 160,
    width: 900,
    height: 700,
  },
  [ICON_IDS.CONTACT]: {
    x: 200,
    y: 180,
    width: 600,
    height: 500,
  },
  [ICON_IDS.FACETIME]: {
    x: 220,
    y: 100,
    width: 900,
    height: 700,
  },
  [ICON_IDS.MESSAGES]: {
    x: 240,
    y: 120,
    width: 950,
    height: 650,
  },
  [ICON_IDS.SIRI]: {
    x: 260,
    y: 140,
    width: 800,
    height: 600,
  },
} as const;

// Window titles
export const WINDOW_TITLES = {
  [ICON_IDS.PROJECTS]: "Projects",
  [ICON_IDS.EXPERIENCE]: "Experience",
  [ICON_IDS.SKILLS]: "Skills",
  [ICON_IDS.BLOG]: "Blog",
  [ICON_IDS.GALLERY]: "Gallery",
  [ICON_IDS.CONTACT]: "Contact",
  [ICON_IDS.FACETIME]: "FaceTime",
  [ICON_IDS.MESSAGES]: "Messages",
  [ICON_IDS.SIRI]: "Siri",
} as const;
