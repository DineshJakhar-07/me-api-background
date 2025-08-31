'use client';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🛠️' },
    { id: 'search', label: 'Search', icon: '🔍' }
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-50 to-blue-50 backdrop-blur-lg border-b border-gray-200/70 shadow-sm sticky top-0 z-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center py-3 px-5 rounded-xl font-medium text-sm transition-all duration-300 ease-out group ${
                activeTab === tab.id
                  ? 'text-white bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-200'
                  : 'text-gray-600 hover:text-indigo-700 hover:bg-white/80 hover:shadow-md'
              }`}
            >
              {/* Animated icon container */}
              <span className={`relative mb-1.5 text-lg transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {tab.icon}
                {/* Subtle shine effect on active */}
                {activeTab === tab.id && (
                  <span className="absolute inset-0 animate-pulse opacity-70">
                    {tab.icon}
                  </span>
                )}
              </span>
              
              {/* Label with subtle scaling */}
              <span className={`transition-transform duration-300 ${activeTab === tab.id ? 'font-semibold scale-105' : 'group-hover:font-medium'}`}>
                {tab.label}
              </span>
              
              {/* Subtle dot indicator for active state */}
              {activeTab === tab.id && (
                <span className="absolute -top-1 w-2 h-2 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}