"use client";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "§ 1 — Information We Collect",
    content: `When you use Sparkle (sw8tx.lol), we may collect several types of information in order to provide and improve our services. This includes: (a) Information you provide directly — such as your name, email address, Discord username, Roblox username, and payment-related information when creating an account or making a purchase; (b) Usage data — such as your IP address, browser type, device type, pages visited, time spent on the platform, and referring URLs; (c) Communication data — any messages, support tickets, or emails you send us. We collect only the minimum data necessary to operate the service effectively.`
  },
  {
    title: "§ 2 — How We Use Your Information",
    content: `The information we collect is used strictly to operate and improve the Sparkle platform. Specifically, we use your data to: (a) fulfill orders and deliver purchased products or services; (b) communicate with you about your account, orders, and support requests; (c) prevent fraud, abuse, and ensure the security of the platform; (d) analyze platform usage trends to improve user experience; (e) send service-related notifications such as order confirmations or policy updates. We do not use your data for advertising purposes, and we do not build behavioral profiles for marketing.`
  },
  {
    title: "§ 3 — Information Sharing & Disclosure",
    content: `Sparkle does not sell, rent, or trade your personal information to third parties under any circumstances. We may share limited information with trusted third-party service providers who assist in operating the platform — such as payment processors and hosting providers — solely to the extent necessary to perform their services. These providers are contractually obligated to protect your information and may not use it for any other purpose. We may also disclose information when required by law, court order, or governmental authority, or where necessary to protect the rights and safety of Sparkle or its users.`
  },
  {
    title: "§ 4 — Data Retention",
    content: `We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable legal obligations. Account information is retained for the duration of your account's activity. Transaction records may be retained for up to 5 years for accounting and legal compliance. Upon account deletion, personal data will be removed or anonymized within 30 days, except where retention is required by law.`
  },
  {
    title: "§ 5 — Data Security",
    content: `Sparkle implements reasonable and appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. These measures include encryption of sensitive data in transit and at rest, restricted access controls, and regular security reviews. However, no method of transmission over the Internet or electronic storage system is 100% secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security. In the event of a data breach that affects your personal information, we will notify affected users as required by applicable law.`
  },
  {
    title: "§ 6 — Cookies & Tracking Technologies",
    content: `Sparkle uses cookies and similar technologies to enhance your experience on the platform. Cookies are small text files stored on your device that help us recognize you, maintain session state, and understand how users interact with the site. We use: (a) Essential cookies — required for core functionality such as login sessions; (b) Analytics cookies — to understand usage patterns and improve the platform. You may configure your browser to refuse cookies, though this may affect certain features of the service. We do not use third-party advertising cookies or tracking pixels.`
  },
  {
    title: "§ 7 — Your Rights",
    content: `Depending on your jurisdiction, you may have certain rights regarding your personal data. These may include: (a) the right to access the data we hold about you; (b) the right to correct inaccurate or incomplete information; (c) the right to request deletion of your data ("right to be forgotten"); (d) the right to restrict or object to certain types of processing; (e) the right to data portability. To exercise any of these rights, please contact us at help@sw8tx.lol. We will respond to all requests within 30 days. We may ask you to verify your identity before processing any request.`
  },
  {
    title: "§ 8 — Children's Privacy",
    content: `The Sparkle platform is not intended for individuals under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately at help@sw8tx.lol. Upon verification, we will promptly delete any such information from our records. Users between 13 and 18 years of age should only use the platform with the consent of a parent or legal guardian.`
  },
  {
    title: "§ 9 — Third-Party Links & Services",
    content: `The Sparkle platform may contain links to external websites or services not operated by us, including Discord, Roblox, and social media platforms. This Privacy Policy applies solely to information collected on sw8tx.lol. We have no control over and assume no responsibility for the privacy practices or content of third-party services. We encourage you to review the privacy policies of any third-party service you visit or use in connection with our platform.`
  },
  {
    title: "§ 10 — International Data Transfers",
    content: `If you are accessing the Sparkle platform from outside the country in which our servers are located, your data may be transferred across international borders. By using our service, you consent to such transfers. We take steps to ensure that your information receives an adequate level of protection in the countries where it is processed, in accordance with this Privacy Policy and applicable law.`
  },
  {
    title: "§ 11 — Changes to This Privacy Policy",
    content: `Sparkle reserves the right to update this Privacy Policy at any time. When we make changes, we will revise the "Last updated" date at the top of this page. In the case of significant changes, we may also notify you via email or a prominent notice on the platform. Your continued use of the service after any change constitutes your acceptance of the revised policy. We encourage you to review this policy periodically to stay informed.`
  },
  {
    title: "§ 12 — Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal data, please contact us at: help@sw8tx.lol. We are committed to resolving privacy-related concerns promptly and transparently, and aim to respond to all inquiries within 48 hours on business days.`
  },
];

export default function Privacy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Syne+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Syne', sans-serif; color: #ede8e0; background: #0e0c0a; overflow-x: hidden; }
        nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; padding: 18px 32px;
          background: rgba(14,12,10,0.95); backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(237,232,224,0.06);
        }
        .nav-logo-wrap { width: 32px; height: 32px; border-radius: 5px; overflow: hidden; }
        .nav-name { font-weight: 800; font-size: 15px; letter-spacing: 0.06em; color: rgba(237,232,224,0.7); margin-left: 10px; }
        .nav-back {
          margin-left: auto; font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.25em; text-transform: uppercase; color: rgba(237,232,224,0.3);
          text-decoration: none; transition: color 0.2s;
        }
        .nav-back:hover { color: rgba(237,232,224,0.7); }
        .page-wrap { max-width: 760px; margin: 0 auto; padding: 80px 2rem 120px; }
        .page-tag {
          font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.35em; text-transform: uppercase;
          color: rgba(237,232,224,0.3); margin-bottom: 16px; display: block;
        }
        .page-title {
          font-size: clamp(36px, 7vw, 64px); font-weight: 800;
          letter-spacing: -0.02em; line-height: 1; color: #f5f0e8; margin-bottom: 12px;
          opacity: 0; animation: fadeUp 0.7s ease forwards 0.1s;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .page-updated {
          font-family: 'Syne Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; color: rgba(237,232,224,0.25);
          margin-bottom: 60px; display: block;
        }
        .section { border-top: 1px solid rgba(237,232,224,0.07); padding: 36px 0; opacity: 0; animation: fadeUp 0.6s ease forwards; }
        .section:nth-child(1){animation-delay:.15s}.section:nth-child(2){animation-delay:.2s}.section:nth-child(3){animation-delay:.25s}.section:nth-child(4){animation-delay:.3s}.section:nth-child(5){animation-delay:.35s}.section:nth-child(6){animation-delay:.4s}.section:nth-child(7){animation-delay:.45s}.section:nth-child(8){animation-delay:.5s}.section:nth-child(9){animation-delay:.55s}.section:nth-child(10){animation-delay:.6s}.section:nth-child(11){animation-delay:.65s}.section:nth-child(12){animation-delay:.7s}
        .section-title { font-size: clamp(16px, 2.5vw, 20px); font-weight: 800; color: #f5f0e8; margin-bottom: 16px; letter-spacing: -0.01em; }
        .section-body { font-size: clamp(14px, 1.8vw, 16px); line-height: 1.8; color: rgba(237,232,224,0.55); }
        footer {
          text-align: center; padding: 32px 2rem;
          font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(237,232,224,0.15); border-top: 1px solid rgba(237,232,224,0.06);
        }
      `}</style>

      <nav>
        <div className="nav-logo-wrap">
          <Image src="/logo.png" alt="Sparkle" width={32} height={32} style={{objectFit:"cover"}} />
        </div>
        <span className="nav-name">Sparkle</span>
        <Link href="/" className="nav-back">← Back</Link>
      </nav>

      <main className="page-wrap">
        <span className="page-tag">// Legal</span>
        <h1 className="page-title">Privacy Policy</h1>
        <span className="page-updated">Last updated: June 2026</span>
        <div>
          {sections.map((s, i) => (
            <div key={i} className="section">
              <h2 className="section-title">{s.title}</h2>
              <p className="section-body">{s.content}</p>
            </div>
          ))}
        </div>
      </main>

      <footer>&copy; {new Date().getFullYear()} Sparkle (sw8tx) — All rights reserved</footer>
    </>
  );
}
