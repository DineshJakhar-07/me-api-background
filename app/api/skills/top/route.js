import connectDB from '../../../../lib/mongodb';
import Profile from '../../../../models/Profile';

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return Response.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
    
    // Get all skills from profile and projects
    const allSkills = [
      ...profile.skills,
      ...profile.projects.flatMap(project => project.skills)
    ];
    
    // Count skill occurrences
    const skillCount = {};
    allSkills.forEach(skill => {
      const normalizedSkill = skill.toLowerCase().trim();
      skillCount[normalizedSkill] = (skillCount[normalizedSkill] || 0) + 1;
    });
    
    // Sort by count and get top 10
    const topSkills = Object.entries(skillCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([skill, count]) => ({ skill, count }));
    
    return Response.json({ topSkills });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
