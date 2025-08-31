import connectDB from '../../../lib/mongodb';
import Profile from '../../../models/Profile';

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

    return Response.json(profile);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const profile = new Profile(body);
    await profile.save();
    
    return Response.json(profile, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();
    
    const profile = await Profile.findOne().sort({ createdAt: -1 });
    
    if (!profile) {
      return Response.json(
        { message: 'Profile not found' },
        { status: 404 }
      );
    }
    
    Object.assign(profile, body);
    await profile.save();
    
    return Response.json(profile);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
