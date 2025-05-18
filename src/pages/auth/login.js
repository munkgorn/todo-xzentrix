// 'use client'
import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    if (typeof window !== "undefined") {
      router.push("/");
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    await signIn("credentials", formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login TO-DO app</h2>
          {/* {status} */}
          <div>
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">Username</label>
            <input type="text" name="username" required className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
            <input type="password" name="password" required className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-3 w-full rounded hover:bg-blue-700 transition">Login</button>
          <div className="mt-4 text-center">
            <Link href="/auth/register" className="text-blue-600 hover:underline">
              Don&apos;t have an account? Register
            </Link>
          </div>
        </form>
      </main>
      <footer className="bg-gray-100 text-center p-4 text-gray-600">
        &copy; 2025 Todo App
      </footer>
    </div>
  );
};

export default Login;
