import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQData = [
  {
    question: "Is Anavrin compatible with all mobile devices?",
    answer:
      "Anavrin is designed with a mobile-first approach, ensuring compatibility with a wide range of mobile devices, including smartphones and tablets."
  },
  {
    question: "What features does Anavrin offer for portfolio tracking?",
    answer:
      "Anavrin provides a range of features for efficient portfolio tracking, including real-time updates, performance analytics, and customizable reports."
  },
  {
    question: "How do I import my existing investment data into Anavrin?",
    answer:
      "Anavrin offers an easy import feature to bring in your existing investment data. Simply follow the step-by-step instructions in the platform to import your data seamlessly."
  },
  {
    question: "Can I set alerts for specific investment conditions?",
    answer:
      "Yes, Anavrin allows you to set customizable alerts for specific market conditions, price changes, or other criteria to keep you informed about your portfolio's performance."
  },

  {
    question: "Is my financial data secure with Anavrin?",
    answer:
      " Security is a top priority for Anavrin. Your financial data is encrypted and stored securely. We follow industry best practices to ensure the confidentiality and integrity of your information."
  },

  {
    question: "How frequently is portfolio data updated?",

    answer:
      "Anavrin provides real-time data updates, ensuring that you have the latest information on your investment portfolio at all times."
  },
  {
    question: "What types of investments can I track with Anavrin?",
    answer:
      "Anavrin supports a wide range of investment types, including stocks, bonds, mutual funds, ETFs, and more. You can easily track and manage diverse investment portfolios in one place."
  },
  {
    question: "How can I contact Anavrin's customer support?",
    answer:
      "For any assistance or queries, you can reach out to Anavrin's customer support team through [contact information]. Our support team is available to help you with any issues or questions you may have."
  },
  {
    question: "Does Anavrin offer a demo or trial period?",
    answer:
      "Yes, Anavrin provides a demo/trial period for users to explore the platform and its features before making a commitment."
  },
  {
    question: "Can I export my portfolio data from Anavrin?",
    answer:
      "Yes, Anavrin allows you to export your portfolio data in various formats, making it easy to analyze and share your investment information."
  }
];

const FAQComponent: FC<unknown> = () => {
  const a = 5 + 6;

  return (
    <>
      <div className="mb-4 px-8 text-center">
        <h1 className="font-thin md:text-5xl">Got a question ?</h1>
      </div>
      <section className="py-6">
        <Accordion type="multiple" className="">
          {FAQData.map((content, index) => (
            <AccordionItem value={`item-${index}`} key={`item-${index}`}>
              <AccordionTrigger className="font-thin md:text-2xl">
                {content.question}
              </AccordionTrigger>
              <AccordionContent className="md:text-xl">{content.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
};

export default FAQComponent;
