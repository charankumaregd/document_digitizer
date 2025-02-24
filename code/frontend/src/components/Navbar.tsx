import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import Logo from "@/assets/svg/logo.svg";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/#" },
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ];

  useEffect(() => {
    function handleResize() {
      if (isMenuOpen && window.innerWidth < 768) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Logo" className="h-6 w-6" />
            <span className="text-lg font-bold">Document Digitizer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-accent-foreground font-medium hover:underline hover:underline-offset-2"
              >
                {item.name}
              </a>
            ))}

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <SignedOut>
                <Button variant="outline" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="default" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/register">Sign up</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </SignOutButton>
                <Button variant="default" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </SignedIn>
            </div>
          </div>

          {/* Mobile menu button & Theme toggle button */}
          <div className="md:hidden flex items-center justify-center space-x-2">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden container mx-auto p-4 h-screen">
          <div className="h-1/2 space-y-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-sm text-accent-foreground font-medium hover:underline hover:underline-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <div className="h-full flex flex-col space-y-4">
              <SignedOut>
                <Button variant="outline" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button variant="default" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/register">Sign up</Link>
                </Button>
              </SignedOut>
              <SignedIn>
                <SignOutButton>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </SignOutButton>
                <Button variant="default" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
