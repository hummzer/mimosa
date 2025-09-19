'use client';

import { signIn } from 'next-auth/react';
import React, { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => signIn('credentials', { email, password, redirectTo: '/dashboard' });
  const handleSignUp = async () => {
    // Implement sign-up logic: POST to custom API route to hash password and create user
    await fetch('/api/signup', { method: 'POST', body: JSON.stringify({ email, password }) });
    handleSignIn();
  };

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleSignIn}>Sign In</button>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  );
}