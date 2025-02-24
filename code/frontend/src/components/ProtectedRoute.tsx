import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div className="flex flex-col min-h-screen">{children || <Outlet />}</div>
  );
}
