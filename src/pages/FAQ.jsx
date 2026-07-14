import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';

const FAQS = [
  {
    q: 'Is PAS a CRM?',
    a: (
      <p>
        No. PAS is first-contact infrastructure. It works before and around the CRM by answering,
        qualifying, routing, booking, and logging outcomes. Your CRM remains the system of record.
      </p>
    ),
  },
  {
    q: 'Does PAS replace agents?',
    a: <p>No. PAS protects intent before agents enter. Agents still close trust.</p>,
  },
  {
    q: 'Does PAS replace ISAs?',
    a: (
      <p>
        PAS can support or replace parts of the first-touch ISA function depending on brokerage
        workflow. Many brokerages run PAS alongside a smaller ISA team that handles the hardest
        conversations.
      </p>
    ),
  },
  {
    q: 'What happens when a lead wants a human?',
    a: <p>PAS routes or transfers according to brokerage rules — by territory, price band, language, agent specialty, or escalation logic.</p>,
  },
  {
    q: 'Can PAS work after hours?',
    a: <p>Yes. PAS is designed to protect after-hours intent. Inquiries between 7pm and 9am are usually a brokerage’s highest-intent leads — and the most likely to leak.</p>,
  },
  {
    q: 'What are PAS Credits?',
    a: (
      <p>
        PAS Credits measure usage across calls, minutes, qualification, routing, booking, and
        intelligence records. Plans bundle credits monthly. Overage is billed transparently. See{' '}
        <Link to="/#pricing" style={{ color: '#5B3FD4', fontWeight: 600 }}>pricing</Link>.
      </p>
    ),
  },
  {
    q: 'Is pricing fixed?',
    a: (
      <p>
        Early access pricing depends on volume, deployment needs, and integrations. Tiers are a
        starting point — Enterprise quotes are based on actual usage and routing complexity.
      </p>
    ),
  },
  {
    q: 'What data does PAS collect?',
    a: (
      <p>
        PAS may process lead contact information, call transcripts and summaries, booking details,
        routing outcomes, and usage data. Full detail in the{' '}
        <Link to="/legal/privacy" style={{ color: '#5B3FD4', fontWeight: 600 }}>Privacy Policy</Link> and{' '}
        <Link to="/legal/data-retention" style={{ color: '#5B3FD4', fontWeight: 600 }}>Data Retention Policy</Link>.
      </p>
    ),
  },
  {
    q: 'How does ORVN connect to PAS?',
    a: (
      <p>
        ORVN Labs is the public company and platform layer. PAS is the backend product
        infrastructure. The ORVN website routes users into PAS experiences (control room, demo,
        early access) — but the website never imports PAS code. They run on separate
        infrastructure with separate auth.
      </p>
    ),
  },
  {
    q: 'Is PAS Fair Housing compliant?',
    a: (
      <p>
        PAS is built to qualify on intent, budget, timeline, location/property interest,
        availability, and consent. It does not ask for or qualify on protected traits. See the{' '}
        <Link to="/legal/fair-housing" style={{ color: '#5B3FD4', fontWeight: 600 }}>Fair Housing Compliance</Link>{' '}
        and{' '}
        <Link to="/legal/ai-disclosure" style={{ color: '#5B3FD4', fontWeight: 600 }}>AI / Call Recording Disclosure</Link>{' '}
        pages.
      </p>
    ),
  },
  {
    q: 'How long does deployment take?',
    a: <p>Most brokerages go live within two weeks. Multi-office and custom CRM integrations on Enterprise can take longer; quoted per engagement.</p>,
  },
  {
    q: 'Can I see PAS run on a real conversation before paying?',
    a: (
      <p>
        Yes — you can see our product workflows and capabilities on the <Link to="/pas" style={{ color: '#5B3FD4', fontWeight: 600 }}>PAS page</Link>.
      </p>
    ),
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1], delay },
});

function Item({ q, a, defaultOpen, delay }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        background: '#fff',
        border: '1.5px solid #E5E8F0',
        borderRadius: 20,
        marginBottom: 16,
        overflow: 'hidden',
        boxShadow: open ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          padding: '24px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(15.5px, 1.8vw, 17.5px)',
            fontWeight: 700,
            color: '#0F172A',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: '-0.01em',
          }}
        >
          {q}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
          <ChevronDown size={18} color="#5B3FD4" style={{ opacity: 0.8 }} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 28px 24px',
                fontSize: 15,
                color: '#475569',
                lineHeight: 1.7,
                fontWeight: 500,
              }}
            >
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  useDocumentMeta({
    title: 'Frequently Asked Questions — PAS & ORVN Labs',
    description: 'Common questions about PAS AI infrastructure, brokerage lead conversion, pricing, data security, and Fair Housing compliance.',
    path: '/faq',
    schema: {
      '@type': 'FAQPage',
      'mainEntity': FAQS.map(f => ({
        '@type': 'Question',
        'name': f.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': typeof f.a === 'string' ? f.a : 'See FAQ page for details.'
        }
      }))
    }
  });

  return (
    <PageWrapper>
      <section
        style={{
          padding: 'clamp(100px, 12vw, 150px) 0 clamp(40px, 6vw, 64px)',
          background: '#fff',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow background */}
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '400px',
            background: 'radial-gradient(circle, rgba(91, 63, 212, 0.04) 0%, transparent 65%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div className="container-page" style={{ maxWidth: 800, position: 'relative', zIndex: 1 }}>
          <motion.div {...fadeUp(0)}><Eyebrow>FAQ</Eyebrow></motion.div>
          <motion.h1
            {...fadeUp(0.05)}
            className="h-display"
            style={{
              fontSize: 'clamp(38px, 6vw, 64px)',
              margin: '18px 0 20px',
              letterSpacing: '-0.03em',
              fontWeight: 800,
              lineHeight: 1.05,
            }}
          >
            Common questions.
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569', lineHeight: 1.6 }}
          >
            Practical answers about PAS, ORVN, pricing, data, and integrations. Email{' '}
            <a
              href="mailto:hello@orvnlabs.com"
              style={{ color: '#5B3FD4', textDecoration: 'none', fontWeight: 700 }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              hello@orvnlabs.com
            </a>{' '}
            for anything not covered here.
          </motion.p>
        </div>
      </section>

      <Section borderTop background="surface">
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          {FAQS.map((f, i) => (
            <Item key={f.q} {...f} defaultOpen={i === 0} delay={i * 0.04} />
          ))}
        </div>

        <motion.div {...fadeUp(0.2)} style={{ marginTop: 48, textAlign: 'center' }}>
          <Link
            to="/calculators/leakage"
            className="btn-primary"
            style={{ padding: '14px 28px', borderRadius: 100, display: 'inline-flex', alignItems: 'center', gap: 10 }}
          >
            Run lead leakage score <ArrowRight size={16} />
          </Link>
        </motion.div>
      </Section>
    </PageWrapper>
  );
}
