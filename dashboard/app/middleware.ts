import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Redirect root URL to /login
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the user is already authenticated, prevent access to /register and /login
  const isAuthenticated = req.cookies.get('authToken'); // Assuming an auth token is stored in cookies
  const isAuthPage = pathname === '/login' || pathname === '/register';

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url)); // Redirect authenticated users to the dashboard
  }

  // If not authenticated, ensure restricted pages are handled
  const isProtectedPage = pathname.startsWith('/dashboard'); // Example: Protect `/dashboard` routes
  if (!isAuthenticated && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', req.url)); // Redirect unauthenticated users to login
  }

  return NextResponse.next(); // Allow access to other routes
}

export const config = {
  matcher: ['/', '/register', '/login', '/dashboard/:path*'], // Define which routes this middleware applies to
};
