'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const EnterEmail = () => {
  const [email, setEmail] = useState<string>('');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/save-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      router.push('/');  // Redirect to protected area after email is saved in session
    } else {
      setError("Failed to save email");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default EnterEmail;
