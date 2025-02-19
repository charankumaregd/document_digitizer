import {
  FileText,
  Languages,
  Download,
  Sparkles,
  Zap,
  ShieldCheck,
} from "lucide-react";

export default function Features() {
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
      icon: Download,
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

  return (
    <section id="features" className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase">
            Features
          </span>
          <h2 className="mt-2 text-3xl font-bold mb-4">
            Powerful Document Processing
          </h2>
          <p className="text-lg text-foreground/80">
            Everything you need to digitize, translate, and manage your
            documents efficiently
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-xl border border-foreground/20 hover:shadow-sm transition"
            >
              <feature.icon className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {feature.title}
              </h3>
              <p className="text-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
