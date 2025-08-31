'use client';

import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        setResults(null);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults(null);
    setHasSearched(false);
  };

  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Search Portfolio
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Search across my profile, projects, and skills.
        </p>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for skills, projects, technologies..."
              className="w-full px-5 py-4 pl-14 pr-24 border border-gray-300/80 rounded-xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 bg-white/90 text-gray-900 placeholder-gray-500 text-lg"
              style={{ color: '#111827' }} // Ensures text is dark and visible
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 mr-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : 'Search'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-6">
          {loading ? (
            <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-700 text-lg">Searching across portfolio...</p>
              </div>
            </div>
          ) : results ? (
            <>
              {/* Profile Results */}
              {results.profile && (
                <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-6 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">👤</span>
                    Profile Match
                  </h2>
                  <div className="flex items-center space-x-4 p-4 bg-white/80 rounded-xl border border-gray-200/50">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {results.profile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{results.profile.name}</h3>
                      <p className="text-gray-600">{results.profile.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Results */}
              {results.projects && results.projects.length > 0 && (
                <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-6 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">💼</span>
                    Projects ({results.projects.length})
                  </h2>
                  <div className="space-y-4">
                    {results.projects.map((project, index) => (
                      <div key={index} className="bg-white/80 p-4 rounded-xl border border-gray-200/50 hover:shadow-md transition-shadow duration-300">
                        <h3 className="font-semibold text-gray-900 text-lg mb-2">{project.title}</h3>
                        <p className="text-gray-700 mb-3">{project.description}</p>
                        {project.skills && project.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.skills.map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm rounded-full font-medium border border-blue-200/50"
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

              {/* Skills Results */}
              {results.skills && results.skills.length > 0 && (
                <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-6 backdrop-blur-sm">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg mr-3 text-white">🛠️</span>
                    Skills ({results.skills.length})
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {results.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {(!results.profile && (!results.projects || results.projects.length === 0) && 
                (!results.skills || results.skills.length === 0)) && (
                <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center backdrop-blur-sm">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No results found</h3>
                  <p className="text-gray-700 mb-6 max-w-md mx-auto">
                    No matches found for "<span className="text-blue-600 font-medium">{query}</span>". Try different keywords or check your spelling.
                  </p>
                  <button
                    onClick={clearSearch}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-8 text-center backdrop-blur-sm">
              <div className="text-6xl mb-4">❌</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Search failed</h3>
              <p className="text-gray-700 mb-6">
                There was an error performing the search. Please try again.
              </p>
              <button
                onClick={clearSearch}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Search Tips */}
      {!hasSearched && (
        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-2xl p-8 border border-gray-200/50">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">Search Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-2 text-blue-600">💡</span>
                Try searching for:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Technology names (React, Node.js, MongoDB)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Project titles or descriptions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  Skills or programming languages
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-2 text-blue-600">🌐</span>
                Examples:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  "e-commerce"
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  "React"
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></span>
                  "full-stack"
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}