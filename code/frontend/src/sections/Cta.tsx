import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Cta() {
  return (
    <section id="faq" className="pb-20 md:pb-24">
      <div className="flex flex-col items-center justify-center text-center bg-secondary rounded-md px-4 py-20 space-y-8">
        <div className="text-center space-y-2 max-w-3xl">
          <Badge>Get started</Badge>
          <h1 className="text-2xl md:text-3xl font-medium">
            Ready to Digitize Your Documents?
          </h1>
          <p className="md:text-md text-accent-foreground leading-relaxed">
            Start digitizing your documents today with our powerful OCR and
            translation tools.
          </p>
        </div>
        <Button variant="default" size="lg">
          <span>Start free trail</span>
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
}
