import { Button } from "@/components/ui/button";
import Logo from "@/assets/svg/logo.svg";
import { Github, Linkedin, MailIcon, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <a href="/" className="flex items-center space-x-2">
              <img
                src={Logo}
                alt="Document Digitizer Logo"
                className="h-6 w-6"
              />
              <span className="text-lg font-bold">Document Digitizer</span>
            </a>
            <p className="text-accent-foreground">
              Building the future of document conversion.
            </p>
          </div>

          <div className="flex space-x-4">
            {contact.map((item) => (
              <Button variant="outline" size="icon" key={item.name}>
                <a href={item.href} target="_blank" aria-label={item.name}>
                  <item.icon />
                </a>
              </Button>
            ))}
          </div>
        </div>

        <div className="flex md:justify-between gap-8">
          {navigation.map((section) => (
            <div key={section.label} className="space-y-4 space-x-8">
              <h3 className="text-sm font-medium text-accent-foreground">
                {section.label}
              </h3>
              <ul className="space-y-2">
                {section.content.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-sm hover:underline hover:underline-offset-2"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto pt-6 mt-8 border-t text-center text-sm text-accent-foreground">
        &copy; {new Date().getFullYear()} Document Digitizer. All rights
        reserved.
      </div>
    </footer>
  );
}

const navigation = [
  {
    label: "Quick Links",
    content: [
      { name: "Docs", href: "/docs" },
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "FAQ", href: "/#faq" },
    ],
  },
  {
    label: "Legal",
    content: [
      { name: "Terms & Conditions", href: "/terms-and-conditions" },
      { name: "Privacy Policy", href: "/privacy-policy" },
    ],
  },
];

const contact = [
  { name: "Mail", icon: MailIcon, href: "mailto:contact@example.com" },
  {
    name: "Github",
    icon: Github,
    href: "https://github.com/example",
  },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/example" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/in/example",
  },
];
