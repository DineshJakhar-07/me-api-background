import connectDB from '../../../lib/mongodb';
import Profile from '../../../models/Profile';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return Response.json(
        { message: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }
    
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return Response.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
    
    const searchTerm = query.toLowerCase();
         const results = {
       profile: null,
       projects: [],
       skills: []
     };
    
    // Search in profile
    if (profile.name.toLowerCase().includes(searchTerm) ||
        profile.email.toLowerCase().includes(searchTerm) ||
        (profile.bio && profile.bio.toLowerCase().includes(searchTerm))) {
      results.profile = profile;
    }
    
    // Search in projects
    results.projects = profile.projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
    
    // Search in skills
    results.skills = profile.skills.filter(skill =>
      skill.toLowerCase().includes(searchTerm)
    );
    
    
    
    return Response.json(results);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
