import { ArrowRight, Files } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function Hero() {
  return (
    <section id="#" className="space-y-8 pt-8 md:pt-12">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        <div className="space-y-4 max-w-4xl">
          <Badge variant="outline" className="space-x-1 rounded-full px-4 py-2">
            <span>🚀</span>
            <span>Transform Your Documents</span>
          </Badge>
          <h1 className="text-4xl md:text-6xl font-medium">
            <span>Digitize Faster, </span>
            <span>Access Smarter</span>
          </h1>
          <p className="text-lg md:text-xl text-accent-foreground leading-relaxed">
            Convert handwritten documents into editable digital formats with
            ease. Transform your files quickly and securely for better access
            and use.
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Button variant="default" size="lg">
          <a href="/dashboard">
            <span>
              <SignedIn>Go to Dashboard</SignedIn>
              <SignedOut>Get Started</SignedOut>
            </span>
          </a>
          <ArrowRight />
        </Button>
        <Button variant="outline" size="lg">
          <Files />
          <a href="/docs">
            <span>Browse Docs</span>
          </a>
        </Button>
      </div>
      <div className="flex items-center justify-center pt-8">
        <div className="bg-secondary h-96 w-4xl rounded-xl"></div>
      </div>
    </section>
  );
}
