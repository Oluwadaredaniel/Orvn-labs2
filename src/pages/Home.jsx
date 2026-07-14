import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import FlowDiagram from '../components/FlowDiagram';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

// Custom Illustrations
import HeroIllustration from '../components/home/HeroIllustration';
import ProblemIllustration from '../components/home/ProblemIllustration';
import PricingIllustration from '../components/home/PricingIllustration';

// Custom SVG Icons
import {
  IconGauge,
  IconCalculator,
  IconEye,
  IconEyeOff,
  IconArrowRight,
  IconCheck,
  IconSend,
  IconSystems,
  IconBook,
} from '../components/home/Icons';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1], delay },
});

const BASELINE_CLOSE_RATE = 0.03;

const fmtCurrency = (n) => {
  const num = Math.round(Math.max(0, Number(n) || 0));
  if (num >= 1000000) return '$' + (num / 1000000).toFixed(2) + 'M';
  return '$' + num.toLocaleString();
};

// ─── 1. HERO ─────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="hero-grid-bg"
      style={{
        background: '#fff',
        paddingTop: 'clamp(90px, 12vw, 150px)',
        paddingBottom: 'clamp(70px, 9vw, 110px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Premium accent glows */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '70vw',
          height: '600px',
          background: 'radial-gradient(circle, rgba(91, 63, 212, 0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        className="container-page grid-responsive-2"
        style={{
          gap: 'clamp(48px, 6vw, 80px)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <motion.div {...fadeUp(0)}>
            <span
              className="pill animate-blink"
              style={{
                marginBottom: 24,
                background: '#FFF',
                border: '1.5px solid rgba(91, 63, 212, 0.12)',
                padding: '6px 14px',
                borderRadius: 100,
                fontSize: 12.5,
                fontWeight: 600,
                color: '#5B3FD4',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(91, 63, 212, 0.04)',
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0D9E6E', boxShadow: '0 0 8px #0D9E6E' }} />
              ORVN Labs · real estate brokerage infrastructure
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.05)}
            className="h-display"
            style={{
              fontSize: 'clamp(44px, 5.8vw, 76px)',
              lineHeight: 1.1,
              marginBottom: 24,
              fontWeight: 800,
            }}
          >
            Control the first-contact layer{' '}
            <span style={{ color: '#5B3FD4', background: 'linear-gradient(120deg, #5B3FD4, #7B5FEA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>before delay kills conversion.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{
              maxWidth: 580,
              marginBottom: 36,
              fontSize: 'clamp(17px, 1.8vw, 19px)',
              lineHeight: 1.65,
              color: '#475569',
            }}
          >
            ORVN Labs builds brokerage intelligence infrastructure.{' '}
            <strong style={{ color: '#0F172A', fontWeight: 700 }}>PAS</strong>, our flagship system,
            answers, qualifies, routes, books, and logs inbound leads — before human delay turns
            intent cold.
          </motion.p>

          <motion.div
            {...fadeUp(0.15)}
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}
          >
            <Link to="/#calculate" className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
              Run your lead leakage score <IconArrowRight size={18} />
            </Link>
            <Link to="/pas" className="btn-secondary" style={{ padding: '14px 28px', fontSize: 15 }}>
              Explore PAS
            </Link>
          </motion.div>

          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontSize: 13,
              color: '#94A3B8',
              maxWidth: 480,
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            ✦ Built for brokerage owners, team leads, and operators who cannot afford CRM graveyards.
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.25)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            width: '100%',
          }}
        >
          <div
            style={{
              position: 'relative',
              background: '#FFFFFF',
              padding: 'clamp(20px, 3vw, 32px)',
              borderRadius: 24,
              border: '1px solid rgba(15,23,42,0.06)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <HeroIllustration />
          </div>
          
          <FlowDiagram label="What PAS controls" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. PROBLEM ──────────────────────────────────────────────────────────────
function Problem() {
  const blameVsReality = [
    { blame: 'Bad leads', reality: 'Delayed first response' },
    { blame: 'Lazy agents', reality: 'Generic follow-up' },
    { blame: 'Weak CRM', reality: 'No qualification' },
    { blame: 'Bad ad source', reality: 'No booked next step' },
    { blame: 'Rough market', reality: 'After-hours leakage' },
  ];

  return (
    <Section background="surface" borderTop>
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>The problem</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
          }}
        >
          Most brokerages are measuring the wrong failure.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          The gap between inquiry and qualified appointment is usually where money dies — and it
          rarely shows up in the report you’re looking at.
        </motion.p>
      </div>

      <div
        className="grid-cols-responsive"
        style={{
          gap: 32,
          marginBottom: 48,
        }}
      >
        <CompareColumn
          icon={<IconEye size={22} />}
          tone="neutral"
          title="What gets measured"
          items={['Lead volume', 'Lead spend', 'Closed deals', 'Agent count']}
        />
        <CompareColumn
          icon={<IconEyeOff size={22} />}
          tone="risk"
          title="What gets ignored"
          items={[
            'Time to first response',
            'Actual contact rate',
            'Qualification rate',
            'Routing quality',
            'Booking rate',
          ]}
        />
      </div>

      <div
        className="grid-cols-2-responsive"
        style={{
          alignItems: 'center',
        }}
      >
        <motion.div
          {...fadeUp(0.1)}
          style={{
            background: '#fff',
            border: '1px solid #E5E8F0',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div
            className="grid-cols-responsive"
            style={{
              background: '#F8F9FA',
              borderBottom: '1px solid #E5E8F0',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            }}
          >
            <div style={{ padding: '18px 28px' }}>
              <span style={mono('#64748B', 0)}>What brokerages blame</span>
            </div>
            <div style={{ padding: '18px 28px', borderLeft: '1px solid #E5E8F0' }} className="no-border-mobile">
              <span style={mono('#5B3FD4', 0)}>What actually killed conversion</span>
            </div>
          </div>
          {blameVsReality.map((row, idx) => (
            <div
              key={row.blame}
              className="grid-cols-responsive"
              style={{
                borderBottom: idx === blameVsReality.length - 1 ? 'none' : '1px solid #F1F5F9',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              }}
            >
              <div
                style={{
                  padding: '16px 28px',
                  color: '#94A3B8',
                  fontSize: 14.5,
                  textDecoration: 'line-through',
                  fontWeight: 500,
                }}
              >
                {row.blame}
              </div>
              <div
                style={{
                  padding: '16px 28px',
                  color: '#0F172A',
                  fontSize: 14.5,
                  fontWeight: 600,
                  borderLeft: '1px solid #F1F5F9',
                }}
                className="no-border-mobile"
              >
                {row.reality}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.15)}
          style={{
            background: '#ffffff',
            borderRadius: 24,
            padding: '24px',
            border: '1px solid rgba(15,23,42,0.06)',
            boxShadow: 'var(--shadow-lg)',
            width: '100%',
          }}
        >
          <ProblemIllustration />
        </motion.div>
      </div>
    </Section>
  );
}

function CompareColumn({ icon, tone, title, items }) {
  const isRisk = tone === 'risk';
  const palette = isRisk
    ? { border: 'rgba(220, 38, 38, 0.15)', bg: '#FFF5F5', label: '#DC2626', dot: '#DC2626', iconBg: '#FEE2E2' }
    : { border: '#E5E8F0', bg: '#F8F9FA', label: '#475569', dot: '#94A3B8', iconBg: '#EEF0F3' };

  return (
    <motion.div
      {...fadeUp(0.05)}
      className="card"
      style={{
        background: palette.bg,
        border: `1.5px solid ${palette.border}`,
        borderRadius: 24,
        padding: 32,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <span
          style={{
            color: palette.label,
            display: 'inline-flex',
            padding: 10,
            background: palette.iconBg,
            borderRadius: 14,
          }}
        >
          {icon}
        </span>
        <span style={mono(palette.label, 0)}>{title}</span>
      </div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        {items.map((it) => (
          <li
            key={it}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              fontSize: 15,
              color: '#1E293B',
              fontWeight: isRisk ? 600 : 500,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: palette.dot,
                flexShrink: 0,
                boxShadow: isRisk ? '0 0 6px rgba(220, 38, 38, 0.4)' : 'none',
              }}
            />
            {it}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── 3. DIAGNOSTIC ───────────────────────────────────────────────────────────
function Diagnosis() {
  const [monthlyLeads, setMonthlyLeads] = useState(150);
  const [avgCommission, setAvgCommission] = useState(8000);
  const [missedPct, setMissedPct] = useState(30);

  const calc = useMemo(() => {
    const ml = Math.max(0, Number(monthlyLeads) || 0);
    const ac = Math.max(0, Number(avgCommission) || 0);
    const mp = Math.min(100, Math.max(0, Number(missedPct) || 0)) / 100;

    // Bug 1 & 2 fixes: consistent calculation logic
    const leadsAtRiskMonthly = ml * mp;
    const leadsAtRiskAnnual = leadsAtRiskMonthly * 12;
    const annualRevenueLeakage = leadsAtRiskAnnual * BASELINE_CLOSE_RATE * ac;

    return { leadsAtRiskMonthly, annualRevenueLeakage };
  }, [monthlyLeads, avgCommission, missedPct]);

  return (
    <Section id="calculate" borderTop>
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Diagnostics</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}
        >
          See where your leads are dying.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          Run the numbers in two minutes. Both tools run locally in your browser — your inputs
          stay with you.
        </motion.p>
      </div>

      <div
        className="grid-cols-2-responsive"
        style={{
          alignItems: 'start',
        }}
      >
        {/* Quick Calc Card */}
        <motion.div
          {...fadeUp(0.05)}
          style={{
            background: '#FFFFFF',
            border: '1px solid #E5E8F0',
            borderRadius: 24,
            padding: 'clamp(28px, 4vw, 40px)',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          <div style={{ ...mono('#64748B', 24), fontSize: 12, fontWeight: 700 }}>Quick Revenue Estimate</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <FormField label="Monthly inbound leads" value={monthlyLeads} onChange={setMonthlyLeads} type="number" />
            <FormField label="Avg. commission" value={avgCommission} onChange={setAvgCommission} type="number" prefix="$" />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Leads slipping today</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#D97706' }}>{missedPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={missedPct}
                onChange={(e) => setMissedPct(Number(e.target.value))}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 32,
              padding: 24,
              background: '#EEEAFB',
              border: '1.5px solid rgba(91, 63, 212, 0.16)',
              borderRadius: 18,
              boxShadow: 'var(--shadow-xs)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={mono('#5B3FD4', 8)}>Est. recoverable opportunity</div>
            <div
              style={{
                fontSize: 'clamp(36px, 5vw, 46px)',
                color: '#0F172A',
                lineHeight: 1,
                fontWeight: 800,
                display: 'flex',
                alignItems: 'baseline',
                letterSpacing: '-0.03em',
              }}
            >
              {fmtCurrency(calc.annualRevenueLeakage)}
              <span
                style={{
                  fontSize: 15,
                  color: '#94A3B8',
                  marginLeft: 8,
                  fontWeight: 600,
                }}
              >
                /yr
              </span>
            </div>
            <p style={{ fontSize: 11.5, color: '#64748B', margin: '10px 0 0', lineHeight: 1.5, fontWeight: 500 }}>
              Illustrative — assumes a ~3% close on recovered leads. Run the full calculator to model
              your current vs. target close rate.
            </p>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <ToolCard
            title="Lead Leakage Scorecard"
            icon={IconGauge}
            desc="Five-minute diagnostic of your first-contact layer. Sub-scores for response, contact, and booking."
            to="/calculators/leakage"
          />
          <ToolCard
            title="Full Revenue Calculator"
            icon={IconCalculator}
            desc="Conservative estimate of the revenue you could recover with faster first contact. Math shown step by step."
            to="/calculators/revenue"
          />
        </div>
      </div>
    </Section>
  );
}

function ToolCard({ title, icon: Icon, desc, to }) {
  return (
    <motion.div
      {...fadeUp(0.1)}
      className="card"
      style={{
        padding: 32,
        borderRadius: 24,
        background: '#fff',
        border: '1px solid #E5E8F0',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: 'rgba(91, 63, 212, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Icon size={24} color="#5B3FD4" />
      </div>
      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#0F172A',
          marginBottom: 10,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.6, marginBottom: 24 }}>{desc}</p>
      <Link
        to={to}
        className="btn-secondary"
        style={{
          alignSelf: 'flex-start',
          padding: '10px 20px',
          borderRadius: 100,
          fontSize: 13.5,
          fontWeight: 700,
        }}
      >
        Run tool <IconArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

function FormField({ label, value, onChange, type, prefix, suffix }) {
  return (
    <label style={{ display: 'block' }}>
      <span
        style={{
          display: 'block',
          fontSize: 13,
          fontWeight: 600,
          color: '#334155',
          marginBottom: 8,
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: 'flex',
          background: '#fff',
          border: '1.5px solid #E5E8F0',
          borderRadius: 12,
          overflow: 'hidden',
          transition: 'all 0.2s',
          boxShadow: 'var(--shadow-xs)',
        }}
      >
        {prefix && (
          <span
            style={{
              padding: '12px 16px',
              background: '#F8F9FA',
              color: '#94A3B8',
              fontSize: 14,
              fontWeight: 600,
              borderRight: '1.5px solid #E5E8F0',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            padding: '12px 16px',
            fontSize: 15,
            outline: 'none',
            width: '100%',
            color: '#0F172A',
            fontWeight: 600,
          }}
        />
        {suffix && (
          <span
            style={{
              padding: '12px 16px',
              background: '#F8F9FA',
              color: '#94A3B8',
              fontSize: 14,
              fontWeight: 600,
              borderLeft: '1.5px solid #E5E8F0',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

// ─── 4. PRICING ──────────────────────────────────────────────────────────────
function PricingSection() {
  return (
    <Section id="pricing" background="surface" borderTop>
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Pricing — early access</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}
        >
          Priced against what leakage already costs you.
        </motion.h2>
        <p
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569', maxWidth: 700 }}
        >
          PAS is priced as infrastructure, not a subscription experiment. We recommend a plan
          based on actual usage and complexity — not a pre-set tier.
        </p>
      </div>

      <motion.div
        {...fadeUp(0.1)}
        className="grid-cols-2-responsive"
        style={{
          background: '#fff',
          border: '1px solid #E5E8F0',
          borderRadius: 32,
          padding: 'clamp(32px, 5vw, 64px)',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: 'linear-gradient(90deg, transparent, #5B3FD4, transparent)',
          }}
        />

        <div>
          <h3
            style={{
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: 16,
              letterSpacing: '-0.025em',
            }}
          >
            Tailored solutions for every brokerage.
          </h3>
          <p
            style={{
              color: '#475569',
              fontSize: 'clamp(15px, 1.6vw, 16px)',
              lineHeight: 1.65,
              maxWidth: 580,
              margin: '0 0 36px',
            }}
          >
            Deployment and setup fees vary based on lead volume, integrations, routing complexity,
            and onboarding needs. Contact us for a quote based on your numbers.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href={PAS_LINKS.earlyAccess}
              className="btn-primary"
              style={{ padding: '14px 28px' }}
            >
              Apply for early access <IconArrowRight size={18} />
            </a>
            <a href="mailto:hello@orvnlabs.com" className="btn-secondary" style={{ padding: '14px 28px' }}>
              Contact for quote
            </a>
          </div>
        </div>

        <div style={{ width: '100%' }}>
          <PricingIllustration />
        </div>
      </motion.div>
    </Section>
  );
}

// ─── 5. FAQ ──────────────────────────────────────────────────────────────────
function FAQTeaser() {
  const top = [
    {
      q: 'Is PAS a CRM?',
      a: 'No. PAS is first-contact infrastructure — it works before and around the CRM.',
    },
    {
      q: 'Does PAS replace agents?',
      a: 'No. PAS protects intent before agents enter. Agents still close trust.',
    },
    {
      q: 'Does PAS replace ISAs?',
      a: 'PAS can support or replace parts of the first-touch ISA function depending on workflow.',
    },
    { q: 'Can PAS work after hours?', a: 'Yes. PAS is designed to protect after-hours intent.' },
  ];

  return (
    <Section borderTop>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: 24,
          marginBottom: 48,
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <motion.div {...fadeUp(0)}><Eyebrow>FAQ</Eyebrow></motion.div>
          <h2
            className="h-section"
            style={{
              fontSize: 'clamp(32px, 4vw, 44px)',
              margin: '18px 0 0',
              letterSpacing: '-0.025em',
            }}
          >
            Common questions.
          </h2>
        </div>
        <Link
          to="/faq"
          className="btn-ghost"
          style={{ fontSize: 14.5, fontWeight: 700, padding: '10px 0' }}
        >
          All FAQ <IconArrowRight size={18} />
        </Link>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {top.map((f, i) => (
          <FAQItem key={f.q} question={f.q} answer={f.a} delay={i * 0.05} />
        ))}
      </div>
    </Section>
  );
}

function FAQItem({ question, answer, delay }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      {...fadeUp(delay)}
      style={{
        borderBottom: '1px solid #E5E8F0',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          gap: 20,
        }}
      >
        <span
          style={{
            fontSize: 'clamp(16px, 1.8vw, 17.5px)',
            fontWeight: 700,
            color: '#0F172A',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            letterSpacing: '-0.01em',
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          style={{ color: '#94A3B8', flexShrink: 0 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <p
          style={{
            fontSize: 15,
            color: '#475569',
            lineHeight: 1.65,
            paddingBottom: 24,
            margin: 0,
            maxWidth: 760,
          }}
        >
          {answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─── 6. FINAL CTA ────────────────────────────────────────────────────────────
function FinalCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'home_cta_forum' }),
      });
      if (!res.ok) throw new Error('Failed to join forum');
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Section borderTop>
        <div
          style={{
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            borderRadius: 24,
            padding: '48px 24px',
            textAlign: 'center',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 100,
              background: '#D1FAE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}
          >
            <IconCheck size={28} color="#0D9E6E" />
          </div>
          <h3
            style={{
              color: '#065F46',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '-0.02em',
            }}
          >
            Welcome to the forum.
          </h3>
          <p style={{ color: '#065F46', fontSize: 15.5, margin: '8px 0 0', fontWeight: 500 }}>
            You're in. We'll reach out within one business day.<br/>
            <span style={{ opacity: 0.8, fontSize: 13 }}>Check your spam folder if you don't see our welcome email in 5 minutes.</span>
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="surface" borderTop>
      <div
        style={{
          background: 'linear-gradient(135deg, #5B3FD4 0%, #4A30C0 100%)',
          borderRadius: 32,
          padding: 'clamp(56px, 9vw, 96px) clamp(24px, 5vw, 48px)',
          color: '#fff',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(91, 63, 212, 0.25)',
        }}
      >
        {/* Subtle background decorative grid and glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '45%',
            height: '80%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.h2
            {...fadeUp(0)}
            className="h-section"
            style={{
              color: '#fff',
              fontSize: 'clamp(36px, 5vw, 56px)',
              margin: '0 0 20px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              fontWeight: 800,
            }}
          >
            Stop guessing where your leads die.
          </motion.h2>
          <motion.p
            {...fadeUp(0.05)}
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: 'clamp(16px, 1.8vw, 18.5px)',
              lineHeight: 1.6,
              margin: '0 auto 40px',
              maxWidth: 620,
              fontWeight: 500,
            }}
          >
            Early access is limited. Join the forum to secure your brokerage's spot in our next
            cohort.
          </motion.p>

          <motion.form
            {...fadeUp(0.1)}
            onSubmit={submit}
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: 540,
              margin: '0 auto',
            }}
          >
            <input
              type="email"
              required
              placeholder="your@brokerage.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: '1 1 300px',
                background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                borderRadius: 100,
                padding: '16px 28px',
                fontSize: 15.5,
                color: '#fff',
                outline: 'none',
                transition: 'all 0.25s',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
              }}
              onFocus={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.6)')}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary"
              style={{
                background: '#fff',
                color: '#5B3FD4',
                padding: '16px 32px',
                fontSize: 15.5,
                fontWeight: 700,
                borderRadius: 100,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              }}
            >
              {status === 'loading' ? 'Joining...' : 'Join the forum'} <IconArrowRight size={18} />
            </button>
          </motion.form>
          {status === 'error' && (
            <p style={{ color: '#FFB2B2', fontSize: 14, marginTop: 16, fontWeight: 600 }}>
              Something went wrong. Please try again.
            </p>
          )}
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 24, fontWeight: 500 }}>
            Check your spam folder if you don't see our welcome email in 5 minutes.
          </p>
        </div>
      </div>
    </Section>
  );
}

// ─── RECENT BLOGS ────────────────────────────────────────────────────────────
function RecentBlogsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentPosts();
  }, []);

  const loadRecentPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/blog/list');
      if (!res.ok) throw new Error('Failed to load posts');
      const data = await res.json();
      setPosts((data.posts || []).slice(0, 3));
    } catch (err) {
      console.error('Failed to load recent posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const fmt = (iso) =>
    new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <Section borderTop>
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Latest from the blog</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}
        >
          Field notes on lead conversion.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          Insights from the trenches: first-contact strategy, operational frameworks, and real estate market analysis.
        </motion.p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
          Loading posts...
        </div>
      ) : posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: 16, color: '#94A3B8' }}>No blog posts yet.</p>
          <Link to="/blog" className="btn-secondary" style={{ marginTop: 20, display: 'inline-block' }}>
            Explore the blog
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid-cols-responsive" style={{ gap: 24, marginBottom: 48 }}>
            {posts.map((post, idx) => (
              <motion.article
                key={post.slug}
                {...fadeUp(idx * 0.05)}
                className="card"
                style={{
                  padding: 32,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 24,
                  background: '#fff',
                  border: '1px solid #E5E8F0',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5B3FD4',
                    marginBottom: 12,
                    display: 'inline-block',
                    fontWeight: 600,
                  }}
                >
                  {post.category}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(18px, 2.2vw, 22px)',
                    fontWeight: 700,
                    color: '#0F172A',
                    margin: '0 0 12px',
                    lineHeight: 1.35,
                  }}
                >
                  <Link to={`/blog/${post.slug}`} style={{ color: '#0F172A', textDecoration: 'none' }}>
                    {post.title}
                  </Link>
                </h3>
                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.65, margin: '0 0 18px', flex: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
                  <span>{fmt(post.published_at)}</span>
                  <span>·</span>
                  <span>{post.read_minutes} min read</span>
                </div>
                <Link
                  to={`/blog/${post.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#5B3FD4',
                    fontWeight: 700,
                    fontSize: 14,
                    textDecoration: 'none',
                  }}
                >
                  Read post →
                </Link>
              </motion.article>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/blog" className="btn-secondary">
              Explore all posts <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </Section>
  );
}

// ─── HOME ────────────────────────────────────────────────────────────────────
export default function Home() {
  useDocumentMeta({
    title: 'Control the First-Contact Layer — AI Infrastructure for Brokerages',
    description: 'ORVN Labs builds brokerage intelligence infrastructure. PAS answers, qualifies, routes, and books inbound leads before human delay kills your conversion rate.',
    path: '/',
    schema: {
      '@type': 'WebSite',
      'name': 'ORVN Labs',
      'description': 'Real estate brokerage infrastructure for lead conversion.',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://orvnlabs.com/blog?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  });
  return (
    <PageWrapper>
      <Hero />
      <Problem />
      <Diagnosis />
      <PricingSection />

      {/* Tighter "Experience" Grouping via Navigation */}
      <Section borderTop background="surface">
        <div className="grid-cols-responsive" style={{ gap: 24 }}>
          <LinkCard
            eyebrow="Systems & Proof"
            title="Explore PAS in detail"
            desc="Workflows, capabilities, and open source proof. See the technical layer behind the staff."
            to="/pas"
            cta="Explore systems"
            icon={IconSystems}
          />
          <LinkCard
            eyebrow="Thesis & Insights"
            title="First-Contact Intelligence"
            desc="The philosophy, the founder's story, and field notes on lead conversion for operators."
            to="/thesis"
            cta="Read thesis"
            icon={IconBook}
          />
        </div>
      </Section>

      {/* Resources Section */}
      <RecentBlogsSection />

      <Section borderTop background="surface" style={{ display: 'none' }}>
        <div className="grid-cols-responsive" style={{ gap: 24, marginBottom: 48 }}>
          <motion.div {...fadeUp(0.05)}>
            <ResourceSection
              title="Toolkits & Thesis"
              icon={IconSystems}
              items={[
                { title: 'First-Contact Intelligence Framework', desc: 'The philosophy and operational model behind PAS.' },
                { title: 'Lead Qualification Template', desc: 'A structured intake flow you can deploy today.' },
                { title: 'Speed-to-Lead Audit Checklist', desc: 'Identify and eliminate every delay in your pipeline.' },
              ]}
              link="/resources"
            />
          </motion.div>
        </div>
      </Section>

      <FAQTeaser />
      <FinalCTA />
    </PageWrapper>
  );
}

function LinkCard({ eyebrow, title, desc, to, cta, icon: Icon }) {
  return (
    <Link to={to} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <motion.div
        {...fadeUp(0.05)}
        className="card"
        style={{
          padding: 'clamp(32px, 5vw, 44px)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 24,
          background: '#fff',
          border: '1px solid #E5E8F0',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <span style={mono('#5B3FD4', 0)}>{eyebrow}</span>
          <span
            style={{
              color: '#5B3FD4',
              display: 'inline-flex',
              padding: 8,
              background: 'rgba(91, 63, 212, 0.06)',
              borderRadius: 12,
            }}
          >
            <Icon size={20} color="#5B3FD4" />
          </span>
        </div>
        
        <h3
          style={{
            fontSize: 'clamp(20px, 2.5vw, 24px)',
            fontWeight: 700,
            color: '#0F172A',
            marginBottom: 14,
            letterSpacing: '-0.025em',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 15,
            color: '#475569',
            lineHeight: 1.6,
            marginBottom: 28,
            flex: 1,
          }}
        >
          {desc}
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            color: '#5B3FD4',
            fontWeight: 700,
            fontSize: 14.5,
          }}
        >
          {cta} <IconArrowRight size={18} />
        </div>
      </motion.div>
    </Link>
  );
}

function ResourceSection({ title, icon: Icon, items, link }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #E5E8F0',
        borderRadius: 24,
        padding: 'clamp(32px, 5vw, 44px)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
        <span
          style={{
            color: '#5B3FD4',
            display: 'inline-flex',
            padding: 10,
            background: 'rgba(91, 63, 212, 0.06)',
            borderRadius: 14,
          }}
        >
          <Icon size={22} />
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#5B3FD4',
            fontWeight: 700,
          }}
        >
          {title}
        </span>
      </div>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          flex: 1,
        }}
      >
        {items.map((item) => (
          <li
            key={item.title}
            style={{
              paddingBottom: 16,
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 600, color: '#0F172A', marginBottom: 6 }}>
              {item.title}
            </div>
            <p style={{ fontSize: 13.5, color: '#475569', margin: 0, lineHeight: 1.5 }}>
              {item.desc}
            </p>
          </li>
        ))}
      </ul>

      <Link
        to={link}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          color: '#5B3FD4',
          fontWeight: 700,
          fontSize: 14.5,
          marginTop: 16,
          textDecoration: 'none',
        }}
      >
        Explore all <IconArrowRight size={16} />
      </Link>
    </div>
  );
}

function mono(color = '#94A3B8', marginBottom = 0) {
  return {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10.5,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color,
    fontWeight: 700,
    marginBottom,
  };
}