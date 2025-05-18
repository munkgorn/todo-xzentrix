import React from 'react';
import { sendRegister, checkDuplicateUser } from '@/graphql/auth';
import { useRouter } from 'next/router';

const Register = () => {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }
    const checkduplicateUser = await checkDuplicateUser(e.target.username.value);
    if (checkduplicateUser) {
      alert("Username already exists");
      return;
    }
    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    const result = await sendRegister(formData.username, formData.password);
    console.log(result)
    if (result) {
      alert("Registration successful");
      router.push("/auth/login");
      // Redirect to login page or perform any other action
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-50">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Register TO-DO app</h2>
          <div>
            <label htmlFor="username" className="block mb-2 font-semibold text-gray-700">Username</label>
            <input type="text" name="username" required className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 font-semibold text-gray-700">Password</label>
            <input type="password" name="password" required className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 font-semibold text-gray-700">Confirm Password</label>
            <input type="password" name="confirmPassword" required className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button type="submit" className="bg-green-600 text-white p-3 w-full rounded hover:bg-green-700 transition">Register</button>
        </form>
      </main>
      <footer className="bg-gray-100 text-center p-4 text-gray-600">
        &copy; 2025 Todo App
      </footer>
    </div>
  );
};

export default Register;
