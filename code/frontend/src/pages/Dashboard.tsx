import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

export default function Dashboard() {
  const { user } = useUser();

  return (
    <main>
      <h1>Welcome, {user?.username}</h1>
      <div className="space-x-8">
        <Button>
          <a href="/upload">Upload Page</a>
        </Button>
        <Button>
          <a href="/editor">Editor Page</a>
        </Button>
      </div>
    </main>
  );
}
