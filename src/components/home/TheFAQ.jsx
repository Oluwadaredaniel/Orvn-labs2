import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Link } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
});

const faqs = [
  {
    q: 'Is PAS a CRM?',
    a: 'No. PAS is first-contact infrastructure. It works before and around the CRM by answering, qualifying, routing, booking, and logging outcomes. Your CRM remains the system of record.',
  },
  {
    q: 'Does PAS replace agents?',
    a: 'No. PAS protects intent before agents enter. Agents still close trust.',
  },
  {
    q: 'Does PAS replace ISAs?',
    a: 'PAS can support or replace parts of the first-touch ISA function depending on brokerage workflow. Many brokerages run PAS alongside a smaller ISA team that handles the hardest conversations.',
  },
  {
    q: 'Can PAS work after hours?',
    a: 'Yes. PAS is designed to protect after-hours intent. Inquiries between 7pm and 9am are usually a brokerage\'s highest-intent leads — and the most likely to leak.',
  },
];

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div
      style={{
        borderBottom: '1px solid var(--line)',
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--ink)', fontFamily: 'var(--font-display)' }}>
          {item.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: 'var(--ink-dim)', flexShrink: 0, marginLeft: 16 }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: 15, color: 'var(--ink-mid)', lineHeight: 1.65, margin: '0 0 20px', fontWeight: 400 }}>
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function TheFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section-y" style={{ background: '#fff', borderTop: '1px solid var(--line)' }}>
      <div className="container-page" style={{ maxWidth: 720 }}>
        <motion.div {...fadeUp(0)}>
          <span className="label-mono-primary" style={{ display: 'inline-block', marginBottom: 16 }}>FAQ</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.06)} className="h-section-2" style={{ marginBottom: 40 }}>
          Common questions.
        </motion.h2>

        <div>
          {faqs.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} style={{ marginTop: 32 }}>
          <a href="/faq" style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>
            All FAQ →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
