import LoginForm from "@/components/LoginForm";

export default function LoginPage() { // Changed from LoginForm to LoginPage
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <LoginForm />
    </div>
  );
}
