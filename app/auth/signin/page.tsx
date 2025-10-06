"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid credentials");
      return;
    }
    router.push(callbackUrl);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-2xl bg-white/10 p-8 text-white backdrop-blur">
        <div>
          <h1 className="font-heading text-3xl">Admin sign in</h1>
          <p className="text-sm text-white/70">Only authorized editors can access this dashboard.</p>
        </div>
        <div>
          <label className="text-xs uppercase text-white/60">Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mt-2 bg-white/90 text-slate-900"
          />
        </div>
        <div>
          <label className="text-xs uppercase text-white/60">Password</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="mt-2 bg-white/90 text-slate-900"
          />
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
