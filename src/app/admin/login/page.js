'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/portfolio');
      router.refresh();
    } else {
      setError('Wrong password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form onSubmit={submit} className="w-full max-w-sm space-y-6">
        <div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold mb-3">Admin</p>
          <h1 className="font-heading text-3xl text-foreground">Sign in</h1>
        </div>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          className="w-full border-b border-border bg-transparent py-3 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-foreground transition-colors"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-background py-3 text-xs uppercase tracking-[0.25em] hover:bg-gold transition-colors duration-300 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
