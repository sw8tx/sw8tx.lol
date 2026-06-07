"use client";
import Image from "next/image";
import Link from "next/link";

const sections = [
  {
    title: "§ 1 — Acceptance of Terms",
    content: `By accessing, browsing, or using the Sparkle platform (sw8tx.lol) or any of its associated services, you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service ("Terms") and all applicable laws and regulations. If you do not agree to any part of these Terms, you are strictly prohibited from using this service and must discontinue use immediately. These Terms apply to all visitors, users, buyers, sellers, and any other party who accesses or uses the service in any capacity.`
  },
  {
    title: "§ 2 — Description of Service",
    content: `Sparkle (sw8tx.lol) operates as a digital marketplace and personal portfolio platform offering services including but not limited to: Discord-related products (Nitro, Boosts, Giftlinks, Nitro Accounts), Roblox Limited item trading, general digital goods, and partner services. Sparkle reserves the right to modify, suspend, restrict, or permanently discontinue any aspect or feature of the service at any time and without prior notice or liability. The range of offered products may change at any time and without obligation to notify users in advance. Sparkle is not affiliated with Discord Inc., Roblox Corporation, or any other third-party platform referenced in its listings.`
  },
  {
    title: "§ 3 — Eligibility & User Accounts",
    content: `You must be at least 13 years of age to use this service. By using Sparkle, you represent and warrant that you meet this age requirement. If you create an account, you are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to notify Sparkle immediately of any unauthorized access or breach of security. Sparkle reserves the right to suspend or terminate accounts at its sole discretion, including without limitation for suspected fraudulent activity, violation of these Terms, or conduct deemed harmful to the platform or its users.`
  },
  {
    title: "§ 4 — Purchases, Payments & Refunds",
    content: `All payments made through the Sparkle platform are processed via third-party payment providers. Sparkle does not store, log, or have access to full credit card or banking information. By making a purchase, you agree that: (a) the information you provide is accurate and complete; (b) you are authorized to use the payment method; (c) charges may be applied immediately upon order placement. Refunds are issued at the sole discretion of Sparkle. Digital goods that have been delivered are generally non-refundable unless the delivered item is materially defective or was misrepresented. Any chargeback or payment dispute filed without first contacting Sparkle support may result in immediate and permanent suspension of the user account, associated IP addresses, and payment methods.`
  },
  {
    title: "§ 5 — Prohibited Activities",
    content: `Users of this platform agree not to engage in any of the following: (a) use the service for any unlawful purpose or in violation of any applicable laws; (b) attempt to gain unauthorized access to any part of the platform or its infrastructure; (c) impersonate Sparkle, its staff, or any other user; (d) use automated tools, bots, scrapers, or similar software to access or collect data from the platform without express written consent; (e) resell or redistribute purchased goods without prior written authorization; (f) engage in or facilitate any form of fraud, scamming, or deceptive practices; (g) violate the Terms of Service of Discord, Roblox, or any other third-party platform in connection with services purchased here. Violations may result in immediate termination and potential legal action.`
  },
  {
    title: "§ 6 — Intellectual Property",
    content: `All content on this platform — including but not limited to the Sparkle name, logo, design, text, graphics, and software — is the intellectual property of Sparkle (sw8tx) and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, modify, create derivative works from, or publicly display any content from this platform without express prior written permission. The Sparkle brand and associated marks may not be used in connection with any product or service not offered by Sparkle.`
  },
  {
    title: "§ 7 — Third-Party Services & Links",
    content: `The Sparkle platform may contain links to or integrations with third-party websites, platforms, or services. These are provided for convenience and informational purposes only. Sparkle has no control over and assumes no responsibility for the content, privacy policies, or practices of any third-party services. Your use of such third-party services is at your own risk and subject to their respective terms and conditions. The inclusion of any link does not imply endorsement by Sparkle.`
  },
  {
    title: "§ 8 — Disclaimers & Limitation of Liability",
    content: `The Sparkle platform and all services offered are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. To the fullest extent permitted by applicable law, Sparkle disclaims all warranties including merchantability, fitness for a particular purpose, and non-infringement. Sparkle shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses arising out of your use of or inability to use the service — even if Sparkle has been advised of the possibility of such damages.`
  },
  {
    title: "§ 9 — Indemnification",
    content: `You agree to defend, indemnify, and hold harmless Sparkle, its operators, affiliates, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from: (a) your use of and access to the service; (b) your violation of any of these Terms; (c) your violation of any third-party rights, including without limitation any intellectual property or privacy rights; or (d) any claim that your conduct caused damage to a third party.`
  },
  {
    title: "§ 10 — Modifications to Terms",
    content: `Sparkle reserves the right to update, amend, or replace any part of these Terms at any time and at its sole discretion. Changes will be effective immediately upon posting. Your continued use of the service after any such changes constitutes your acceptance of the revised Terms. It is your responsibility to review these Terms periodically for updates. If you do not agree with a modification, your sole remedy is to discontinue use of the service.`
  },
  {
    title: "§ 11 — Governing Law & Dispute Resolution",
    content: `These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict of law provisions. Any disputes arising under these Terms shall first be attempted to be resolved through good-faith negotiation. If resolution cannot be reached informally, disputes shall be submitted to binding arbitration in accordance with applicable rules. You waive any right to participate in class-action proceedings against Sparkle.`
  },
  {
    title: "§ 12 — Contact Information",
    content: `If you have any questions, concerns, or requests related to these Terms of Service, please reach out to us at help@sw8tx.lol. We aim to respond to all inquiries within 48 hours on business days.`
  },
];

export default function TOS() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Syne+Mono&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Syne', sans-serif; color: #ede8e0; background: #0e0c0a; overflow-x: hidden; }
        nav {
          position: sticky; top: 0; left: 0; right: 0; z-index: 100;
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
        .section {
          border-top: 1px solid rgba(237,232,224,0.07); padding: 36px 0;
          opacity: 0; animation: fadeUp 0.6s ease forwards;
        }
        .section:nth-child(1) { animation-delay: 0.15s; }
        .section:nth-child(2) { animation-delay: 0.2s; }
        .section:nth-child(3) { animation-delay: 0.25s; }
        .section:nth-child(4) { animation-delay: 0.3s; }
        .section:nth-child(5) { animation-delay: 0.35s; }
        .section:nth-child(6) { animation-delay: 0.4s; }
        .section:nth-child(7) { animation-delay: 0.45s; }
        .section:nth-child(8) { animation-delay: 0.5s; }
        .section:nth-child(9) { animation-delay: 0.55s; }
        .section:nth-child(10) { animation-delay: 0.6s; }
        .section:nth-child(11) { animation-delay: 0.65s; }
        .section:nth-child(12) { animation-delay: 0.7s; }
        .section-title {
          font-size: clamp(16px, 2.5vw, 20px); font-weight: 800;
          color: #f5f0e8; margin-bottom: 16px; letter-spacing: -0.01em;
        }
        .section-body {
          font-size: clamp(14px, 1.8vw, 16px); line-height: 1.8;
          color: rgba(237,232,224,0.55); font-weight: 400;
        }
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
        <h1 className="page-title">Terms of Service</h1>
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
