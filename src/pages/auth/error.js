import React from 'react';
import { useRouter } from 'next/router';

function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-red-700 mb-6">
            {error ? decodeURIComponent(error) : 'An unknown error occurred.'}
          </p>
          <button
            onClick={() => router.push('/auth/login')}
            className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Back to Login
          </button>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
