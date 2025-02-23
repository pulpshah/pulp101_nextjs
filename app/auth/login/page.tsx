"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import AnimatedText from '@/components/animate-text';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.status === 'success') {
      router.push('/');
      router.refresh();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h1
        className="flex items-center justify-center mb-6 sm:text-6xl text-center text-textColor font-normal inter inline-block whitespace-nowrap animate-typing border-r-2 animate-cursor"
        style={{
          fontSize: "60px",
          fontWeight: 600,
          verticalAlign: "middle",
          lineHeight: 5,
        }}
      >
        Welcome to Pulp101
      </h1>
    
      <div className="flex items-center justify-center bg-20 14.3% 4.1%">
        
        <div className="flex w-[90vw] max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
          
          {/* Left Section - Illustration */}
          <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-r from-purple-700 to-indigo-900 text-white p-10">
            <AnimatedText className="text-3xl font-bold" text='Hello! Good Morning!' repeatDelay={1000}/>
            <p className="mt-4 text-center">Login to your account</p>
            <img src="/public/images/pulp101-logo.svg" alt="Illustration" className="w-full mt-6" />
          </div>

          {/* Right Section - Login Form */}
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Login to your account</h2>
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-500"
              >
                Login
              </button>
            </form>

            <p className="mt-4 text-center text-gray-500">
              Don't have an account?{' '}
              <a href="/auth/signup" className="text-purple-600 hover:underline">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
