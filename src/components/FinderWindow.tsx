import React from 'react';
import AirDropIcon from '../assets/icons/airdrop.svg';
import RecentsIcon from '../assets/icons/recents.svg';
import ApplicationsIcon from '../assets/icons/applications.svg';

interface Project {
  name: string;
  subtitle: string;
  kind: string;
  modified: string;
  details: string;
  tags: string[];
}

interface FinderWindowProps {
  onClose?: () => void;
  onMinimize?: () => void;
}

export const FinderWindow: React.FC<FinderWindowProps> = ({ onClose, onMinimize }) => {
  const [selectedProject, setSelectedProject] = React.useState(0);
  const [selectedSidebarItem, setSelectedSidebarItem] = React.useState('applications');
  
  const projects: Project[] = [
    {
      name: "God's Eye",
      subtitle: "AI Smart Glasses for Visually Impaired",
      kind: "Folder",
      modified: "Dec 2022",
      details: `AI-powered smart glasses with real-time environmental narration, facial recognition, text narration, and road sign detection for assisted navigation.

Won ₹2 Lakh in IONathon 2022
Finalist in Smart India Hackathon 2022`,
      tags: ["AI/ML", "Computer Vision", "Facial Recognition", "IoT"]
    },
    {
      name: "ThaparTALKs.in",
      subtitle: "Social Network for TIET",
      kind: "Folder",
      modified: "Aug 2022",
      details: `Full-fledged social networking web app for TIET with 310+ active users.

Features:
• Real-time chat
• File transfer up to 500MB
• Stickers
• Secure sign-up through Thapar ID only`,
      tags: ["React", "Real-time Chat", "Security", "Full-Stack"]
    },
    {
      name: "LastSeen",
      subtitle: "Facial Recognition Tracking System",
      kind: "Folder",
      modified: "Nov 2021",
      details: `Won HackX 2021

Processes live feeds from all premise CCTVs to track individuals via facial recognition and report their last seen location.`,
      tags: ["Facial Recognition", "Computer Vision", "Real-time Processing"]
    }
  ];

  return (
    <div className="flex h-full">
      {/* Sidebar - Finder Style - Full Height */}
      <div className="window-titlebar w-[180px] bg-gradient-to-b from-[#f5f5f7] to-[#ebebed] border-r border-gray-300/50 flex flex-col backdrop-blur-xl relative">
        {/* Traffic Light Buttons */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <button
            aria-label="Close"
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff4136] focus:outline-none border border-black/10 shadow-sm group relative"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">✕</span>
          </button>
          <button
            aria-label="Minimize"
            onClick={onMinimize}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffaa00] focus:outline-none border border-black/10 shadow-sm group relative"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">−</span>
          </button>
          <button
            aria-label="Zoom"
            className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#00d14a] focus:outline-none border border-black/10 shadow-sm group relative"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/70 opacity-0 group-hover:opacity-100">+</span>
          </button>
        </div>
        
        {/* Sidebar Top with Favorites */}
        <div className="pt-12 pb-2 px-3">
          <div className="text-[11px] font-semibold text-gray-500 mb-2 px-2 tracking-wide">Favorites</div>
          <div className="space-y-px">
            <div 
              onClick={() => setSelectedSidebarItem('airdrop')}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md cursor-pointer transition-colors ${
                selectedSidebarItem === 'airdrop' 
                  ? 'bg-[#007AFF]/10 text-[#007AFF] shadow-sm' 
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              <img src={AirDropIcon} alt="AirDrop" className="w-[18px] h-[18px]" />
              <span className={`text-[13px] ${selectedSidebarItem === 'airdrop' ? 'font-medium' : ''}`}>AirDrop</span>
            </div>
            <div 
              onClick={() => setSelectedSidebarItem('recents')}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md cursor-pointer transition-colors ${
                selectedSidebarItem === 'recents' 
                  ? 'bg-[#007AFF]/10 text-[#007AFF] shadow-sm' 
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              <img src={RecentsIcon} alt="Recents" className="w-[18px] h-[18px]" />
              <span className={`text-[13px] ${selectedSidebarItem === 'recents' ? 'font-medium' : ''}`}>Recents</span>
            </div>
            <div 
              onClick={() => setSelectedSidebarItem('applications')}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md cursor-pointer transition-colors ${
                selectedSidebarItem === 'applications' 
                  ? 'bg-[#007AFF]/10 text-[#007AFF] shadow-sm' 
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              <img src={ApplicationsIcon} alt="Applications" className="w-[18px] h-[18px]" />
              <span className={`text-[13px] ${selectedSidebarItem === 'applications' ? 'font-medium' : ''}`}>Applications</span>
            </div>
            <div 
              onClick={() => setSelectedSidebarItem('downloads')}
              className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md cursor-pointer transition-colors ${
                selectedSidebarItem === 'downloads' 
                  ? 'bg-[#007AFF]/10 text-[#007AFF] shadow-sm' 
                  : 'text-gray-700 hover:bg-black/5'
              }`}
            >
              <svg className="w-[18px] h-[18px] text-[#007AFF]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
              </svg>
              <span className={`text-[13px] ${selectedSidebarItem === 'downloads' ? 'font-medium' : ''}`}>Downloads</span>
            </div>
          </div>
        </div>
        <div className="flex-1"></div>
        <div className="px-4 py-2.5 border-t border-gray-300/30 text-[11px] text-gray-500 bg-white/30">
          {selectedSidebarItem === 'applications' ? projects.length : 0} items
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Toolbar - Simplified */}
        <div className="h-[52px] border-b border-gray-200/80 flex items-center gap-2 px-4 bg-gradient-to-b from-[#fafafa] to-white">
          <div className="flex-1"></div>
          <button className="p-1 rounded hover:bg-black/5" title="Icon view">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <rect x="2" y="2" width="6" height="6" rx="1"/>
              <rect x="12" y="2" width="6" height="6" rx="1"/>
              <rect x="2" y="12" width="6" height="6" rx="1"/>
              <rect x="12" y="12" width="6" height="6" rx="1"/>
            </svg>
          </button>
          <button className="p-1 rounded bg-gray-200/60" title="List view">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 20 20" strokeWidth={1.5}>
              <line x1="3" y1="5" x2="17" y2="5" strokeLinecap="round"/>
              <line x1="3" y1="10" x2="17" y2="10" strokeLinecap="round"/>
              <line x1="3" y1="15" x2="17" y2="15" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="p-1 rounded hover:bg-black/5" title="More">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="4" r="1.5"/>
              <circle cx="10" cy="10" r="1.5"/>
              <circle cx="10" cy="16" r="1.5"/>
            </svg>
          </button>
          <div className="w-px h-5 bg-gray-300"></div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-[200px] h-[22px] pl-7 pr-3 text-[13px] bg-gray-100/80 border border-gray-200/50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/30 placeholder-gray-400"
            />
            <svg className="w-3.5 h-3.5 text-gray-400 absolute left-2 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeWidth={2}/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
        </div>

        {/* Column Headers */}
        {selectedSidebarItem === 'applications' && (
          <>
            <div className="flex items-center h-[24px] border-b border-gray-200 bg-[#fbfbfb] px-5 text-[11px] font-semibold text-gray-600">
              <div className="w-[35%] flex items-center gap-1">
                Name
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
                </svg>
              </div>
              <div className="w-[20%]">Date Modified</div>
              <div className="w-[45%]">Tags</div>
            </div>

            {/* Project List */}
            <div className="flex-1 overflow-y-auto bg-white">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => setSelectedProject(index)}
              className={`flex items-center h-[28px] px-5 cursor-pointer text-[13px] transition-colors ${
                selectedProject === index 
                  ? 'bg-[#0066FF] text-white' 
                  : index % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-[#fafbfc] hover:bg-gray-50'
              }`}
            >
              <div className="w-[35%] flex items-center gap-2.5">
                <svg className={`w-[20px] h-[20px] flex-shrink-0 ${selectedProject === index ? 'text-white' : 'text-[#007AFF]'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                </svg>
                <div className="min-w-0 flex-1">
                  <div className={`truncate ${selectedProject === index ? 'text-white font-normal' : 'text-gray-900'}`}>
                    {project.name}
                  </div>
                </div>
              </div>
              <div className={`w-[20%] ${selectedProject === index ? 'text-white/95' : 'text-gray-600'}`}>
                {project.modified}
              </div>
              <div className="w-[45%]">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className={`px-1.5 py-0.5 rounded text-[10px] ${
                        selectedProject === index 
                          ? 'bg-white/25 text-white' 
                          : 'bg-gray-200/70 text-gray-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preview Panel - Bottom */}
        <div className="h-[200px] border-t border-gray-200 bg-gradient-to-b from-white to-gray-50/30 p-5 overflow-y-auto">
          <div className="flex gap-5">
            <div className="flex-shrink-0">
              <svg className="w-20 h-20 text-[#007AFF]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[14px] text-gray-900 mb-2">
                {projects[selectedProject].name}
              </h3>
              <div className="text-[11px] text-gray-600 space-y-1 mb-3">
                <div className="flex gap-2">
                  <span className="text-gray-500 w-16">Kind:</span>
                  <span>{projects[selectedProject].kind}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-gray-500 w-16">Modified:</span>
                  <span>{projects[selectedProject].modified}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-700 leading-[1.6] whitespace-pre-line mb-3">
                {projects[selectedProject].details}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {projects[selectedProject].tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-medium border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
          </>
        )}
        
        {/* Empty state for other sidebar items */}
        {selectedSidebarItem !== 'applications' && (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center text-gray-400">
              <p className="text-sm">No items</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
