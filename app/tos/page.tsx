import { LegalPage, type LegalSection } from "../../components/LegalPage";

const sections: LegalSection[] = [
  {
    title: "1. Acceptance of Terms",
    content:
      'By accessing, browsing, or using the Sparkle platform at sw8tx.lol or any associated services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service and all applicable laws and regulations. If you do not agree to any part of these Terms, you must discontinue use immediately.',
  },
  {
    title: "2. Description of Service",
    content:
      "Sparkle operates as a digital marketplace and personal portfolio platform offering services including Discord-related products, Roblox Limited item trading, general digital goods, and partner services. Sparkle may modify, suspend, restrict, or discontinue any aspect of the service at any time without prior notice.",
  },
  {
    title: "3. Site Access, Security and Monitoring",
    content:
      "Sparkle may log technical request data, deploy abuse-prevention measures, and restrict access where traffic appears automated, malicious, fraudulent, or disruptive. By using the service, you agree not to bypass security controls, probe infrastructure, interfere with availability, or use the site in a manner that creates disproportionate operational risk.",
  },
  {
    title: "4. Eligibility and User Accounts",
    content:
      "You must be at least 13 years of age to use this service. If you create an account, you are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Sparkle may suspend or terminate accounts for suspected fraud, policy violations, or harmful conduct.",
  },
  {
    title: "5. Purchases, Payments and Refunds",
    content:
      "Payments are processed by third-party providers. Sparkle does not store full credit card or banking information. By making a purchase, you confirm that the information you provide is accurate and that you are authorized to use the selected payment method. Refunds are handled under the Refund and Delivery Policy.",
  },
  {
    title: "6. Prohibited Activities",
    content:
      "Users agree not to use the service for unlawful purposes, attempt unauthorized access, impersonate Sparkle staff or users, use scrapers or automated tools without consent, resell purchased goods without authorization, engage in fraud, or violate the terms of third-party platforms connected to a purchase.",
  },
  {
    title: "7. Cookies, Preferences and Local Storage",
    content:
      "Sparkle may use necessary first-party storage to preserve consent choices, core session behavior, and basic site integrity, and may use optional preference storage when enabled by the visitor. Continued use of optional preference features constitutes consent to that limited storage as described in the Privacy Policy.",
  },
  {
    title: "8. Intellectual Property",
    content:
      "All content on this platform, including the Sparkle name, logo, design, text, graphics, and software, is the intellectual property of Sparkle unless otherwise stated. You may not reproduce, distribute, modify, or publicly display platform content without prior written permission.",
  },
  {
    title: "9. Third-Party Services and Links",
    content:
      "The Sparkle platform may contain links to or integrations with third-party websites, platforms, or services. These are provided for convenience only. Sparkle has no control over and assumes no responsibility for third-party content, privacy policies, or practices.",
  },
  {
    title: "10. Disclaimers and Limitation of Liability",
    content:
      'The Sparkle platform and all services are provided on an "as is" and "as available" basis without warranties of any kind. To the fullest extent permitted by law, Sparkle is not liable for indirect, incidental, special, consequential, exemplary, or punitive damages arising from use of the service.',
  },
  {
    title: "11. Indemnification",
    content:
      "You agree to defend, indemnify, and hold harmless Sparkle, its operators, affiliates, and agents from claims, damages, obligations, losses, liabilities, costs, and expenses arising from your use of the service, violation of these Terms, or violation of third-party rights.",
  },
  {
    title: "12. Modifications to Terms",
    content:
      "Sparkle may update, amend, or replace any part of these Terms at any time. Changes are effective when posted. Continued use of the service after changes are posted constitutes acceptance of the revised Terms.",
  },
  {
    title: "13. Governing Law and Dispute Resolution",
    content:
      "These Terms are governed by applicable law without regard to conflict of law provisions. Disputes should first be attempted to be resolved through good-faith negotiation. If resolution cannot be reached informally, disputes may be submitted to binding arbitration where applicable.",
  },
  {
    title: "14. Contact Information",
    content:
      "If you have questions, concerns, or requests related to these Terms of Service, please use the contact method below. We aim to respond to inquiries within 48 hours on business days.",
    contact: "help@sw8tx.lol",
  },
];

export default function TOS() {
  return (
    <LegalPage
      tone="terms"
      label="Legal"
      title="Terms of Service"
      updated="Last updated: June 2026"
      sections={sections}
    />
  );
}
