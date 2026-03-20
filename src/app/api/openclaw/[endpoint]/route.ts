import { NextResponse } from 'next/server';

// OpenClaw Gateway URL
const GATEWAY_URL = 'http://localhost:21412';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = searchParams.get('endpoint') || 'status';
  
  try {
    let url = GATEWAY_URL;
    
    // Map endpoints to OpenClaw API
    switch (endpoint) {
      case 'status':
        url = `${GATEWAY_URL}/api/status`;
        break;
      case 'agents':
        url = `${GATEWAY_URL}/api/agents`;
        break;
      case 'tasks':
        url = `${GATEWAY_URL}/api/tasks`;
        break;
      case 'events':
        url = `${GATEWAY_URL}/api/events`;
        break;
      default:
        url = `${GATEWAY_URL}/api/${endpoint}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Gateway error: ${response.status}` },
        { status: response.status }
      );
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Gateway error:', error);
    
    // Return fallback message
    return NextResponse.json({
      error: 'Gateway unavailable',
      message: 'OpenClaw Gateway is not running',
      fallback: true
    });
  }
}
