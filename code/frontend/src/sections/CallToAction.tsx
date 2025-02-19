import { ArrowRight, MessageSquare } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Digitize Your Documents?
          </h2>
          <p className="text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
            Start digitizing your documents today with our powerful OCR and
            translation tools. Enjoy a 2-month free trial to experience the full
            potential!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-foreground text-primary hover:bg-background transition">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary-foreground text-primary-foreground hover:bg-background/5 transition">
              <MessageSquare className="mr-2 h-5 w-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
