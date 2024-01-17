
import Link from 'next/link'

export default function Login() {

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
    <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
      <form className="mt-6">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Email
          </label>
          <input
            type="email"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <Link
          href="/forgot-password"
          className="text-xs text-blue-600 hover:underline"
        >
          Forget Password?
        </Link>
        <div className="mt-2">
          <button type='submit' className="w-full py-2  text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-indigo-600">Login</button>
        </div>
      </form>
    </div>
  </div>
  )
}
