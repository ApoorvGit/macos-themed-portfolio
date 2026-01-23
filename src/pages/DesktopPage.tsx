import React, { useState } from 'react';
import { Wallpaper } from '../components/Wallpaper';
import { MenuBar } from '../components/MenuBar';
import { Dock } from '../components/Dock';
import { Window } from '../components/Window';
import { StickyNote } from '../components/StickyNote';
import { FaceTimeContent } from '../components/FaceTimeContent';
import { MessagesContent } from '../components/MessagesContent';
import { SiriContent } from '../components/SiriContent';
import { PDFViewer } from '../components/PDFViewer';
import { FinderWindow } from '../components/FinderWindow';
import { useWindowStore } from '../lib/window-manager';
import { ICON_IDS, WINDOW_DEFAULTS, WINDOW_TITLES } from '../lib/constants';
import {
  FinderIcon,
  SafariIcon,
  TerminalIcon,
  PhotosIcon,
  MailIcon,
  BriefcaseIcon,
  FaceTimeIcon,
  MessagesIcon,
  SiriIcon,
} from '../components/MacOSIcons';

// Content components
const ExperienceContent: React.FC = () => {
  const [selectedNote, setSelectedNote] = React.useState(0);
  
  const notes = [
    {
      title: 'Software Development Engineer 2',
      date: 'Expedia Group · April 2025 - Present',
      content: `Spinnaker Management Service & GitHub Migration System

• Developed Java Spring Boot backend service for Spinnaker management at scale
• Exposed APIs for Backstage integration to mark pipelines read-only on app decommission
• Designed event-driven multi-lambda architecture for GHES to GHEC migration
• Built 4-phase system: Request, Export, Import, Finalization with deep post-migration remediation
• Reduced manual effort to 0%, achieved 98.06% success rate, increased migration speed by 90x
• Tech Stack: Java, Spring Boot, Python, AWS Lambda, SQS, S3, GitHub API (REST & GraphQL)`
    },
    {
      title: 'Software Development Engineer 1',
      date: 'Expedia Group · Aug 2023 - March 2025',
      content: `Custom Spinnaker Plugin & Reusable CI Workflows

• Built custom Spinnaker plugin for auto-deploying CloudFormation stacks to AWS environments
• Reduced manual effort by 100%
• Created modular CI reusable workflows for Maven, Gradle, Docker, npm, Yarn (adopted across thousands of repos)
• Developed 4 custom GitHub Actions (TypeScript & Python): OIDC auth, Artifactory uploads, settings.xml & init.gradle generators
• Reduced Jenkins dependency by 76% in one year, saving infrastructure cost
• Replaced local Akamai CIDRs with centralized Global Origin ACL across all AWS environments
• Tech Stack: React.js, Java, TypeScript, Python, GitHub Actions, AWS, Spinnaker, Terraform`
    },
    {
      title: 'SWE Intern',
      date: 'McKinsey & Company · Jan 2023 - July 2023',
      content: `Drag-and-Drop Architecture Platform & Clinical Trial Dashboard

• Built platform where users draw architecture by dragging tech stacks to create microservices
• Application generates custom boilerplates, Dockerfiles, and Kubernetes Manifest Files
• Developed DB schema, OTP-based auth, Dockerfile generator, and zipping utility modules
• Built real-time analytics dashboard for Asia's largest pharma firm using React, Redux, HighCharts
• Tech Stack: Express.js, PostgreSQL with Prisma, Docker, React, Redux`
    }
  ];

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar - Notes List */}
      <div className="w-64 border-r border-gray-200 bg-gray-50/50 flex flex-col">
        <div className="p-3 border-b border-gray-200 bg-white">
          <h2 className="font-semibold text-sm text-gray-700">Work Experience</h2>
          <p className="text-xs text-gray-500 mt-0.5">{notes.length} notes</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notes.map((note, index) => (
            <div
              key={index}
              onClick={() => setSelectedNote(index)}
              className={`p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors ${
                selectedNote === index ? 'bg-yellow-50 border-l-4 border-l-yellow-500' : ''
              }`}
            >
              <h3 className="font-semibold text-sm text-gray-900 line-clamp-1">{note.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{note.date}</p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{note.content.split('\n')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Note Content */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{notes[selectedNote].title}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{notes[selectedNote].date}</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
              {notes[selectedNote].content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsContent: React.FC = () => (
  <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
    <div className="mb-4">
      <span className="text-blue-400">$</span> cat skills.txt
    </div>
    <div className="space-y-2">
      <div>Languages: C++, Java, JavaScript, Python</div>
      <div>Backend: Java Spring Boot, Express.js, REST APIs, Python (Lambda, scripting)</div>
      <div>Frontend: React.js, HTML, CSS, Redux</div>
      <div>Databases: MySQL, PostgreSQL, Oracle SQL, SQLite3</div>
      <div>ORMs: JPA (Hibernate), Prisma, Sequelize</div>
      <div>DevOps & Cloud: Terraform, CloudFormation, AWS, GitHub Actions, Jenkins, Spinnaker, Artifactory</div>
      <div>Other: Docker, Redis</div>
    </div>
    <div className="mt-4">
      <span className="text-blue-400">$</span> <span className="animate-pulse">_</span>
    </div>
  </div>
);

const BlogContent: React.FC = () => (
  <div className="prose max-w-none">
    <h2 className="text-2xl font-bold mb-4">Blog Posts</h2>
    <div className="space-y-4">
      <article className="border-b border-gray-200 pb-4">
        <h3 className="text-xl font-semibold mb-2">
          <a href="#" className="text-blue-600 hover:underline">
            Building a macOS-style UI with React
          </a>
        </h3>
        <p className="text-sm text-gray-500 mb-2">December 15, 2025</p>
        <p className="text-gray-700">
          Learn how to create a beautiful macOS-inspired interface using React, Tailwind CSS, and modern web technologies...
        </p>
      </article>
      <article className="border-b border-gray-200 pb-4">
        <h3 className="text-xl font-semibold mb-2">
          <a href="#" className="text-blue-600 hover:underline">
            Deploying to AWS EKS with Helm
          </a>
        </h3>
        <p className="text-sm text-gray-500 mb-2">December 10, 2025</p>
        <p className="text-gray-700">
          A complete guide to deploying your applications to AWS EKS using Helm charts for configuration management...
        </p>
      </article>
    </div>
  </div>
);

const GalleryContent: React.FC = () => (
  <div>
    <h2 className="text-2xl font-bold mb-4">Gallery</h2>
    <div className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="aspect-square bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold"
        >
          {i}
        </div>
      ))}
    </div>
  </div>
);

const ContactContent: React.FC = () => (
  <div className="prose max-w-none">
    <h2 className="text-2xl font-bold mb-4">Contact</h2>
      <div className="space-y-4">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <a href="mailto:apoorvmishra1000@gmail.com" className="text-blue-600 hover:underline">
          apoorvmishra1000@gmail.com
        </a>
      </div>
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <a href="https://github.com/apoorvgit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          github.com/apoorvgit
        </a>
      </div>
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
        <a href="https://linkedin.com/in/erapoorv" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          linkedin.com/in/erapoorv
        </a>
      </div>
      <div className="mt-6">
        <a
          href={`${import.meta.env.BASE_URL}resume.pdf`}
          download
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Resume
        </a>
      </div>
    </div>
  </div>
);

export const DesktopPage: React.FC = () => {
  const { openWindow, closeWindow, minimizeWindow, windows } = useWindowStore();
  const [siriOpen, setSiriOpen] = useState(false);
  const [stickyNotes, setStickyNotes] = useState([
    {
      id: 1,
      color: 'yellow' as const,
      content: `🚀 SDE 2 @ Expedia Group

📧 apoorvmishra1000@gmail.com
💻 github.com/apoorvgit
🔗 linkedin.com/in/erapoorv

Backend • Frontend • Cloud • DevOps • AI/ML`,
      x: 32,
      y: 80,
      links: [
        { text: 'apoorvmishra1000@gmail.com', url: 'mailto:apoorvmishra1000@gmail.com' },
        { text: 'github.com/apoorvgit', url: 'https://github.com/apoorvgit' },
        { text: 'linkedin.com/in/erapoorv', url: 'https://linkedin.com/in/erapoorv' }
      ]
    },
    {
      id: 2,
      color: 'pink' as const,
      content: `🎓 Education

• B.E. Computer Engineering (8.72 CGPA)
  Thapar Institute, Patiala

• Class XII (91.6%)
  J.B. Academy, Ayodhya

• Class X (9.8 CGPA)
  J.B. Academy, Ayodhya`,
      x: window.innerWidth - 320,
      y: 80,
    },
  ]);

  const desktopIcons = [
    { 
      id: ICON_IDS.PROJECTS, 
      label: 'Projects', 
      icon: <FinderIcon className="w-24 h-24" /> 
    },
    { 
      id: ICON_IDS.EXPERIENCE, 
      label: 'Experience', 
      icon: <BriefcaseIcon className="w-24 h-24" /> 
    },
    { 
      id: ICON_IDS.SKILLS, 
      label: 'Skills', 
      icon: <TerminalIcon className="w-24 h-24" /> 
    },
    { 
      id: ICON_IDS.BLOG, 
      label: 'Blog', 
      icon: <SafariIcon className="w-24 h-24" /> 
    },
    { 
      id: ICON_IDS.GALLERY, 
      label: 'Gallery', 
      icon: <PhotosIcon className="w-24 h-24" /> 
    },
    { 
      id: ICON_IDS.CONTACT, 
      label: 'Contact', 
      icon: <MailIcon className="w-24 h-24" /> 
    },
  ];

  const dockItems = [...desktopIcons.map((icon) => ({
    ...icon,
    onClick: () => handleOpenWindow(icon.id),
  })),
    {
      id: ICON_IDS.FACETIME,
      label: 'FaceTime',
      icon: <FaceTimeIcon className="w-24 h-24" />,
      onClick: () => handleOpenWindow(ICON_IDS.FACETIME),
    },
    {
      id: ICON_IDS.MESSAGES,
      label: 'Messages',
      icon: <MessagesIcon className="w-24 h-24" />,
      onClick: () => handleOpenWindow(ICON_IDS.MESSAGES),
    },
    {
      id: ICON_IDS.SIRI,
      label: 'Siri',
      icon: <SiriIcon className="w-24 h-24" />,
      onClick: () => setSiriOpen(prev => !prev),
    },
  ];

  const handleOpenWindow = (id: string) => {
    const defaults = WINDOW_DEFAULTS[id as keyof typeof WINDOW_DEFAULTS];
    const title = WINDOW_TITLES[id as keyof typeof WINDOW_TITLES];
    
    let content: React.ReactNode;
    let noTitleBar = false;
    
    switch (id) {
      case ICON_IDS.PROJECTS:
        noTitleBar = true;
        content = (
          <FinderWindow 
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
          />
        );
        break;
      case ICON_IDS.EXPERIENCE:
        content = <ExperienceContent />;
        break;
      case ICON_IDS.SKILLS:
        content = <SkillsContent />;
        break;
      case ICON_IDS.BLOG:
        content = <BlogContent />;
        break;
      case ICON_IDS.GALLERY:
        content = <GalleryContent />;
        break;
      case ICON_IDS.CONTACT:
        content = <ContactContent />;
        break;
      case ICON_IDS.FACETIME:
        content = <FaceTimeContent />;
        break;
      case ICON_IDS.MESSAGES:
        content = <MessagesContent />;
        break;
      default:
        content = <div>Content not found</div>;
    }

    openWindow({
      id,
      title,
      ...defaults,
      content,
      noTitleBar,
    });
  };

  const handleOpenResume = () => {
    const basePath = import.meta.env.BASE_URL;
    openWindow({
      id: 'resume',
      title: 'Resume.pdf',
      x: 150,
      y: 80,
      width: 900,
      height: 700,
      content: <PDFViewer pdfUrl={`${basePath}resume.pdf`} />,
    });
  };

  return (
    <Wallpaper>
      <div className="w-full h-full flex flex-col">
        <MenuBar />
        
        <div className="flex-1 relative overflow-hidden">
          {/* Centered Greeting Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <h1 className="text-6xl font-light text-white drop-shadow-2xl">
                Hi, I'm{' '}
                <span className="font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Apoorv
                </span>
              </h1>
              <p className="text-3xl font-light text-white/90 mt-4 drop-shadow-lg">
                Software Engineer & Problem Solver
              </p>
            </div>
          </div>

          {/* Sticky Notes */}
          {stickyNotes.map((note) => (
            <StickyNote
              key={note.id}
              initialX={note.x}
              initialY={note.y}
              initialWidth={note.id === 2 ? 280 : undefined}
              initialHeight={note.id === 2 ? 320 : undefined}
              color={note.color}
              content={note.content}
              links={note.links}
              onClose={() => setStickyNotes(stickyNotes.filter((n) => n.id !== note.id))}
            />
          ))}

          {/* Desktop Files */}
          <div 
            className="absolute bottom-24 left-8 flex flex-col items-center gap-2 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors"
            onClick={() => handleOpenResume()}
          >
            <svg className="w-16 h-16 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <span className="text-white text-sm drop-shadow-md">Resume.pdf</span>
          </div>

          <div className="absolute bottom-24 left-32 flex flex-col items-center gap-2 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors">
            <svg className="w-16 h-16 text-blue-300 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span className="text-white text-sm drop-shadow-md">Projects</span>
          </div>

          {/* Windows */}
          {Object.values(windows).map((window) => (
            <Window
              key={window.id}
              id={window.id}
              title={window.title}
              onClose={() => closeWindow(window.id)}
              onMinimize={() => minimizeWindow(window.id)}
              initialPosition={{ x: window.x, y: window.y }}
              initialSize={{ width: window.width, height: window.height }}
              noTitleBar={window.noTitleBar}
            >
              {window.content}
            </Window>
          ))}
        </div>

        <Dock items={dockItems} />

        {/* Siri Assistant Popup - Top Right Corner */}
        {siriOpen && (
          <>
            {/* Siri Popup */}
            <div className="fixed top-20 right-8 z-[9999] animate-slide-in-right">
              <div className="w-[420px] h-[600px] rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative">
                <SiriContent onOpenApp={(appId) => {
                  handleOpenWindow(appId);
                }} />
                {/* Close button */}
                <button
                  onClick={() => setSiriOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-colors z-10"
                  aria-label="Close Siri"
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Wallpaper>
  );
};
