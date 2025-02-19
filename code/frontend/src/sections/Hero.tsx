import { ArrowRight } from "lucide-react";
import GradientBackground from "../components/GradientBackground";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const technologies = [
    "Open-CV",
    "Google Vision API ",
    "Google Translate API",
  ];
  const navigate = useNavigate();

  function handleClick() {
    navigate("/upload");
  }

  return (
    <section id="#" className="min-h-screen flex items-center justify-center">
      <GradientBackground />
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
        <div className="text-center">
          <div className="inline-flex items-center mb-6 animate-fade-in">
            <span className="inline-flex items-center px-5 py-2 gap-2 bg-primary/5 border border-primary/40 rounded-full shadow-md backdrop-blur-md text-xs md:text-sm font-medium group transition duration-300">
              <span>🚀</span>
              Transform Your Documents
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Digitize Faster,{" "}
            <span className="text-primary">Access Smarter</span>
          </h1>

          <p className="text-foreground/80 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
            Convert handwritten documents into editable digital formats with
            ease. Powered by AI, transform your files quickly and securely for
            better access and use.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">
            <button
              onClick={handleClick}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 animate-bounce-x" />
            </button>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-200 border border-primary hover:bg-primary/5"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center max-w-2xl w-full">
            <div className="flex-1 items-center">
              <div className="w-full border-t border-foreground/20"></div>
            </div>
            <div className="flex justify-center text-sm">
              <span className="px-4 text-foreground/60 text-center">
                Seamless Integration with Leading Technologies
              </span>
            </div>
            <div className="flex-1 items-center">
              <div className="w-full border-t border-foreground/20"></div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-12 gap-y-6">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-xl font-bold text-foreground/60 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
