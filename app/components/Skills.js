'use client';

export default function Skills({ topSkills }) {
  return (
    <div className="space-y-8 p-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-white/80 to-blue-50/60 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Skills & Technologies
        </h1>
        <p className="text-lg text-gray-700">
          Technologies and tools I work with to bring ideas to life.
        </p>
      </div>

      {/* Skills Grid */}
      <div className="bg-gradient-to-br from-white/80 to-indigo-50/50 rounded-2xl shadow-lg border border-gray-200/50 p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          My Skills
        </h2>
        
        {topSkills.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {topSkills.map((skill, index) => (
              <div
                key={skill.skill}
                className="bg-white/80 rounded-xl p-4 text-center border border-gray-200/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300">
                  <span className="text-white font-bold text-sm">
                    {skill.skill.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {skill.skill}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No skills to display</h3>
            <p className="text-gray-700">Skills will appear here once added to your profile.</p>
          </div>
        )}
      </div>

      {/* Simple Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-6">Skills Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">{topSkills.length}</div>
            <div className="text-blue-100">Technologies Mastered</div>
          </div>
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl font-bold mb-2">5+</div>
            <div className="text-blue-100">Years Experience</div>
          </div>
        </div>
      </div>
    </div>
  );
}