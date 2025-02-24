import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <section
      id="faq"
      className="flex flex-col items-center justify-center space-y-8"
    >
      <div className="text-center space-y-2 max-w-3xl">
        <Badge>FAQ</Badge>
        <h1 className="text-2xl md:text-3xl font-medium">
          Ferquently Asked Questions
        </h1>
        <p className="md:text-md text-accent-foreground leading-relaxed">
          Find answers to the most common questions about Document Digitizer and
          how it works.
        </p>
      </div>
      <div className="max-w-3xl place-self-center w-full">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={"index-" + index}
              className="py-2"
            >
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "What is Document Digitizer?",
    answer:
      "Document Digitizer is an AI-powered platform that converts handwritten documents into a readable, digital format with OCR and translation capabilities.",
  },
  {
    question: "How does the free trial work?",
    answer:
      "We offer a 2-month free trial where you can digitize up to 5 pages per month. After that, you can choose from our paid plans for more pages.",
  },
  {
    question: "Which languages are supported?",
    answer:
      "We support multiple regional languages through Google Translate API, ensuring accessibility and accuracy in document conversion.",
  },
  {
    question: "Can I download my digitized documents?",
    answer:
      "Yes! You can download your processed documents in formats like PDF, DOCX, and TXT.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use enterprise-grade security and do not store your documents after processing to ensure complete privacy.",
  },
];
