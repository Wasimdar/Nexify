// app/api/auth/login/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Get the email and password from the request body
  const { email, password } = await request.json();

  // Hardcoded credentials for demonstration (replace with DB query)
  const mockUser = {
    email: 'user@example.com',
    password: 'password123',  // In a real app, use hashed passwords
  };

  // Check if the email and password match the mock user data
  if (email !== mockUser.email || password !== mockUser.password) {
    return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 });
  }

  // Return a success response if login is successful
  return NextResponse.json({ success: true, message: 'Login successful' });
}
