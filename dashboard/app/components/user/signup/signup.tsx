'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const signupPayload = { email, password };

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupPayload),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/login'); // Redirect to login after successful sign-up
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred during signup');
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-white">
        <h1>Nexify</h1>
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white bg-opacity-90 rounded-xl shadow-lg backdrop-blur-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-700">Create an Account</h2>
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <button onClick={() => router.push("/")} className="text-green-600 hover:underline">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
