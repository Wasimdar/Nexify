// middleware/authMiddleware.ts

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Check if it's the first page load or the root URL
  const isRoot = req.nextUrl.pathname === '/';

  // If it's the root, redirect to the login page
  if (isRoot) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next(); // Proceed with the normal request if not the root page
}

// Apply middleware to root ("/") to redirect to the login page
export const config = {
  matcher: ['/'],  // Only apply middleware to the root route
};
