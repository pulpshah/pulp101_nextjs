'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function EnterPassword() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');  // Capture email
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      password,
      email,  
    });

    if (res?.ok) {
      router.push('/'); 
    } else {
      setError("Invalid password or email");
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
      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
