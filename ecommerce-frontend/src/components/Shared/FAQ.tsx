import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  id: number;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is your return policy?",
    answer: "We offer a 30-day money-back guarantee for all our products. Items must be returned in their original condition and packaging for a full refund."
  },
  {
    id: 2,
    question: "How long does shipping take?",
    answer: "Standard shipping typically takes 3-5 business days within the continental US. International shipping can take 7-14 business days depending on the destination."
  },
  {
    id: 3,
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can check specific rates at checkout."
  },
  {
    id: 4,
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's site."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = React.useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto w-full space-y-8">
      {faqData.map((faq, index) => (
        <React.Fragment key={faq.id}>
          <motion.div
            initial={false}
            animate={{ backgroundColor: openId === faq.id ? '#f3f4f6' : '#ffffff' }}
            className="rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <span className="text-lg sm:text-2xl font-semibold text-gray-900">{faq.question}</span>
              <motion.span
                animate={{ rotate: openId === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 ml-2"
              >
                {openId === faq.id ? (
                  <Minus className="w-5 h-5 text-gray-600" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-600" />
                )}
              </motion.span>
            </button>

            <AnimatePresence>
              {openId === faq.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          {index < faqData.length - 1 && (
            <div className="w-full h-px bg-gray-200" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FAQ;