import { Link } from "react-router-dom";
import { FileText, Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const navigation = [
    {
      label: "Product",
      content: [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/#pricing" },
        { name: "FAQ", href: "/#faq" },
      ],
    },
    {
      label: "Legal",
      content: [
        { name: "Privacy Policy", href: "/#" },
        { name: "Terms of Service", href: "/#" },
        { name: "Security", href: "/#" },
      ],
    },
  ];

  const contact = [
    { name: "Gmail", icon: Mail, href: "#" },
    { name: "Github", icon: Github, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-foreground/20 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-8">
          <div className="col-span-2 md:col-span-1 space-y-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Document Digitizer</span>
              </Link>
              <p className="text-foreground/80">
                Building the future of document conversion.
              </p>
            </div>
            <div className="flex space-x-6">
              {contact.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground/60 hover:text-foreground/80"
                  aria-label={`Follow us on ${item.name}`}
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>

          {navigation.map((section) => (
            <div key={section.label}>
              <h3 className="font-semibold ">{section.label}</h3>
              <ul className="mt-4 space-y-4">
                {section.content.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-foreground/80 hover:">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-foreground/20 pt-8">
          <div className="flex justify-center items-center gap-8">
            <div className="text-center mb-4">
              <p className="text-foreground/80">
                &copy; {new Date().getFullYear()} Document Digitizer. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
