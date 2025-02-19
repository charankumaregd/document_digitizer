import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FrequentlyAskedQuestions() {
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="max-w-5xl mx-auto py-20 md:py-24 px-6">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase">
          FAQ
        </span>
        <h2 className="mt-2 text-3xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-foreground/80">
          Find answers to the most common questions about Document Digitizer and
          how it works.
        </p>
      </div>
      <div className="mt-8 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-foreground/20 rounded-lg">
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium focus:outline-none"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index ? "true" : "false"}
            >
              {faq.question}
              <ChevronDown
                className={`h-5 w-5 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`transform transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index
                  ? "max-h-fit opacity-100 translate-y-0 translate-x-0 px-4 pb-4"
                  : "max-h-0 opacity-0 -translate-y-4 translate-x-4 p-0"
              }`}
            >
              <p
                className={`text-foreground/80 transition-opacity duration-800 ease-in-out ${
                  openIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
