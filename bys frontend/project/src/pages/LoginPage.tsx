import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from context

const LoginPage: React.FC = () => {
  const { login, register, loading } = useAuth(); // Destructure login, register, and loading from context
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract redirect URL from query params if it exists
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/';

  // Submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      let success;

      if (isLogin) {
        // Handle login using context login method
        success = await login(email, password);
        if (success) {
          navigate(redirectUrl);
        } else {
          setError('Invalid email or password');
        }
      } else {
        // Handle registration using context register method
        if (!name) {
          setError('Name is required');
          return;
        }

        success = await register(name, email, password, phone);
        if (success) {
          navigate(redirectUrl);
        } else {
          setError('Registration failed. Please try again.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-900 py-4 px-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <Link to="/" className="text-gray-400 hover:text-white">
                ✕
              </Link>
            </div>
          </div>

          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your name"
                  />
                </div>
              )}

              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-md focus:outline-none hover:bg-red-700"
                  disabled={loading} // Disable button when loading
                >
                  {loading ? 'Loading...' : isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </div>

              <div className="text-center">
                <span>
                  {isLogin ? 'Don’t have an account? ' : 'Already have an account? '}
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? 'Create one' : 'Sign In'}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
