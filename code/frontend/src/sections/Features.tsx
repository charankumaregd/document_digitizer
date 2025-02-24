import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Languages,
  Sparkles,
  Zap,
  ShieldCheck,
  FileDown,
} from "lucide-react";

export default function Feature() {
  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center space-y-8"
    >
      <div className="text-center space-y-2 max-w-3xl">
        <Badge>Features</Badge>
        <h1 className="text-2xl md:text-3xl font-medium">
          Powerful Document Processing
        </h1>
        <p className="md:text-md text-accent-foreground leading-relaxed">
          Everything you need to digitize, translate, and manage your documents
          efficiently.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="space-y-2">
              <feature.icon className="text-accent-foreground" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}

const features = [
  {
    icon: FileText,
    title: "Advanced OCR Technology",
    description:
      "Extract text from images and PDFs with high accuracy using state-of-the-art OCR technology powered by advanced AI models.",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description:
      "Seamlessly translate your documents into 6+ languages including Tamil, Hindi, and more with native script support.",
  },
  {
    icon: FileDown,
    title: "Flexible Export Options",
    description:
      "Download your processed documents in various formats including PDF, DOCX, and TXT, maintaining original formatting.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Process documents in seconds with our optimized OCR engine and cloud infrastructure.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description:
      "Bank-grade encryption ensures your documents are processed securely and never stored.",
  },
  {
    icon: Sparkles,
    title: "High Accuracy",
    description:
      "Advanced AI models ensure precise character recognition across multiple languages.",
  },
];
