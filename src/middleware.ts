import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const forceSignoutCookie = request.cookies.get('force_signout');

  // If there's a force signout cookie and the current user matches
  if (forceSignoutCookie && token?.name === forceSignoutCookie.value) {
    // Clear the force signout cookie
    const response = NextResponse.redirect(new URL('/auth/signin', request.url));
    response.cookies.delete('force_signout');
    
    // Clear the session
    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('next-auth.callback-url');
    response.cookies.delete('next-auth.csrf-token');
    
    return response;
  }

  // Check if the user is trying to access admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
    '/courses/:path*',
    '/auth/signin'
  ]
}; 


