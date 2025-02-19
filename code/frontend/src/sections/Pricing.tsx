import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "Rs. 0",
      description: "Ideal for occasional users.",
      features: [
        "5 Pages per month",
        "Basic OCR support",
        "Downloadable as TXT, PDF, or DOCX",
        "Free for the first 2 months only",
      ],
    },
    {
      name: "Basic",
      price: "Rs. 99",
      description: "Perfect for light users or small teams.",
      features: [
        "20 Pages per month",
        "Advanced OCR support",
        "Downloadable as TXT, PDF, or DOCX",
        "Translation to regional languages",
      ],
      isMostPopular: true,
    },
    {
      name: "Pro",
      price: "Rs. 199",
      description: "Designed for frequent users and businesses.",
      features: [
        "50 Pages per month",
        "Advanced OCR support",
        "Downloadable as TXT, PDF, or DOCX",
        "Translation to regional languages",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase">
            Pricing
          </span>
          <h2 className="mt-2 text-3xl font-bold mb-4">
            Simple and transparent pricing
          </h2>
          <p className="text-lg text-foreground/80">
            No hidden costs. No surprises. Start with a 2-month free trial.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={` p-8 rounded-xl border transition space-y-8
                ${
                  plan.isMostPopular
                    ? "border-primary bg-primary/5"
                    : "border-foreground/20"
                }
                `}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-4xl font-bold">
                  {plan.price}
                  <span className="text-foreground/80 text-base">/month</span>
                </p>
                <p className="text-foreground/80">{plan.description}</p>
              </div>
              <button className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition">
                Get Started
              </button>
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-foreground/80">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
