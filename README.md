# 🍎 macOS-Themed Portfolio Website

A highly interactive portfolio website that perfectly replicates the macOS/iPadOS experience in the browser. Built with modern web technologies to deliver a pixel-perfect desktop environment with draggable windows, a functional dock, and smooth animations.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=flat&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.19-38B2AC?style=flat&logo=tailwind-css)

## 🌟 About This Project

This is an innovative portfolio website that transforms the traditional web experience into an immersive macOS-style desktop environment. Users can interact with various applications through resizable and draggable windows, navigate using a functional dock, and enjoy a complete desktop experience—all within their browser.

### Key Highlights

- 🔒 **Authentic Lock Screen** - Complete with a password entry system and animated helper cat (password: `meow`)
- 🖥️ **Full Desktop Environment** - Menu bar with system controls, date/time, and status indicators
- 🪟 **Window Management System** - Fully functional windows that can be dragged, resized, minimized, and maximized
- 🎯 **Interactive Dock** - macOS-style dock with app icons, hover effects, and active indicators
- 📁 **Finder Window** - Browse through portfolio content in a familiar Finder interface
- 📄 **PDF Viewer** - Built-in resume viewer using PDF.js
- 💬 **AI-Powered Messages** - Real-time chat with AI responses powered by Groq, persistent conversation history
- 📹 **FaceTime Simulation** - Live video with real-time face mesh detection using MediaPipe
- 🤖 **Siri Integration** - Voice-like AI assistant interface with context-aware responses
- 🎨 **Drag & Drop Icons** - Reorganize desktop icons with smooth animations
- ⌨️ **Keyboard Navigation** - Full accessibility with keyboard shortcuts
- 📱 **Responsive Design** - Adapts beautifully to different screen sizes

## 📦 Technology Stack

### Core Framework

- **React 19.2.0** - Latest React with improved performance and features
- **TypeScript 5.9.3** - Type-safe development with strong typing
- **Vite 7.2.4** - Lightning-fast build tool and dev server

### Styling & UI

- **Tailwind CSS 3.4.19** - Utility-first CSS framework for rapid UI development
- **PostCSS** - CSS processing and transformations

### State & Navigation

- **Zustand 5.0.9** - Lightweight state management for window states
- **React Router DOM 7.10.1** - Client-side routing with protected routes
- **Session Storage** - Authentication state persistence

### Interactive Features

- **@dnd-kit** - Modern drag-and-drop toolkit for React
- **react-rnd 10.5.2** - Resizable and draggable windows
- **@szhsin/react-menu 4.5.1** - Context menu implementation

### Document & Media

- **react-pdf 10.2.0** - PDF viewing capabilities
- **pdfjs-dist 5.4.449** - PDF.js library for rendering PDFs
- **react-markdown 10.1.0** - Markdown parsing and rendering

### AI & Computer Vision

- **Groq API** - Ultra-fast AI inference for Siri-like interactions
- **MediaPipe Face Mesh** - Real-time face detection for FaceTime simulation

### Developer Tools

- **ESLint 9.39.2** - Code linting with TypeScript support
- **Prettier 3.7.4** - Opinionated code formatting
- **TypeScript ESLint 8.46.4** - TypeScript-specific linting rules

## 🎯 Project Structure

```
macos-themed-portfolio/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Dock.tsx            # macOS-style dock with app icons
│   │   ├── MenuBar.tsx         # Top menu bar with system controls
│   │   ├── Window.tsx          # Draggable/resizable window component
│   │   ├── FinderWindow.tsx    # File browser interface
│   │   ├── IconGrid.tsx        # Desktop icon grid with drag-drop
│   │   ├── IconTile.tsx        # Individual icon component
│   │   ├── PasswordCat.tsx     # Lock screen helper animation
│   │   ├── PDFViewer.tsx       # Resume/document viewer
│   │   ├── SiriContent.tsx     # AI chat interface (Siri)
│   │   ├── MessagesContent.tsx # AI-powered iMessage-style chat
│   │   ├── FaceTimeContent.tsx # Video call with face tracking
│   │   ├── StickyNote.tsx      # Sticky notes widget
│   │   └── Wallpaper.tsx       # Dynamic wallpaper component
│   ├── pages/                  # Main page components
│   │   ├── LockPage.tsx       # Authentication screen
│   │   └── DesktopPage.tsx    # Main desktop environment
│   ├── lib/                    # Utilities and services
│   │   ├── window-manager.ts  # Zustand store for window state
│   │   ├── keyboard.ts        # Keyboard shortcut handlers
│   │   ├── groq-service.ts    # AI service integration
│   │   └── constants.ts       # App configurations & constants
│   ├── styles/                 # Global styles
│   │   ├── globals.css        # Global CSS rules
│   │   └── tokens.css         # Design system tokens
│   ├── assets/                 # Images, icons, and static files
│   ├── router.tsx              # Route configuration
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # Application entry point
├── public/
│   └── resume.md               # Resume content in markdown
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── vite.config.ts              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Groq API Key** (free at [console.groq.com](https://console.groq.com))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ApoorvGit/macos-themed-portfolio.git
   cd macos-themed-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

   Get your free Groq API key from [https://console.groq.com](https://console.groq.com)

4. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

### Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production (TypeScript + Vite)
npm run preview  # Preview production build locally
npm run lint     # Run ESLint to check code quality
npm run format   # Format code with Prettier
```

## 🎮 How It Works

### Authentication Flow

1. **Lock Screen** - Users are greeted with a macOS-style lock screen
2. **Helper Cat** - An animated cat walks across the screen revealing the password
3. **Password Entry** - Enter the password (`meow`) to unlock
4. **Session Management** - Authentication state is stored in `sessionStorage`
5. **Protected Routes** - Desktop is only accessible after authentication

### Window Management System

The window system is powered by Zustand for state management and react-rnd for interactions:

- **State Storage** - Window positions, sizes, z-index, and minimized state stored in Zustand
- **Dragging** - Windows can be dragged by their title bars
- **Resizing** - Resize handles on all corners and edges
- **Minimize/Maximize** - macOS-style traffic light controls
- **Focus Management** - Clicking a window brings it to the front (z-index management)
- **Dock Integration** - Minimized windows appear in the dock

### Icon Organization

Desktop icons use @dnd-kit for smooth drag-and-drop:

- **Drag & Drop** - Rearrange icons with mouse or touch
- **Keyboard Navigation** - Arrow keys for full accessibility
- **Grid Snapping** - Icons snap to a grid layout for alignment
- **Visual Feedback** - Hover effects and drag shadows
- **Sortable** - Maintains icon order across interactions

### AI-Powered Messages App

The Messages app provides an interactive chat experience powered by Groq AI:

- **Real-time AI Responses** - Instant replies powered by Groq's fast inference
- **Conversation Persistence** - Messages are saved to localStorage per user
- **Unique User Sessions** - Each visitor gets a unique ID for personalized conversations
- **Typing Indicators** - Visual feedback while AI is generating responses
- **Markdown Support** - Rich text formatting in messages with react-markdown
- **Context Awareness** - AI maintains conversation history for coherent discussions
- **Auto-scroll** - Automatic scrolling to latest messages
- **Welcome Message** - Friendly greeting on first visit
- **iMessage-style UI** - Authentic macOS Messages appearance with bubbles

### AI Chat (Siri)

Powered by Groq's ultra-fast AI inference:

- **Natural Conversations** - Chat with AI about portfolio, skills, projects
- **Streaming Responses** - Real-time response generation
- **Context Aware** - Maintains conversation history
- **Fast Inference** - Sub-second response times with Groq

### Face Tracking (FaceTime)

Uses MediaPipe for real-time face mesh detection:

- **Camera Access** - Requests webcam permissions
- **Face Detection** - 468-point face mesh tracking
- **Real-time Processing** - 30+ FPS face tracking
- **Visual Overlay** - Displays face mesh points on video

## 🌐 Deployment

### Automated Deployment (GitHub Pages)

This project includes GitHub Actions for automatic deployment:

1. **Push to main branch** - Triggers automatic build and deployment
2. **GitHub Actions** - Builds the project and deploys to GitHub Pages
3. **Environment Secrets** - Securely injects API keys during build

**Setup Instructions:**

1. Go to repository **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Go to **Settings** → **Secrets and variables** → **Actions**
4. Add repository secret: `VITE_GROQ_API_KEY` with your Groq API key
5. Push to main branch - deployment happens automatically

**Live URL:** `https://apoorvgit.github.io/macos-themed-portfolio/`

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the production build
# Deploy this folder to any static hosting service
```

**Compatible Hosting Services:**

- ✅ GitHub Pages (automated with Actions)
- ✅ Vercel (`vercel deploy`)
- ✅ Netlify (drag & drop `dist/`)
- ✅ Cloudflare Pages
- ✅ AWS S3 + CloudFront
- ✅ Azure Static Web Apps

## 🎨 Customization

### Adding New Applications

1. **Create component** in `src/components/YourApp.tsx`
2. **Add window config** in `src/lib/constants.ts`:
   ```ts
   export const APPS = {
     yourApp: {
       id: "your-app",
       title: "Your App",
       icon: YourIcon,
       component: YourAppContent,
     },
   };
   ```
3. **Register in window manager** (Zustand store)
4. **Add dock icon** in `src/components/Dock.tsx`

### Modifying Theme

- **Colors**: Edit `tailwind.config.js` or `src/styles/tokens.css`
- **Wallpaper**: Replace in `src/components/Wallpaper.tsx` or add images to `src/assets/`
- **Fonts**: Update in `src/index.css`
- **Animations**: Modify transitions in `src/styles/globals.css`

### Customizing Content

- **Resume**: Edit `public/resume.md` (Markdown format)
- **About Info**: Update Finder window content in components
- **Messages**: Modify `src/components/MessagesContent.tsx`
- **Projects/Skills**: Update content in respective components

## ⌨️ Keyboard Shortcuts

- `Enter` - Submit password / Open selected icon
- `Escape` - Cancel / Deselect icons
- `Cmd/Ctrl + W` - Close focused window
- `Cmd/Ctrl + M` - Minimize focused window
- `Arrow Keys` - Navigate desktop icons
- `Tab` - Navigate between focusable elements

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

**How to contribute:**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the **MIT License**.

## 👨‍💻 Author

**Apoorv Mishra**

- GitHub: [@ApoorvGit](https://github.com/ApoorvGit)
- Portfolio: [Live Demo](https://apoorvgit.github.io/macos-themed-portfolio/)
- Email: apoorvmishra1000@gmail.com
- LinkedIn: https://www.linkedin.com/in/erapoorv/

## 🙏 Acknowledgments

- Inspired by Apple's macOS design language and Human Interface Guidelines
- React and Vite communities for excellent tooling and documentation
- All open-source library maintainers used in this project
- Groq for providing ultra-fast AI inference
- MediaPipe team for face detection technology

**Made with ❤️ using React + TypeScript + Vite**

If you found this project helpful, please consider giving it a ⭐ on GitHub!
