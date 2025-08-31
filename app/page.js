'use client';

import { useState, useEffect } from 'react';
import Profile from './components/Profile';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Search from './components/Search';
import Navigation from './components/Navigation';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchProfile();
    fetchTopSkills();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopSkills = async () => {
    try {
      const response = await fetch('/api/skills/top');
      if (response.ok) {
        const data = await response.json();
        setTopSkills(data.topSkills || []);
      }
    } catch (error) {
      console.error('Error fetching top skills:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h1>
          <p className="text-gray-600">Please check your database connection and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Me-API Playground</h1>
                <p className="text-sm text-gray-600">Developer Portfolio & API</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/api/health"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                API Health
              </a>
              <a
                href="https://github.com/yourusername/me-api-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'profile' && <Profile profile={profile} />}
        {activeTab === 'projects' && <Projects projects={projects} />}
        {activeTab === 'skills' && <Skills topSkills={topSkills} />}
        {activeTab === 'search' && <Search />}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>Built with Next.js, MongoDB, and Tailwind CSS</p>
            <p className="text-sm mt-2">© 2024 Me-API Playground</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
