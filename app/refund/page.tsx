import { LegalPage, type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    title: "24-Hour Delivery Guarantee",
    content:
      "Sparkle offers a 24-hour delivery guarantee for eligible purchases. If you do not receive your purchased items within 24 hours after completing your order, you may be eligible to request a refund. Refund requests must be submitted within 3 calendar days after the guarantee period expires.",
  },
  {
    title: "Delivery Requirements",
    content:
      "To qualify for a refund under the Delivery Guarantee, customers must actively attempt to receive their order through the automated delivery system provided after purchase.",
    listNote: "Before requesting a refund, you must:",
    list: [
      "Attempt to use the automated delivery system at least two separate times.",
      "Follow all instructions provided by the delivery system.",
      "Allow the full 24-hour delivery period to pass.",
      "Submit your refund request within 3 days after the delivery guarantee period has ended.",
    ],
    listFooter: "Failure to meet these requirements may result in the refund request being denied.",
  },
  {
    title: "How to Request a Refund",
    content:
      "If you believe you are eligible for a refund, please contact our support team with your order details.",
    contact: "help@sw8tx.lol",
    listNote: "When contacting support, please include:",
    list: [
      "Your order number.",
      "The email address used for the purchase.",
      "A description of the issue.",
      "Confirmation that you attempted the automated delivery system at least twice.",
    ],
    listFooter: "Our team will review your request and respond as soon as possible.",
  },
  {
    title: "Refund Processing",
    content:
      "Once a refund request is reviewed and approved, you will receive a confirmation email. Approved refunds are processed back to the original payment method used for purchase. Depending on your bank, payment provider, or card issuer, refunds may take approximately 5 to 10 business days to appear.",
  },
  {
    title: "Non-Refundable Items",
    content:
      "Due to the automated nature of delivery, items that have already been successfully delivered, claimed, redeemed, transferred, or otherwise received by the customer are considered final and are not eligible for refunds, returns, or exchanges.",
    listNote: "Refunds will also not be issued when:",
    list: [
      "The customer successfully received the purchased item.",
      "The customer failed to attempt the automated delivery process.",
      "The refund request is submitted outside the 3-day eligibility period.",
      "The customer provides incorrect delivery information that prevents successful delivery.",
    ],
  },
  {
    title: "Support and Business Inquiries",
    content:
      "For general support, questions regarding orders, or assistance with delivery, contact help@sw8tx.lol. For partnership opportunities, business inquiries, collaborations, or affiliate matters, contact partner@sw8tx.lol.",
  },
  {
    title: "Policy Updates",
    content:
      "Sparkle may modify, update, or revise this Refund and Delivery Policy at any time without prior notice. Continued use of our services constitutes acceptance of the most current version of this policy.",
  },
];

export default function Refund() {
  return (
    <LegalPage
      tone="refund"
      label="Refund"
      title="Refund and Delivery"
      updated="Last updated: June 2026"
      intro="At Sparkle, we aim to provide a fast, reliable, and transparent delivery experience for every customer. This policy explains the delivery guarantee, refund eligibility, and support process."
      sections={sections}
    />
  );
}
