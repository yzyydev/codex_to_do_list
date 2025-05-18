"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "codex" && password === "codex") {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white text-black p-8 rounded shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded"
        />
        <button type="submit" className="bg-foreground text-background px-3 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
