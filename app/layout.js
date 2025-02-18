import Link from "next/link";
import "./styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
          <h1 className="text-xl font-bold">Product Management System</h1>
          <div className="space-x-4">
            <Link href="/login" className="hover:underline">
              Login
            </Link>
            <Link href="/signup" className="hover:underline">
              Signup
            </Link>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
