"use client";
import Image from "next/image";

const sections = [
  {
    title: "24-Hour Delivery Guarantee",
    content: `Sparkle offers a 24-hour delivery guarantee for all eligible purchases. If you do not receive your purchased items within 24 hours after completing your order, you may be eligible to request a refund. Refund requests must be submitted within 3 calendar days after the 24-hour delivery period has expired. Requests submitted after this timeframe may not be eligible for review.`
  },
  {
    title: "Delivery Requirements",
    content: `To qualify for a refund under our Delivery Guarantee, customers must actively attempt to receive their order through our automated delivery system. Immediately after completing your purchase, you will be provided access to a personalized automated delivery page. In addition, a direct link to your custom delivery experience will be sent to the email address associated with your order.`,
    list: [
      "Attempt to use the automated delivery system at least two (2) separate times.",
      "Follow all instructions provided by the delivery system.",
      "Allow the full 24-hour delivery period to pass.",
      "Submit your refund request within 3 days after the delivery guarantee period has ended.",
    ],
    listNote: "Before requesting a refund, you must:",
    listFooter: "Failure to meet these requirements may result in the refund request being denied."
  },
  {
    title: "How to Request a Refund",
    content: `If you believe you are eligible for a refund, please contact our support team with your order details.`,
    contact: "help@sw8tx.lol",
    list: [
      "Your order number",
      "The email address used for the purchase",
      "A description of the issue",
      "Confirmation that you attempted the automated delivery system at least twice",
    ],
    listNote: "When contacting support, please include:",
    listFooter: "Our team will review your request and respond as soon as possible."
  },
  {
    title: "Refund Processing",
    content: `Once your refund request has been reviewed and approved, you will receive a confirmation email. Approved refunds are automatically processed back to the original payment method used for the purchase. Depending on your bank, payment provider, or card issuer, refunds may take approximately 5–10 business days to appear in your account.`
  },
  {
    title: "Non-Refundable Items",
    content: `Due to the automated nature of our delivery system, any items that have already been successfully delivered, claimed, redeemed, transferred, or otherwise received by the customer are considered final and are not eligible for refunds, returns, or exchanges.`,
    list: [
      "The customer successfully received the purchased item.",
      "The customer failed to attempt the automated delivery process.",
      "The refund request is submitted outside the 3-day eligibility period.",
      "The customer provides incorrect delivery information that prevents successful delivery.",
    ],
    listNote: "Refunds will also not be issued in cases where:"
  },
  {
    title: "Support & Business Inquiries",
    content: `For general support, questions regarding orders, or assistance with the delivery process, please contact help@sw8tx.lol. For partnership opportunities, business inquiries, collaborations, or affiliate-related matters, please contact partner@sw8tx.lol.`
  },
  {
    title: "Policy Updates",
    content: `Sparkle reserves the right to modify, update, or revise this Refund & Delivery Policy at any time without prior notice. Continued use of our services constitutes acceptance of the most current version of this policy. If you have any questions regarding this policy, our team will be happy to assist you.`
  },
];

export default function Refund() {
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
        .nav-logo-link { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-logo-wrap { width: 32px; height: 32px; border-radius: 5px; overflow: hidden; }
        .nav-name { font-weight: 800; font-size: 15px; letter-spacing: 0.06em; color: rgba(237,232,224,0.7); transition: color 0.2s; }
        .nav-logo-link:hover .nav-name { color: rgba(237,232,224,1); }
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
          letter-spacing: -0.02em; line-height: 1.05; color: #f5f0e8; margin-bottom: 12px;
          opacity: 0; animation: fadeUp 0.7s ease forwards 0.1s;
        }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .page-updated {
          font-family: 'Syne Mono', monospace; font-size: 11px;
          letter-spacing: 0.2em; color: rgba(237,232,224,0.25);
          margin-bottom: 60px; display: block;
        }
        .page-intro {
          font-size: clamp(14px, 1.8vw, 16px); line-height: 1.8;
          color: rgba(237,232,224,0.45); margin-bottom: 48px;
          padding-bottom: 48px; border-bottom: 1px solid rgba(237,232,224,0.07);
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
        .section-title {
          font-size: clamp(16px, 2.5vw, 20px); font-weight: 800;
          color: #f5f0e8; margin-bottom: 16px; letter-spacing: -0.01em;
        }
        .section-body {
          font-size: clamp(14px, 1.8vw, 16px); line-height: 1.8;
          color: rgba(237,232,224,0.55); font-weight: 400;
        }
        .section-list-note {
          font-size: clamp(14px, 1.8vw, 16px); line-height: 1.8;
          color: rgba(237,232,224,0.45); margin-top: 16px; margin-bottom: 10px;
        }
        .section-list {
          list-style: none; display: flex; flex-direction: column; gap: 8px;
          margin-left: 4px;
        }
        .section-list li {
          font-size: clamp(13px, 1.7vw, 15px); line-height: 1.7;
          color: rgba(237,232,224,0.5); padding-left: 20px; position: relative;
        }
        .section-list li::before {
          content: '—'; position: absolute; left: 0;
          color: rgba(237,232,224,0.2); font-size: 12px;
        }
        .section-list-footer {
          font-size: clamp(13px, 1.7vw, 15px); line-height: 1.7;
          color: rgba(237,232,224,0.35); margin-top: 14px; font-style: italic;
        }
        .section-contact {
          display: inline-flex; align-items: center; gap: 8px;
          margin: 14px 0; padding: 10px 16px;
          border: 1px solid rgba(237,232,224,0.08); border-radius: 8px;
          background: #131109;
          font-family: 'Syne Mono', monospace; font-size: 13px;
          color: rgba(237,232,224,0.6); text-decoration: none;
          transition: border-color 0.2s, color 0.2s;
        }
        .section-contact:hover { border-color: rgba(237,232,224,0.2); color: rgba(237,232,224,0.9); }
        footer {
          text-align: center; padding: 32px 2rem;
          font-family: 'Syne Mono', monospace; font-size: 10px;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(237,232,224,0.15); border-top: 1px solid rgba(237,232,224,0.06);
        }
      `}</style>

      <nav>
        <a href="https://sw8tx.lol" className="nav-logo-link">
          <div className="nav-logo-wrap">
            <Image src="/logo.png" alt="Sparkle" width={32} height={32} style={{objectFit:"cover"}} />
          </div>
          <span className="nav-name">Sparkle</span>
        </a>
        <a href="/" className="nav-back">← Back</a>
      </nav>

      <main className="page-wrap">
        <span className="page-tag">// Legal</span>
        <h1 className="page-title">Refund &amp; Delivery Policy</h1>
        <span className="page-updated">Last updated: June 2026</span>
        <p className="page-intro">
          At Sparkle, we strive to provide a fast, reliable, and seamless delivery experience for every customer. To ensure transparency and customer satisfaction, we have established the following Delivery Guarantee and Refund Policy.
        </p>
        <div>
          {sections.map((s, i) => (
            <div key={i} className="section">
              <h2 className="section-title">{s.title}</h2>
              <p className="section-body">{s.content}</p>
              {s.contact && (
                <a href={`mailto:${s.contact}`} className="section-contact">
                  ✉ {s.contact}
                </a>
              )}
              {s.listNote && <p className="section-list-note">{s.listNote}</p>}
              {s.list && (
                <ul className="section-list">
                  {s.list.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              )}
              {s.listFooter && <p className="section-list-footer">{s.listFooter}</p>}
            </div>
          ))}
        </div>
      </main>

      <footer>&copy; {new Date().getFullYear()} Sparkle (sw8tx) — All rights reserved</footer>
    </>
  );
}
