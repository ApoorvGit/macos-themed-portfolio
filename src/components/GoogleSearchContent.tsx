import React from "react";

interface GoogleSearchContentProps {
  onOpenResume: () => void;
}

export const GoogleSearchContent: React.FC<GoogleSearchContentProps> = ({
  onOpenResume,
}) => {
  return (
    <div className="bg-white min-h-full">
      {/* Google Header */}
      <div className="border-b border-gray-200 px-6 py-3 flex items-center gap-8">
        <svg
          className="h-7"
          viewBox="0 0 272 92"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            fill="#EA4335"
          />
          <path
            d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
            fill="#FBBC05"
          />
          <path
            d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
            fill="#4285F4"
          />
          <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
          <path
            d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
            fill="#EA4335"
          />
          <path
            d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"
            fill="#4285F4"
          />
        </svg>

        <div className="flex-1 flex items-center max-w-2xl">
          <div className="flex items-center w-full border border-gray-200 rounded-full px-5 py-2.5 hover:shadow-md transition-shadow">
            <span className="text-gray-700 flex-1">apoorv mishra</span>
            <div className="flex items-center gap-3 text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <svg
                className="w-5 h-5 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Google Navigation */}
      <div className="border-b border-gray-200 px-6">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2 py-3 border-b-2 border-blue-600 text-blue-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-medium">All</span>
          </div>
          <div className="flex items-center gap-2 py-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Images</span>
          </div>
          <div className="flex items-center gap-2 py-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Videos</span>
          </div>
          <div className="flex items-center gap-2 py-3 text-gray-700 hover:text-blue-600 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <span>News</span>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="px-6 py-4">
        <p className="text-sm text-gray-600 mb-6">
          About 2,450,000 results (0.48 seconds)
        </p>

        {/* Result 1 - GitHub */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" />
            </svg>
            <span className="text-xs text-gray-600">
              github.com › ApoorvGit
            </span>
          </div>
          <a
            href="https://github.com/ApoorvGit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-600 hover:underline cursor-pointer mb-1 block"
          >
            ApoorvGit (Apoorv Mishra) - GitHub
          </a>
          <p className="text-sm text-gray-600 leading-relaxed">
            Software Engineer passionate about building scalable systems.
            Full-stack developer with expertise in Java, Spring Boot, React, and
            AWS. Check out my repositories featuring microservices, cloud
            infrastructure, and web applications.
          </p>
        </div>

        {/* Result 2 - LinkedIn */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 mb-1">
            <svg
              className="w-4 h-4 text-blue-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
            </svg>
            <span className="text-xs text-gray-600">
              linkedin.com › in › erapoorv
            </span>
          </div>
          <a
            href="https://www.linkedin.com/in/erapoorv/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-600 hover:underline cursor-pointer mb-1 block"
          >
            Apoorv Mishra - Software Development Engineer - LinkedIn
          </a>
          <p className="text-sm text-gray-600 leading-relaxed">
            Software Development Engineer with 3+ years of experience in
            building enterprise applications. Specialized in backend
            development, microservices architecture, and cloud technologies.
            Currently working on scalable distributed systems.
          </p>
        </div>

        {/* Result 3 - Portfolio */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 mb-1">
            <svg
              className="w-4 h-4 text-purple-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-gray-600">
              apoorvgit.github.io › macos-themed-portfolio
            </span>
          </div>
          <a
            href="https://apoorvgit.github.io/macos-themed-portfolio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl text-blue-600 hover:underline cursor-pointer mb-1 block"
          >
            Apoorv Mishra - Software Engineer Portfolio
          </a>
          <p className="text-sm text-gray-600 leading-relaxed">
            Personal portfolio showcasing projects and technical expertise.
            Full-stack development, cloud infrastructure, DevOps automation, and
            system design. View my work in React, Spring Boot, AWS, and more.
          </p>
        </div>

        {/* Result 4 - Resume/CV */}
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-2 mb-1">
            <svg
              className="w-4 h-4 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs text-gray-600">
              apoorvgit.github.io › macos-themed-portfolio › resume
            </span>
          </div>
          <button
            onClick={onOpenResume}
            className="text-xl text-blue-600 hover:underline cursor-pointer mb-1 block text-left"
          >
            Apoorv Mishra - Resume & CV
          </button>
          <p className="text-sm text-gray-600 leading-relaxed">
            Software Development Engineer with expertise in Java, Spring Boot,
            React.js, AWS, and DevOps. Experience in microservices, event-driven
            architecture, infrastructure automation, and CI/CD pipelines. [PDF]
          </p>
        </div>
      </div>
    </div>
  );
};
