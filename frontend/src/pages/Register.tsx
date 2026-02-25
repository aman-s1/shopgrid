import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import { API_URL } from '../env';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      login(data.user);

      navigate('/');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px]"></div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-4xl font-black tracking-tight text-transparent">
            Start Your Journey
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Create an account to access premium features
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-white/5 bg-white/2 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="group relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400">
                  <UserIcon className="h-5 w-5" />
                </div>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 font-medium text-white transition-all placeholder:text-gray-600 focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>
              <div className="group relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400">
                  <EnvelopeIcon className="h-5 w-5" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 font-medium text-white transition-all placeholder:text-gray-600 focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>
              <div className="group relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 font-medium text-white transition-all placeholder:text-gray-600 focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>
              <div className="group relative">
                <div className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 transition-colors group-focus-within:text-purple-400">
                  <LockClosedIcon className="h-5 w-5" />
                </div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pr-4 pl-12 font-medium text-white transition-all placeholder:text-gray-600 focus:border-purple-500/30 focus:ring-4 focus:ring-purple-500/10 focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="animate-shake flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
                <ExclamationCircleIcon className="h-5 w-5 shrink-0" />
                <p className="text-xs font-bold tracking-wider uppercase">
                  {error}
                </p>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full transform justify-center rounded-2xl border border-transparent bg-white px-4 py-4 text-sm font-black text-black transition-all hover:bg-gray-100 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black/20 border-t-black"></div>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign Up
                    <ArrowRightOnRectangleIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm font-medium text-gray-500">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-bold text-white transition-colors hover:text-purple-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
