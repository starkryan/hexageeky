export interface Tool {
  id: string
  title: string
  description: string
  url: string
  category: string
  tags?: string[]
  features?: string[]
  favicon?: string

}

export const tools: Tool[] = [
  // Government & Documents
  {
    id: "1",
    title: "Aadhaar Services",
    description: "Official portal for Aadhaar card services - download, update, and verify Aadhaar",
    url: "https://uidai.gov.in/",
    favicon: "https://uidai.gov.in/images/logo/aadhaar_english_logo.svg",
    category: "Government",
    tags: ["official", "essential"],
    features: [
      "Download Aadhaar card",
      "Update demographic details",
      "Check Aadhaar status",
      "Book appointment"
    ]
  },
  {
    id: "2",
    title: "PAN Card Services",
    description: "Apply for new PAN card, download e-PAN, and link with Aadhaar",
    url: "https://www.incometax.gov.in/",
    favicon: "https://www.incometax.gov.in/iec/foportal/sites/default/files/favicon_2.ico",
    category: "Government",
    tags: ["official", "essential"],
    features: [
      "Apply for new PAN",
      "Download e-PAN",
      "Link PAN with Aadhaar",
      "Track application status"
    ]
  },
  // Social Media
  {
    id: "3",
    title: "Instagram",
    description: "Share photos and videos, connect with friends, and discover trends",
    url: "https://www.instagram.com",
    favicon: "https://www.instagram.com/static/images/ico/favicon.ico/36b3ee2d91ed.ico",
    category: "Social Media",
    tags: ["photos", "social"],
    features: [
      "Share photos and videos",
      "Connect with friends",
      "Discover trends",
      "Direct messaging"
    ]
  },
  {
    id: "4",
    title: "Twitter",
    description: "Real-time news, updates, and conversations from around the world",
    url: "https://twitter.com",
    favicon: "https://abs.twimg.com/favicons/twitter.ico",
    category: "Social Media",
    tags: ["news", "social", "updates"],
    features: [
      "Real-time updates",
      "Follow topics",
      "Join conversations",
      "Share thoughts"
    ]
  },
  // Productivity
  {
    id: "5",
    title: "ChatGPT",
    description: "AI-powered chatbot for writing, analysis, and problem-solving",
    url: "https://chat.openai.com",
    favicon: "https://chat.openai.com/favicon.ico",
    category: "Productivity",
    tags: ["ai", "writing", "assistant"],
    features: [
      "Natural language processing",
      "Content generation",
      "Problem-solving",
      "Research assistance"
    ]
  },
  {
    id: "6",
    title: "Google Drive",
    description: "Cloud storage and file sharing platform with collaborative features",
    url: "https://drive.google.com",
    favicon: "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png",
    category: "Productivity",
    tags: ["storage", "collaboration", "cloud"],
    features: [
      "File storage",
      "Real-time collaboration",
      "File sharing",
      "Document editing"
    ]
  },
  // Entertainment
  {
    id: "7",
    title: "Netflix",
    description: "Stream movies, TV shows, and original content on-demand",
    url: "https://www.netflix.com",
    favicon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.ico",
    category: "Entertainment",
    tags: ["streaming", "movies", "shows"],
    features: [
      "Movie streaming",
      "TV show streaming",
      "Original content",
      "Multiple profiles"
    ]
  },
  {
    id: "8",
    title: "Spotify",
    description: "Music streaming service with millions of songs and podcasts",
    url: "https://www.spotify.com",
    favicon: "https://www.scdn.co/i/_global/favicon.png",
    category: "Entertainment",
    tags: ["music", "podcasts", "audio"],
    features: [
      "Music streaming",
      "Playlist creation",
      "Podcast streaming",
      "Offline listening"
    ]
  },
  // Education
  {
    id: "9",
    title: "Coursera",
    description: "Online courses and degrees from top universities",
    url: "https://www.coursera.org",
    favicon: "https://d3njjcbhbojbot.cloudfront.net/web/images/favicons/favicon-v2-96x96.png",
    category: "Education",
    tags: ["courses", "learning", "certificates"],
    features: [
      "Online courses",
      "University certificates",
      "Specializations",
      "Degree programs"
    ]
  },
  {
    id: "10",
    title: "Duolingo",
    description: "Learn languages for free with gamified lessons",
    url: "https://www.duolingo.com",
    favicon: "https://d35aaqx5ub95lt.cloudfront.net/favicon.ico",
    category: "Education",
    tags: ["languages", "learning", "interactive"],
    features: [
      "Language learning",
      "Interactive lessons",
      "Progress tracking",
      "Daily goals"
    ]
  },
  // Shopping
  {
    id: "11",
    title: "Amazon",
    description: "Online shopping platform with vast product selection",
    url: "https://www.amazon.in",
    favicon: "https://www.amazon.in/favicon.ico",
    category: "Shopping",
    tags: ["shopping", "marketplace", "delivery"],
    features: [
      "Wide product selection",
      "Fast delivery",
      "Customer reviews",
      "Secure payments"
    ]
  },
  {
    id: "12",
    title: "Flipkart",
    description: "E-commerce platform with great deals and selections",
    url: "https://www.flipkart.com",
    favicon: "https://www.flipkart.com/favicon.ico",
    category: "Shopping",
    tags: ["shopping", "marketplace", "delivery"],
    features: [
      "Online shopping",
      "Fast delivery",
      "Easy returns",
      "Multiple payment options"
    ]
  },
  // Travel
  {
    id: "13",
    title: "MakeMyTrip",
    description: "Book flights, hotels, and holiday packages",
    url: "https://www.makemytrip.com",
    favicon: "https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/favicon.ico",
    category: "Travel",
    tags: ["flights", "hotels", "holidays"],
    features: [
      "Flight booking",
      "Hotel booking",
      "Holiday packages",
      "Travel insurance"
    ]
  },
  {
    id: "14",
    title: "IRCTC",
    description: "Official Indian Railways ticket booking portal",
    url: "https://www.irctc.co.in",
    favicon: "https://www.irctc.co.in/nget/assets/images/favicon.ico",
    category: "Travel",
    tags: ["trains", "official", "booking"],
    features: [
      "Train ticket booking",
      "PNR status",
      "Meal booking",
      "Tourism packages"
    ]
  },
  // Finance & Tax
  {
    id: "15",
    title: "GST Portal",
    description: "Official portal for GST filing and management",
    url: "https://www.gst.gov.in",
    favicon: "https://www.gst.gov.in/favicon.ico",
    category: "Finance",
    tags: ["tax", "official", "business"],
    features: [
      "GST registration",
      "Return filing",
      "Tax payment",
      "Invoice generation"
    ]
  },
  {
    id: "16",
    title: "LinkedIn",
    description: "Professional networking and career development platform",
    url: "https://www.linkedin.com",
    favicon: "https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca",
    category: "Business",
    tags: ["jobs",  "professional"],
    features: [
      "Professional networking",
      "Job search",
      "Skill development",
      "Industry news"
    ]
  },
  // Learning
  {
    id: "20",
    title: "Scholarships.gov.in",
    description: "Online scholarship and financial aid portal",
    url: "https://scholarships.gov.in",
    favicon: "https://scholarships.gov.in/public/Content/img/favicon.ico",
    category: "Learning",
    tags: ["scholarships", "financial aid", "education"],
    features: [
      "Scholarship search",
      "Financial aid",
      "Education resources",
      "Application tracking"
    ]
  },
  // Finance
  {
    id: "17",
    title: "Zerodha",
    description: "Online trading and investment platform",
    url: "https://zerodha.com",
    favicon: "https://zerodha.com/static/images/favicon.ico",
    category: "Finance",
    tags: ["trading", "investment", "stock market"],
    features: [
      "Stock trading",
      "Mutual funds",
      "Educational resources",
      "Portfolio tracking"
    ]
  },
  {
    id: "18",
    title: "Google Pay",
    description: "Digital payments and money transfer app",
    url: "https://pay.google.com",
    favicon: "https://pay.google.com/about/static/images/favicon.ico",
    category: "Finance",
    tags: ["payments", "money transfer", "digital wallet"],
    features: [
      "UPI payments",
      "Bill payments",
      "Money transfer",
      "Rewards"
    ]
  },
  // Add more tools after the existing ones
  {
    id: "21",
    title: "Microsoft Teams",
    description: "Business communication and collaboration platform",
    url: "https://teams.microsoft.com",
    favicon: "https://teams.microsoft.com/favicon.ico",
    category: "Business",
    tags: ["communication", "collaboration", "meetings"],
    features: [
      "Video meetings",
      "Team chat",
      "File sharing",
      "App integration"
    ]
  },
  {
    id: "22",
    title: "Canva",
    description: "Online design and publishing tool",
    url: "https://www.canva.com",
    favicon: "https://www.canva.com/favicon.ico",
    category: "Productivity",
    tags: ["design", "graphics", "templates"],
    features: [
      "Graphic design",
      "Template library",
      "Team collaboration",
      "Brand kit"
    ]
  },
  {
    id: "23",
    title: "GitHub",
    description: "Code hosting and collaboration platform",
    url: "https://github.com",
    favicon: "https://github.com/favicon.ico",
    category: "Productivity",
    tags: ["development", "git", "opensource"],
    features: [
      "Code hosting",
      "Version control",
      "Issue tracking",
      "Project management"
    ]
  },
  {
    id: "24",
    title: "Notion",
    description: "All-in-one workspace for notes and collaboration",
    url: "https://www.notion.so",
    favicon: "https://www.notion.so/favicon.ico",
    category: "Productivity",
    tags: ["notes", "organization", "workspace"],
    features: [
      "Note-taking",
      "Project management",
      "Team wiki",
      "Database"
    ]
  },
  {
    id: "25",
    title: "Figma",
    description: "Collaborative interface design tool",
    url: "https://www.figma.com",
    favicon: "https://www.figma.com/favicon.ico",
    category: "Productivity",
    tags: ["design", "ui", "prototyping"],
    features: [
      "UI design",
      "Prototyping",
      "Design systems",
      "Team libraries"
    ]
  },
  {
    id: "26",
    title: "Slack",
    description: "Business messaging and collaboration platform",
    url: "https://slack.com",
    favicon: "https://slack.com/favicon.ico",
    category: "Business",
    tags: ["communication", "team", "chat"],
    features: [
      "Team messaging",
      "File sharing",
      "App integration",
      "Video calls"
    ]
  },
  {
    id: "27",
    title: "Trello",
    description: "Visual project management tool",
    url: "https://trello.com",
    favicon: "https://trello.com/favicon.ico",
    category: "Productivity",
    tags: ["organization", "kanban", "projects"],
    features: [
      "Kanban boards",
      "Task management",
      "Team collaboration",
      "Workflow automation"
    ]
  },
  {
    id: "28",
    title: "Discord",
    description: "Voice, video and text chat platform",
    url: "https://discord.com",
    favicon: "https://discord.com/favicon.ico",
    category: "Social Media",
    tags: ["chat", "community", "gaming"],
    features: [
      "Voice chat",
      "Text channels",
      "Server management",
      "Bot integration"
    ]
  },
  {
    id: "29",
    title: "Adobe Creative Cloud",
    description: "Suite of creative software and services",
    url: "https://www.adobe.com/creativecloud.html",
    favicon: "https://www.adobe.com/favicon.ico",
    category: "Productivity",
    tags: ["creative", "design", "professional"],
    features: [
      "Creative apps",
      "Cloud storage",
      "Asset libraries",
      "Font service"
    ]
  },
  {
    id: "30",
    title: "Dropbox",
    description: "Cloud storage and file synchronization",
    url: "https://www.dropbox.com",
    favicon: "https://www.dropbox.com/favicon.ico",
    category: "Productivity",
    tags: ["storage", "cloud", "sharing"],
    features: [
      "File storage",
      "File sharing",
      "Team folders",
      "File backup"
    ]
  }
];
