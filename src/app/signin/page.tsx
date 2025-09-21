// src/app/signin/page.tsx

'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const SignUpInPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const router = useRouter();
  const { status } = useSession();

  // Redirect authenticated users to the dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleAuthAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSignUp) {
      if (!termsAgreed) {
        alert('You must agree to the Terms & Privacy Policy.');
        return;
      }
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Automatically sign in the user after successful signup
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          alert('Sign in failed after registration: Invalid credentials');
        } else {
          router.push('/dashboard'); // Redirect to dashboard on success
        }
      } else {
        const errorData = await response.json();
        alert(`Sign up failed: ${errorData.message}`);
      }
    } else {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        alert('Sign in failed: Invalid credentials');
      } else {
        router.push('/dashboard'); // Redirect to dashboard on success
      }
    }
  };

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center p-4 font-light tracking-wide font-ios">
      <Image
        src="/city.jpg"
        alt="A surreal cityscape with a television"
        fill
        style={{ objectFit: 'cover' }}
        quality={100}
        className="-z-10"
      />
      <div className="relative z-10 w-full max-w-6xl md:h-[80vh] flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-700">
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-black bg-opacity-70 overflow-y-auto space-y-8">
          <div className="text-center w-full">
            <h1 className="text-3xl font-light mb-2">
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </h1>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">
              {isSignUp
                ? 'Create your account to access the full Momo platform.'
                : 'Welcome back! Please log in to continue.'}
            </p>
          </div>

          <form onSubmit={handleAuthAction} className="w-full max-w-sm space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-900 text-gray-200 placeholder-gray-500 border-b border-gray-700 focus:outline-none focus:border-white transition duration-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm text-gray-400">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-gray-900 text-gray-200 placeholder-gray-500 border-b border-gray-700 focus:outline-none focus:border-white transition duration-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {isSignUp && (
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox text-white bg-gray-900 border-gray-700 focus:ring-transparent focus:ring-offset-transparent rounded-sm"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I Agree To The <span className="underline hover:text-white cursor-pointer">Terms & Privacy Policy</span>
                </label>
              </div>
            )}
            <button
              type="submit"
              className="w-full py-3 text-base text-black bg-white hover:bg-gray-200 rounded-sm transition duration-300"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <hr className="w-full max-w-sm border-gray-700 my-4" />

          <div className="w-full text-center">
            <span className="text-sm text-gray-400">
              {isSignUp ? 'Already have an account?' : 'Don’t have an account?'}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-white hover:underline ml-1 focus:outline-none"
            >
              {isSignUp ? 'Sign in here' : 'Sign up here'}
            </button>
          </div>
        </div>
        <div className="hidden md:flex flex-1 items-center justify-center p-8 relative">
          <Image
            src="/regbanner.jpg"
            alt="A surreal close-up with dynamic effects"
            width={280}
            height={280}
            quality={100}
            className="rounded-lg shadow-xl"
            style={{ objectFit: 'contain' }}
          />
          <div className="absolute inset-0 bg-transparent backdrop-filter backdrop-blur-md bg-opacity-30"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpInPage;