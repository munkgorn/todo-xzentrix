import React from 'react';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log('Login form data:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-3xl font-bold">Todo App</h1>
      </header>
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
          <div>
            <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">Email</label>
            <input type="email" name="email" required className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
            <input type="password" name="password" required className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-blue-600 text-white p-3 w-full rounded hover:bg-blue-700 transition">Login</button>
          <div className="mt-4 text-center">
            <a href="/register" className="text-blue-600 hover:underline">
              Don't have an account? Register
            </a>
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
