'use client'; // Make sure it's a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // For programmatic navigation

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the login payload
    const loginPayload = { email, password };

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginPayload),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect user to dashboard on successful login
        router.push('/dashboard');
      } else {
        setError(data.message); // Show error if login fails
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
      {/* Brand Name */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white tracking-wide">
        <h1>Nexify</h1>
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-80 rounded-xl shadow-lg backdrop-blur-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Sign In</h2>
        
        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
          >
            Log In
          </button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <button onClick={() => router.push("api/signup")} className="text-blue-600 hover:underline">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
