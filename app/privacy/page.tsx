import { LegalPage, type LegalSection } from "../components/LegalPage";

const sections: LegalSection[] = [
  {
    title: "1. Information We Collect",
    content:
      "When you use Sparkle, we may collect information needed to provide and improve the service. This may include information you provide directly, usage data such as browser and device details, and communication data from support messages or emails.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use collected information to fulfill orders, communicate about accounts and support requests, prevent fraud and abuse, improve the platform, and send service-related notifications. We do not sell personal information or build advertising profiles.",
  },
  {
    title: "3. Information Sharing and Disclosure",
    content:
      "Sparkle does not sell, rent, or trade personal information. Limited information may be shared with trusted providers such as payment processors and hosting providers when necessary to operate the service. Information may also be disclosed when required by law.",
  },
  {
    title: "4. Data Retention",
    content:
      "We retain personal data only for as long as necessary for the purposes for which it was collected or as required by applicable legal obligations. Upon account deletion, personal data will be removed or anonymized within a reasonable period unless retention is required by law.",
  },
  {
    title: "5. Data Security",
    content:
      "Sparkle uses reasonable technical and organizational measures to protect personal information from unauthorized access, disclosure, alteration, or destruction. No method of internet transmission or electronic storage is completely secure, so absolute security cannot be guaranteed.",
  },
  {
    title: "6. Cookies and Tracking Technologies",
    content:
      "Sparkle may use cookies and similar technologies for essential functionality, session handling, and basic platform analytics. You can configure your browser to refuse cookies, though this may affect certain features of the service.",
  },
  {
    title: "7. Your Rights",
    content:
      "Depending on your jurisdiction, you may have rights to access, correct, delete, restrict, object to processing, or request portability of your personal data. To exercise these rights, contact help@sw8tx.lol. We may ask you to verify your identity before processing a request.",
  },
  {
    title: "8. Children's Privacy",
    content:
      "The Sparkle platform is not intended for individuals under 13. We do not knowingly collect personal information from children under 13. If a parent or guardian believes a child has provided personal information, they should contact us so we can review and delete it where required.",
  },
  {
    title: "9. Third-Party Links and Services",
    content:
      "The platform may contain links to external services not operated by Sparkle. This Privacy Policy applies only to information collected by Sparkle. We encourage users to review third-party privacy policies before using external services.",
  },
  {
    title: "10. International Data Transfers",
    content:
      "If you access Sparkle from outside the country where our servers or providers operate, your data may be transferred across borders. We take steps to ensure information receives appropriate protection in line with this Privacy Policy and applicable law.",
  },
  {
    title: "11. Changes to This Policy",
    content:
      "Sparkle may update this Privacy Policy at any time. When changes are made, the updated date will be revised. Continued use of the service after updates are posted constitutes acceptance of the revised policy.",
  },
  {
    title: "12. Contact Us",
    content:
      "If you have questions, concerns, or requests regarding this Privacy Policy or how we handle personal data, please contact help@sw8tx.lol. We aim to respond within 48 hours on business days.",
  },
];

export default function Privacy() {
  return (
    <LegalPage
      tone="privacy"
      label="Privacy"
      title="Privacy Policy"
      updated="Last updated: June 2026"
      sections={sections}
    />
  );
}
