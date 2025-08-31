'use client';

export default function Profile({ profile }) {
  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-28 h-28 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl text-white font-bold shadow-lg">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            {profile.name}
          </h1>
          
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            {profile.bio}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-900 hover:to-black transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="bg-white/10 p-2 rounded-lg mr-3 group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </div>
                GitHub
              </a>
            )}
            
            {profile.links.resume && (
              <a
                href={profile.links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1"
              >
                <div className="bg-white/10 p-2 rounded-lg mr-3 group-hover:bg-white/20 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                Resume
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      {profile.education && profile.education.length > 0 && (
        <div className="bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/30 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 rounded-xl mr-4 shadow-sm">
              <span className="text-white text-xl">🎓</span>
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Education</span>
          </h2>
          
          <div className="grid gap-6 md:grid-cols-1">
            {profile.education.map((edu, index) => (
              <div key={index} className="bg-white/80 p-6 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4 group-hover:bg-blue-200 transition-colors">
                    <span className="text-blue-600 text-2xl">📚</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{edu.degree}</h3>
                    <p className="text-blue-700 font-medium mb-2">{edu.field}</p>
                    <p className="text-gray-700 mb-3">{edu.institution}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                        {edu.duration}
                      </span>
                      {edu.gpa && (
                        <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-sm font-medium">
                          GPA: {edu.gpa}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {profile.projects && profile.projects.length > 0 && (
        <div className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl mr-4 shadow-sm">
              <span className="text-white text-xl">🚀</span>
            </span>
            <span className="bg-gradient-to-r from-purple-600 to-pink-700 bg-clip-text text-transparent">Projects</span>
          </h2>
          
          <div className="grid gap-6 md:grid-cols-1">
            {profile.projects.map((project, index) => (
              <div key={index} className="bg-white/80 p-6 rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-start mb-4 md:mb-0">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
                      <span className="text-purple-600 text-2xl">💻</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                      <p className="text-gray-700 mt-2 leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                  
                  {project.links && project.links.length > 0 && (
                    <div className="flex gap-2 flex-shrink-0">
                      {project.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors transform hover:scale-105"
                        >
                          {link.includes('github.com') ? (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                              </svg>
                              Code
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              Demo
                            </>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                
                {project.skills && project.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm rounded-full border border-purple-200/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {profile.skills && profile.skills.length > 0 && (
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-600 p-3 rounded-xl mr-4 shadow-sm">
              <span className="text-white text-xl">🛠️</span>
            </span>
            <span className="bg-gradient-to-r from-indigo-600 to-blue-700 bg-clip-text text-transparent">Skills</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-3">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}