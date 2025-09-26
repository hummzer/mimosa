// src/app/signin/page.tsx

'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Import icons for the form and social media
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from 'react-icons/fa';
import { BsInstagram, BsTiktok, BsYoutube, BsBox } from 'react-icons/bs'; // Using BsBox as a generic icon for 'YouTube Shorts'

const SignUpInPage = () => {
  // We'll set the initial state based on the router query later if needed, but for now,
  // we default to false (Sign In) to match the image.
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      // Sign Up Logic (kept the original structure)
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const result = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (result?.error) {
          alert('Sign in failed after registration: Invalid credentials');
        } else {
          router.push('/dashboard');
        }
      } else {
        const errorData = await response.json();
        alert(`Sign up failed: ${errorData.message}`);
      }
    } else {
      // Sign In Logic
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        alert('Sign in failed: Invalid credentials');
      } else {
        router.push('/dashboard');
      }
    }
  };

  const PrimaryButtonText = isSignUp ? 'Create Account' : 'Log in';
  const SecondaryLinkText = isSignUp ? 'Sign in' : 'Sign up';
  const SecondaryPromptText = isSignUp ? 'Already have an account?' : "Don't have an account?";

  // Social media icon data for the left graph
  const socialIcons = [
    { name: 'YouTube', icon: <BsYoutube className="text-red-500 text-lg" />, position: 'top-center' },
    { name: 'TikTok', icon: <BsTiktok className="text-black dark:text-white text-lg" />, position: 'center-left' },
    { name: 'Instagram', icon: <BsInstagram className="text-pink-500 text-lg" />, position: 'center-right' },
    { name: 'Shorts', icon: <BsBox className="text-red-600 text-lg" />, position: 'bottom-left' }, // Using BsBox for 'B' or Shorts icon
    { name: 'Facebook', icon: <FaFacebookF className="text-blue-600 text-lg" />, position: 'bottom-right' },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 bg-background transition-colors duration-300">

      {/* Full Background Image */}
      <Image
        src="/regbanner.jpg"
        alt="Background banner image"
        fill
        style={{ objectFit: 'cover' }}
        quality={80}
        className="absolute inset-0 -z-10"
      />

      {/* Main Card Container (Smaller, less rounded) */}
      <div className="relative z-10 w-full max-w-3xl min-h-[500px] flex flex-col lg:flex-row rounded-lg shadow-2xl overflow-hidden bg-white/10 backdrop-blur-sm dark:bg-gray-900/40 transition-colors duration-300 border border-gray-200/50 dark:border-gray-700/50">

        {/* Left Section: Social Media Graph (Transparent background) */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 relative overflow-hidden bg-transparent dark:bg-transparent">
          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="grid grid-cols-3 grid-rows-3 gap-0 p-4 w-60 h-60"> {/* Smaller Grid */}

              {/* Central Logo */}
              <div className="col-start-2 row-start-2 flex items-center justify-center relative">
                <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-lg shadow-md flex items-center justify-center border border-gray-200 dark:border-gray-700">
                  <Image src="/app-logo-vector.svg" alt="App Logo" width={24} height={24} />
                </div>
              </div>

              {/* Dotted lines and Social Icons positioning */}
              {/* Note: Simplified social icon placement for aesthetic purposes */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <line x1="50" y1="50" x2="50" y2="15" stroke="#9ca3af" strokeDasharray="4 4" /> {/* Top */}
                    <line x1="50" y1="50" x2="15" y2="50" stroke="#9ca3af" strokeDasharray="4 4" /> {/* Left */}
                    <line x1="50" y1="50" x2="85" y2="50" stroke="#9ca3af" strokeDasharray="4 4" /> {/* Right */}
                    <line x1="50" y1="50" x2="25" y2="75" stroke="#9ca3af" strokeDasharray="4 4" /> {/* Bottom Left */}
                    <line x1="50" y1="50" x2="75" y2="75" stroke="#9ca3af" strokeDasharray="4 4" /> {/* Bottom Right */}
                </svg>
              </div>

              {/* Render Social Icons */}
              <SocialIcon icon={<BsYoutube className="text-red-500 text-lg" />} position="top-[10%]" />
              <SocialIcon icon={<BsTiktok className="text-black dark:text-white text-lg" />} position="left-[10%]" />
              <SocialIcon icon={<BsInstagram className="text-pink-500 text-lg" />} position="right-[10%]" />
              <SocialIcon icon={<BsBox className="text-red-600 text-lg" />} position="bottom-[10%] left-[25%]" />
              <SocialIcon icon={<FaFacebookF className="text-blue-600 text-lg" />} position="bottom-[10%] right-[25%]" />

            </div>
          </div>
        </div>

        {/* Right Section: Sign In/Sign Up Form (Solid background) */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8 space-y-6 bg-white dark:bg-gray-900 transition-colors duration-300">

          {/* Logo/App Name at the top of the form */}
          <div className="flex justify-start items-center pb-4">
            <h1 className="text-2xl font-semibold text-foreground">Momo</h1>
          </div>

          <form onSubmit={handleAuthAction} className="w-full max-w-xs space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm text-gray-500 dark:text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition duration-300 text-foreground"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="JohnWill@gmail.com"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm text-gray-500 dark:text-gray-400">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition duration-300 text-foreground"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  required
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                </div>
              </div>

              {/* Forgot Password Link (Only for Sign In) */}
              {!isSignUp && (
                <div className="text-right mt-1">
                  <a href="#" className="text-xs text-gray-500 dark:text-gray-400 hover:underline">Forgot Password?</a>
                </div>
              )}
            </div>

            {/* Terms and Privacy (Only for Sign Up) */}
            {isSignUp && (
              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="terms"
                  className="form-checkbox text-black dark:text-white bg-gray-300 dark:bg-gray-700 border-gray-400 dark:border-gray-600 rounded-sm focus:ring-transparent focus:ring-offset-transparent transition"
                  checked={termsAgreed}
                  onChange={(e) => setTermsAgreed(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400">
                  I Agree To The <span className="underline hover:text-black dark:hover:text-white cursor-pointer">Terms & Privacy Policy</span>
                </label>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 text-base text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-md shadow-lg transition duration-300 flex items-center justify-center font-medium tracking-wide"
            >
              {PrimaryButtonText}
              <span className="ml-2">→</span>
            </button>
          </form>

          {/* Don't have an account? Sign up/in link */}
          <div className="text-center w-full max-w-xs pt-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {SecondaryPromptText}
            </span>
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-black dark:text-white hover:underline ml-1 focus:outline-none text-sm font-medium"
            >
              {SecondaryLinkText}
            </button>
          </div>

          {/* Or continue with divider */}
          <div className="flex items-center w-full max-w-xs">
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
            <span className="px-3 text-sm text-gray-500 dark:text-gray-400">Or continue with</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          </div>

          {/* Social Logins */}
          <div className="flex justify-center space-x-4 w-full max-w-xs pb-4">
            <button
              onClick={() => signIn('google')}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Sign in with Google"
            >
              <FaGoogle className="text-lg text-red-500" />
            </button>
            <button
              onClick={() => signIn('facebook')}
              className="p-2 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Sign in with Facebook"
            >
              <FaFacebookF className="text-lg text-blue-600" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SignUpInPage;

// --- Helper Component for Social Icons in the Graph ---
const SocialIcon = ({ icon, position }: { icon: React.ReactNode, position: string }) => {
  const baseClasses = "absolute w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 transition-colors duration-300";
  // Applying custom position class string
  return (
    <div className={baseClasses} style={{ 
        transform: 'translate(-50%, -50%)', 
        top: position.includes('top') ? position.split(' ')[0] : undefined,
        bottom: position.includes('bottom') ? position.split(' ')[0] : undefined,
        left: position.includes('left') ? position.split(' ')[0] : undefined,
        right: position.includes('right') ? position.split(' ')[0] : undefined,
    }}>
      {icon}
    </div>
  );
};