import connectDB from '../../../lib/mongodb';
import Profile from '../../../models/Profile';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const skill = searchParams.get('skill');
    
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return Response.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
    
    let projects = profile.projects;
    
    // Filter by skill if provided
    if (skill) {
      projects = projects.filter(project => 
        project.skills.some(projectSkill => 
          projectSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
    }
    
    return Response.json({ projects });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
