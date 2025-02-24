import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="space-y-8">
      <div className="flex flex-col items-center justify-center ">
        <div className="text-center space-y-2 max-w-3xl">
          <Badge>Pricing</Badge>
          <h1 className="text-2xl md:text-3xl font-medium">
            Simple and transparent pricing
          </h1>
          <p className="md:text-md text-accent-foreground leading-relaxed">
            No hidden costs. No surprises. Start with a 2-month free trial.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {plans.map((plan, index) => {
          return (
            <Card
              key={index}
              className={`relative ${plan.isMostPopular && "border-ring"}`}
            >
              <Badge
                className={`absolute top-2 right-2 rounded-full ${
                  !plan.isMostPopular && "hidden"
                }`}
              >
                Popular
              </Badge>
              <CardHeader className="border-b pb-4">
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>{plan.description} </CardDescription>
                <p className="space-x-2">
                  <span className="text-4xl">{plan.price}</span>
                  <span className="text-accent-foreground">/ month</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant={plan.isMostPopular ? "default" : "outline"}
                  className="w-full"
                >
                  Get started
                </Button>
                <p className="text-sm font-medium">What&apos;s included</p>
                <ul className="text-sm space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

const plans = [
  {
    title: "Free",
    price: "Rs. 0",
    description: "For basic and limited use.",
    features: [
      "5 pages per month",
      "Basic OCR tool",
      "TXT, PDF, DOCX export",
      "Free for 2 months",
    ],
  },
  {
    title: "Basic",
    price: "Rs. 99",
    description: "For light and personal use.",
    features: [
      "20 pages per month",
      "Advanced OCR tool",
      "TXT, PDF, DOCX export",
      "Regional translation",
    ],
  },
  {
    title: "Pro",
    price: "Rs. 199",
    description: "For frequent and business use.",
    features: [
      "50 pages per month",
      "Advanced OCR tool",
      "TXT, PDF, DOCX export",
      "Regional translation",
      "Faster processing",
    ],
    isMostPopular: true,
  },
  {
    title: "Premium",
    price: "Rs. 399",
    description: "For heavy and professional use.",
    features: [
      "100 pages per month",
      "Advanced OCR tool",
      "TXT, PDF, DOCX export",
      "Multi-language support",
      "Priority support",
    ],
  },
];
