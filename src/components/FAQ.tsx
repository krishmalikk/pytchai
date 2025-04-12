'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Pytch?",
    answer: "Pytch is an AI-powered platform that helps startups generate professional websites and pitch decks instantly. Simply describe your startup, and we'll create compelling content tailored to your business."
  },
  {
    question: "How does the website generator work?",
    answer: "Our AI analyzes your startup description and automatically generates a modern, responsive website with tailored content, including features, benefits, and calls-to-action. You can preview and customize the generated website before finalizing."
  },
  {
    question: "What's included in the generated pitch deck?",
    answer: "The pitch deck includes essential sections like problem statement, solution, market size, business model, competition analysis, team overview, financials, and investment ask. Each section is customized based on your startup's description."
  },
  {
    question: "Can I edit the generated content?",
    answer: "Yes! Once generated, you can access and edit your content through your profile. You can also download the pitch deck or get the website code to make further customizations."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, we take security seriously. All your data is encrypted and stored securely. We never share your startup information with third parties without your consent."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-black" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-700 transition-colors"
              >
                <span className="font-medium text-white">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-[#f97316]" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#f97316]" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-900 text-gray-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 