import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <SignIn />
    </main>
  );
}
