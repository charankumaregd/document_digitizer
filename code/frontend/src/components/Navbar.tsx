import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md shadow-md border-b border-foreground/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">Document Digitizer</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/70 hover:text-foreground transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
            {location.pathname === "/" && (
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-center px-6 py-2 rounded-lg transition-all duration-200 border border-primary hover:bg-primary/5"
                >
                  Log in
                </Link>
                <Link
                  to="/"
                  className="text-center px-6 py-2 rounded-lg transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex justify-center items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center text-foreground/70 hover:text-foreground p-2 cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden p-4">
          <div className="space-y-8 h-screen">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block font-medium text-foreground/70 hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {location.pathname === "/" && (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-center px-6 py-3 rounded-lg transition-all duration-200 border border-primary hover:bg-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/"
                  className="text-center px-6 py-3 rounded-lg transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
