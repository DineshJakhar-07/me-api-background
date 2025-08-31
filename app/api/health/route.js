export async function GET() {
  try {
    return Response.json(
      { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        message: 'Me-API Playground is running successfully!'
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { 
        status: 'unhealthy', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
