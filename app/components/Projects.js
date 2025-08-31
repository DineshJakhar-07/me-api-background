'use client';

import { useState, useEffect } from 'react';

export default function Projects({ projects: initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState(initialProjects);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [loading, setLoading] = useState(false);

  // Get unique skills from all projects
  const allSkills = [...new Set(initialProjects.flatMap(project => project.skills))];

  const filterBySkill = async (skill) => {
    setSelectedSkill(skill);
    setLoading(true);
    
    try {
      if (skill) {
        const response = await fetch(`/api/projects?skill=${encodeURIComponent(skill)}`);
        if (response.ok) {
          const data = await response.json();
          setFilteredProjects(data.projects);
        }
      } else {
        setFilteredProjects(projects);
      }
    } catch (error) {
      console.error('Error filtering projects:', error);
      setFilteredProjects(projects);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-3xl">
          Here are some of the projects I've worked on. Filter by skills to find specific technologies.
        </p>
        
        {/* Skill Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Technology:
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => filterBySkill('')}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                selectedSkill === ''
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200'
                  : 'bg-white/80 text-gray-700 hover:bg-white shadow-md hover:shadow-lg border border-gray-200/60'
              }`}
            >
              All Projects
            </button>
            {allSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => filterBySkill(skill)}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 transform hover:-translate-y-0.5 ${
                  selectedSkill === skill
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white/80 text-gray-700 hover:bg-white shadow-md hover:shadow-lg border border-gray-200/60'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Filtering projects...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/80 to-blue-50/40 rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Project Image */}
              {project.image && (
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Skills */}
                {project.skills && project.skills.length > 0 && (
                  <div className="mb-5">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200/50"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Links */}
                {project.links && project.links.length > 0 && (
                  <div className="flex gap-3">
                    {project.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                      >
                        {link.includes('github.com') ? (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                            </svg>
                            Code
                          </>
                        ) : (
                          <>
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-gradient-to-br from-white/80 to-blue-50/40 rounded-2xl shadow-lg border border-gray-200/50">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-700 max-w-md mx-auto">
            {selectedSkill 
              ? `No projects found for "${selectedSkill}". Try a different skill or view all projects.`
              : 'No projects available at the moment.'
            }
          </p>
          {selectedSkill && (
            <button
              onClick={() => filterBySkill('')}
              className="mt-4 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View All Projects
            </button>
          )}
        </div>
      )}
    </div>
  );
}