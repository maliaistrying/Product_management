import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-3xl font-bold">
        Welcome to the Product Management System
      </h1>
      {/* <div className="flex space-x-4">
        <Link href="/login">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </Link>
        <Link href="/signup">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Sign Up
          </button>
        </Link>
      </div> */}
    </div>
  );
}
