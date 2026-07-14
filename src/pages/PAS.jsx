import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Phone,
  Compass,
  Activity,
  ShieldCheck,
  Calendar,
  Clock,
  ListChecks,
  GitBranch,
  Bell,
  BarChart3,
  Eye,
  Zap,
  Github,
  CheckCircle2,
  Image as ImageIcon,
  Building2,
  Sparkles,
  Layers,
  Database,
  FileSearch,
  Users,
  ChevronDown,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import PageWrapper from '../components/PageWrapper';
import Section from '../components/ui/Section';
import Eyebrow from '../components/ui/Eyebrow';
import { useDocumentMeta } from '../lib/seo';
import { PAS_LINKS } from '../lib/pas';

// Custom illustrations
import PasHeroIllustration from '../components/home/PasHeroIllustration';
import NocDashboardIllustration from '../components/home/NocDashboardIllustration';
import EngineArchitectureIllustration from '../components/home/EngineArchitectureIllustration';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
});

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

// ─── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      style={{
        paddingTop: 'clamp(100px, 12vw, 160px)',
        paddingBottom: 'clamp(60px, 8vw, 100px)',
        position: 'relative',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Decorative glows */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '600px',
          background: 'radial-gradient(circle, rgba(91, 63, 212, 0.05) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-page" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid-responsive-2" style={{ gap: '48px', alignItems: 'center' }}>
          <div>
            <motion.div {...fadeUp(0)}>
              <span
                className="pill animate-blink"
                style={{
                  marginBottom: 24,
                  background: '#fff',
                  border: '1.5px solid rgba(91, 63, 212, 0.12)',
                  padding: '6px 14px',
                  borderRadius: 100,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: '#5B3FD4',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#5B3FD4', boxShadow: '0 0 8px #5B3FD4' }} />
                PAS — Performative AI Superstaff
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
              The technical layer for <br />
              <span style={{ color: '#5B3FD4', background: 'linear-gradient(120deg, #5B3FD4, #7B5FEA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>brokerage intelligence.</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.1)}
              className="lead"
              style={{
                maxWidth: 620,
                marginBottom: 36,
                fontSize: 'clamp(17px, 1.8vw, 19px)',
                lineHeight: 1.65,
                color: '#475569',
              }}
            >
              PAS is not a chatbot or a simple IVR. It is the operating layer that controls the gap
              between inquiry and qualified appointment.
            </motion.p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 20,
                marginTop: 20,
              }}
            >
              <motion.div
                {...fadeUp(0.15)}
                style={{
                  padding: 24,
                  background: '#FFF5F5',
                  border: '1.5px solid rgba(220, 38, 38, 0.1)',
                  borderRadius: 20,
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={mono('#DC2626', 10)}>Core function</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#991B1B', lineHeight: 1.35 }}>
                  Eliminating the delay between intent and response.
                </div>
              </motion.div>
              <motion.div
                {...fadeUp(0.2)}
                style={{
                  padding: 24,
                  background: '#F0EEFF',
                  border: '1.5px solid rgba(91, 63, 212, 0.1)',
                  borderRadius: 20,
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                <div style={mono('#5B3FD4', 10)}>System status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: '#0D9E6E',
                      boxShadow: '0 0 8px #0D9E6E',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: '#3A2899',
                    }}
                  >
                    Production Ready
                  </span>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            {...fadeUp(0.22)}
            style={{
              background: '#ffffff',
              borderRadius: 24,
              padding: '24px',
              border: '1px solid rgba(15,23,42,0.06)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <PasHeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── BRAND HIERARCHY (AS ARCHITECTURE) ────────────────────────────────────
function BrandHierarchy() {
  const tiers = [
    {
      icon: Building2,
      label: 'ORVN Labs',
      role: 'Parent infrastructure company',
      desc: 'Builds brokerage intelligence infrastructure for real estate.',
      tone: 'neutral',
    },
    {
      icon: Sparkles,
      label: 'PAS',
      role: 'Flagship product · Performative AI Superstaff',
      desc: 'The first ORVN system. Controls the first-contact layer.',
      tone: 'primary',
    },
    {
      icon: Layers,
      label: 'First-contact infrastructure',
      role: 'Category',
      desc: 'The operating layer between inquiry and qualified appointment.',
      tone: 'ok',
    },
  ];

  const map = (t) =>
    t === 'primary'
      ? { bg: 'linear-gradient(135deg, #5B3FD4 0%, #4A30C0 100%)', border: '#5B3FD4', iconColor: '#5B3FD4', iconBg: '#FFF', label: '#fff', sub: 'rgba(255, 255, 255, 0.75)', descColor: '#fff', shadow: '0 20px 40px rgba(91, 63, 212, 0.15)' }
      : t === 'ok'
      ? { bg: '#FFF', border: '#E5E8F0', iconColor: '#0D9E6E', iconBg: '#ECFDF5', label: '#0F172A', sub: '#0D9E6E', descColor: '#475569', shadow: 'var(--shadow-md)' }
      : { bg: '#FFF', border: '#E5E8F0', iconColor: '#475569', iconBg: '#F8F9FA', label: '#0F172A', sub: '#94A3B8', descColor: '#475569', shadow: 'var(--shadow-md)' };

  return (
    <Section borderTop background="surface">
      <div style={{ maxWidth: 840, marginBottom: 64 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Brand hierarchy</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
          }}
        >
          One company. One flagship system. One category.
        </motion.h2>
      </div>

      <div
        className="grid-cols-responsive"
        style={{
          gap: 32,
        }}
      >
        {tiers.map((t, i) => {
          const c = map(t.tone);
          const Icon = t.icon;
          return (
            <motion.div
              key={t.label}
              {...fadeUp(0.05 + i * 0.1)}
              style={{
                background: c.bg,
                border: `1.5px solid ${c.border}`,
                borderRadius: 24,
                padding: 'clamp(28px, 4vw, 36px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                boxShadow: c.shadow,
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: c.iconBg,
                    color: c.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <Icon size={22} />
                </span>
                <span style={mono(t.tone === 'primary' ? 'rgba(255,255,255,0.6)' : '#94A3B8')}>
                  0{i + 1}
                </span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: c.label,
                    marginBottom: 6,
                  }}
                >
                  {t.label}
                </div>
                <div style={{ fontSize: 13.5, color: c.sub, marginBottom: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                  {t.role}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: c.descColor,
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {t.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── THE PROCESS (SIX MOVEMENTS AS A PIPELINE) ─────────────────────────────
function WhatPASControls() {
  const steps = [
    { n: 1, label: 'Inquiry', body: 'Lead arrives — web, phone, listing, paid ad.' },
    { n: 2, label: 'Answer', body: 'PAS responds in seconds, on the same channel.' },
    { n: 3, label: 'Qualify', body: 'Intent, urgency, budget, timeline, financing.' },
    { n: 4, label: 'Route', body: 'Best-fit agent by territory, price band, specialty.' },
    { n: 5, label: 'Book', body: 'Appointment on the agent’s calendar, full context attached.' },
    { n: 6, label: 'Log', body: 'Status reflects what actually happened. CRM stays clean.' },
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 840, marginBottom: 64 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>The process</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
          }}
        >
          Six movements. One operating layer.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          Every inbound lead moves through the same six steps. PAS controls all of them — so the
          first conversation starts with structure, not guesswork.
        </motion.p>
      </div>

      <div style={{ position: 'relative' }}>
        {/* The Pipeline Spine - Premium interactive dashed bar */}
        <div
          className="nav-desktop"
          style={{
            position: 'absolute',
            left: 40,
            right: 40,
            top: 48,
            height: 2,
            background: 'linear-gradient(90deg, transparent, #5B3FD4, transparent)',
            zIndex: 0,
            opacity: 0.15,
            display: 'none',
          }}
        />

      <div
        className="grid-cols-responsive"
        style={{
          gap: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              {...fadeUp(0.1 + i * 0.05)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                background: '#fff',
                border: '1px solid #E5E8F0',
                borderRadius: 20,
                padding: '24px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: '#F0EEFF',
                  border: '1.5px solid rgba(91, 63, 212, 0.15)',
                  color: '#5B3FD4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 800,
                  boxShadow: '0 4px 12px rgba(91, 63, 212, 0.08)',
                }}
              >
                {s.n}
              </div>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: 8,
                  }}
                >
                  {s.label}
                </div>
                <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── HOW PAS WORKS (OPERATIONAL STAGES) ───────────────────────────────────
function HowPASWorks() {
  const stages = [
    {
      key: 'detect',
      n: 1,
      icon: Eye,
      title: 'Detect',
      body: 'Captures intent, budget, timeline, objections, and callback requests as the call happens.',
    },
    {
      key: 'decide',
      n: 2,
      icon: GitBranch,
      title: 'Decide',
      body: 'Determines the right next step in real time: booking, callback, follow-up, or hand-off.',
    },
    {
      key: 'act',
      n: 3,
      icon: Zap,
      title: 'Act',
      body: 'Books on the calendar, schedules the callback, logs the workflow, and reports outcomes.',
    },
  ];

  return (
    <Section borderTop background="surface">
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>How PAS works</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
          }}
        >
          PAS detects what happened, decides the next step, and acts.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          Three movements per inbound lead. PAS owns all three so the next step doesn’t depend on
          someone remembering to follow up.
        </motion.p>
      </div>

      <div
        className="grid-cols-responsive"
        style={{
          gap: 32,
        }}
      >
        {stages.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.key}
              {...fadeUp(0.1 * i)}
              style={{
                background: '#fff',
                padding: 'clamp(28px, 5vw, 40px)',
                borderRadius: 24,
                border: '1.5px solid #E5E8F0',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              <div style={{ display: 'flex', justifyStyle: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: 'rgba(91, 63, 212, 0.06)',
                    color: '#5B3FD4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <Icon size={24} />
                </div>
                <span style={mono('#94A3B8')}>Stage 0{s.n}</span>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: 10,
                  }}
                >
                  {s.title}
                </div>
                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.65, margin: 0, fontWeight: 500 }}>
                  {s.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── CAPABILITIES (THE INTELLIGENCE FEED) ──────────────────────────────────
function Capabilities() {
  const caps = [
    { icon: Phone, label: 'Answers inbound calls', sub: 'Picks up every call, day or night.' },
    { icon: Compass, label: 'Qualifies buy / sell / rent', sub: 'Identifies what the lead actually wants.' },
    { icon: Activity, label: 'Captures intent, budget, timeline', sub: 'In writing, on the lead record. Not in someone’s head.' },
    { icon: ShieldCheck, label: 'Handles objections', sub: '“Just looking”, “not pre-approved”, “send links over email”.' },
    { icon: Calendar, label: 'Books appointments', sub: 'Direct to the agent calendar, with full context attached.' },
    { icon: Clock, label: 'Schedules callbacks', sub: 'When booking isn’t the right next step, the callback gets scheduled — not forgotten.' },
    { icon: ListChecks, label: 'Logs every call', sub: 'Outcome and transcript saved. Nothing lives in someone’s memory.' },
    { icon: GitBranch, label: 'Creates workflow timelines', sub: 'Each call becomes a record of what PAS detected, decided, and did.' },
    { icon: Bell, label: 'Sends Slack and email reports', sub: 'Outcomes show up where the team already works. No portal babysitting.' },
    { icon: BarChart3, label: 'Operational visibility', sub: 'Brokerages can see what happened, when, and why — without chasing it.' },
  ];

  return (
    <Section borderTop>
      <div
        className="grid-cols-2-responsive"
        style={{
          alignItems: 'start',
        }}
      >
        <div style={{ position: 'sticky', top: 120, zIndex: 10 }} className="no-sticky-mobile mb-mobile-32">
          <motion.div {...fadeUp(0)}><Eyebrow>Capabilities</Eyebrow></motion.div>
          <motion.h2
            {...fadeUp(0.05)}
            className="h-section"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              margin: '18px 0 20px',
              lineHeight: 1.1,
            }}
          >
            What PAS does on every inbound lead.
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{ fontSize: 16.5, color: '#475569', lineHeight: 1.6 }}
          >
            A complete first-contact loop — from the moment the call comes in to the moment the
            team has the next step in Slack or email.
          </motion.p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {caps.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                {...fadeUp(0.05 * i)}
                style={{
                  background: '#F8FAFC',
                  border: '1.5px solid #E5E8F0',
                  borderRadius: 20,
                  padding: 24,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'flex-start',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: '#fff',
                    border: '1px solid #E5E8F0',
                    color: '#5B3FD4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: 'var(--shadow-xs)',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                    {c.label}
                  </div>
                  <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                    {c.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── PRODUCT PROOF (REPLACED GITHUB AND TERMINAL WITH EXPANDIVE VISUAL WORKFLOW) ──
function ProductProof() {
  const screenshots = [
    {
      key: 'workflow',
      src: '/pas/workflow.png',
      title: 'Live workflow timeline',
      caption: 'PAS turns each call into an explicit detect → decide → act trail.',
    },
    {
      key: 'event-timeline',
      src: '/pas/event-timeline.png',
      title: 'Per-call event timeline',
      caption: 'Every state transition, objection, booking, and callback — auditable.',
    },
  ];

  return (
    <Section borderTop background="surface">
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}>
          <Eyebrow>Product proof</Eyebrow>
        </motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
          }}
        >
          PAS is real, in code, and shippable.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          No vapor, no slides. The product is the codebase, featuring deterministic state transition layers and quality assurance checks.
        </motion.p>
      </div>

      <div
        className="grid-cols-responsive"
        style={{
          gap: 32,
          marginBottom: 40,
        }}
      >
        {screenshots.map((s, i) => (
          <Screenshot key={s.key} src={s.src} title={s.title} caption={s.caption} delay={i * 0.1} />
        ))}
      </div>

      <motion.div
        {...fadeUp(0.15)}
        style={{
          background: '#fff',
          borderRadius: 24,
          padding: 'clamp(24px, 5vw, 40px)',
          border: '1.5px solid #E5E8F0',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: '#0F172A', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
            Engine Architecture Core
          </div>
          <p style={{ color: '#475569', fontSize: 15.5, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
            Inspect the high-fidelity state tracking sequence built into the PAS operating layer.
          </p>
        </div>
        <div style={{ width: '100%' }}>
          <EngineArchitectureIllustration />
        </div>
      </motion.div>
    </Section>
  );
}

function Screenshot({ src, title, caption, delay }) {
  const [errored, setErrored] = useState(false);
  return (
    <motion.figure
      {...fadeUp(delay)}
      style={{
        background: '#fff',
        border: '1.5px solid #E5E8F0',
        borderRadius: 24,
        padding: 12,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div
        style={{
          background: '#F8FAFC',
          borderRadius: 16,
          aspectRatio: '16 / 10',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid #F1F5F9',
        }}
      >
        {errored ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              color: '#94A3B8',
              ...mono(),
            }}
          >
            <ImageIcon size={24} />
            <span>{src}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={title}
            loading="lazy"
            onError={() => setErrored(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>
      <figcaption style={{ padding: '0 12px 12px' }}>
        <div style={{ fontSize: 16.5, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
          {title}
        </div>
        <div style={{ fontSize: 14, color: '#475569', lineHeight: 1.5, fontWeight: 500 }}>{caption}</div>
      </figcaption>
    </motion.figure>
  );
}

// ─── CONTROL ROOM (NOC DASHBOARD) ─────────────────────────────────────────
function ControlRoom() {
  const cards = [
    { label: 'Calls handled', value: '184', tone: 'primary', sub: 'this week' },
    { label: 'Qualified leads', value: '67', tone: 'primary', sub: '36% of inbound' },
    { label: 'Appointments booked', value: '41', tone: 'ok', sub: 'across 9 agents' },
    { label: 'After-hours captured', value: '24', tone: 'primary', sub: 'would have leaked' },
    { label: 'Qualified but not booked', value: '12', tone: 'warn', sub: 'recoverable in 48h' },
    { label: 'First-Contact Lift', value: '+38%', tone: 'ok', sub: 'vs pre-PAS baseline' },
  ];
  const intel = [
    'Intent', 'Urgency', 'Budget', 'Timeline', 'Objection',
    'Routing outcome', 'Booking status', 'Final outcome',
  ];

  return (
    <Section borderTop background="surface">
      <div className="grid-cols-2-responsive" style={{ alignItems: 'center', marginBottom: 56 }}>
        <div>
          <motion.div {...fadeUp(0)}><Eyebrow>PAS Control Room</Eyebrow></motion.div>
          <motion.h2
            {...fadeUp(0.05)}
            className="h-section"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              margin: '18px 0 20px',
              lineHeight: 1.1,
            }}
          >
            The dashboard is the control room — not another daily workload.
          </motion.h2>
          <motion.p
            {...fadeUp(0.1)}
            className="lead"
            style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
          >
            The dashboard is not the product. It shows what the infrastructure already controlled —
            where leads moved, where they stalled, where they died.
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.12)}
          style={{
            background: '#1E293B',
            borderRadius: 24,
            padding: 16,
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          <NocDashboardIllustration />
        </motion.div>
      </div>

      <motion.div
        {...fadeUp(0.15)}
        style={{
          background: '#0F172A',
          borderRadius: 24,
          overflow: 'hidden',
          border: '1px solid #1E293B',
          boxShadow: '0 40px 80px -20px rgba(15, 23, 42, 0.4)',
        }}
      >
        <div
          style={{
            background: '#1E293B',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid #334155',
          }}
        >
          <div
            className="animate-pulse"
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}
          />
          <span style={mono('#94A3B8')}>NOC · Operational Pulse</span>
          <span
            style={{
              marginLeft: 'auto',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#475569',
              fontWeight: 600,
            }}
          >
            Example view · demo data
          </span>
        </div>

        <div
          className="grid-cols-responsive"
          style={{
            background: '#1E293B',
            gap: 1,
          }}
        >
          {cards.map((c) => (
            <div key={c.label} style={{ background: '#0F172A', padding: '32px' }}>
              <div style={mono('#475569', 12)}>{c.label}</div>
              <div
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  lineHeight: 1,
                  color:
                    c.tone === 'ok'
                      ? '#10B981'
                      : c.tone === 'warn'
                      ? '#F59E0B'
                      : c.tone === 'primary'
                      ? '#A78BFA'
                      : '#fff',
                  margin: '12px 0 12px',
                }}
              >
                {c.value}
              </div>
              <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>{c.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '32px', background: '#0F172A', borderTop: '1px solid #1E293B' }}>
          <div style={{ ...mono('#475569'), marginBottom: 20 }}>
            Structured Intelligence Stream
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {intel.map((it) => (
              <span
                key={it}
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 100,
                  padding: '8px 16px',
                  fontSize: 12,
                  color: '#94A3B8',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                }}
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

// ─── USE CASES ────────────────────────────────────────────────────────────
function UseCases() {
  const cases = [
    { icon: Phone, title: 'After-hours capture', body: 'Inbound between 7pm–9am gets a real conversation, not voicemail.' },
    { icon: Users, title: 'ISA support / replacement', body: 'Cover first-touch volume without growing headcount.' },
    { icon: Compass, title: 'Lead qualification', body: 'Agents inherit intent, budget, and timeline — not just a name.' },
    { icon: Activity, title: 'Handoff visibility', body: 'Who responded, when, what was said, what was booked.' },
    { icon: Database, title: 'CRM hygiene', body: 'Status tied to events, not subjective tags. Reports stop lying.' },
    { icon: FileSearch, title: 'Weekly intelligence', body: 'Top objections, where leads stall, what to do about it.' },
  ];

  return (
    <Section borderTop>
      <div style={{ maxWidth: 840, marginBottom: 56 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Use cases</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            margin: '18px 0 20px',
            lineHeight: 1.1,
          }}
        >
          What PAS controls, in operator terms.
        </motion.h2>
      </div>

      <div
        className="grid-cols-responsive"
        style={{
          gap: 24,
        }}
      >
        {cases.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              {...fadeUp(0.05 * i)}
              style={{
                background: '#fff',
                border: '1.5px solid #E5E8F0',
                borderRadius: 24,
                padding: 32,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
                transition: 'all 0.3s ease',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(91, 63, 212, 0.06)',
                  color: '#5B3FD4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <Icon size={20} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#0F172A',
                    margin: '0 0 10px',
                  }}
                >
                  {c.title}
                </h3>
                <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
                  {c.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div {...fadeUp(0.1)} style={{ marginTop: 64, textAlign: 'center' }}>
        <Link to="/#pricing" className="btn-primary" style={{ padding: '16px 32px', borderRadius: 100 }}>
          View tailored pricing <ArrowRight size={20} />
        </Link>
      </motion.div>
    </Section>
  );
}

// ─── FORUM SIGNUP ─────────────────────────────────────────────────────────
function ForumSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'product_forum' }),
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
      <Section background="surface" borderTop>
        <div
          style={{
            background: '#ECFDF5',
            border: '1.5px solid #A7F3D0',
            borderRadius: 24,
            padding: '48px 24px',
            textAlign: 'center',
            maxWidth: 800,
            margin: '0 auto',
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
            <CheckCircle2 size={28} color="#0D9E6E" />
          </div>
          <h3
            style={{
              color: '#065F46',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            Welcome to the forum.
          </h3>
          <p style={{ color: '#065F46', fontSize: 16, margin: '8px 0 0', fontWeight: 500 }}>
            We'll notify you as soon as a slot opens for your brokerage.<br/>
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
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          background: '#fff',
          padding: 'clamp(48px, 10vw, 80px) clamp(24px, 5vw, 48px)',
          borderRadius: 32,
          border: '1.5px solid #E5E8F0',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <motion.div {...fadeUp(0)}><Eyebrow>Join the forum</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            margin: '18px 0 20px',
            lineHeight: 1.05,
            fontWeight: 800,
          }}
        >
          Early access is limited.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ marginBottom: 40, maxWidth: 640, margin: '0 auto 40px' }}
        >
          We are currently onboarding brokerages in cohorts to ensure high-touch implementation.
          Join the forum to secure your spot.
        </motion.p>

        <motion.form
          {...fadeUp(0.15)}
          onSubmit={submit}
          style={{
            display: 'flex',
            gap: 12,
            maxWidth: 540,
            margin: '0 auto',
            flexWrap: 'wrap',
            justifyContent: 'center',
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
              background: '#F8F9FA',
              border: '1.5px solid #E5E8F0',
              borderRadius: 100,
              padding: '16px 28px',
              fontSize: 15.5,
              color: '#0F172A',
              outline: 'none',
              transition: 'all 0.2s ease',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 600,
            }}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary"
            style={{ padding: '16px 32px', fontSize: 15.5, borderRadius: 100 }}
          >
            {status === 'loading' ? 'Joining...' : 'Join the forum'} <ArrowRight size={18} />
          </button>
        </motion.form>
        {status === 'error' && (
          <p style={{ color: '#DC2626', fontSize: 14, marginTop: 16, fontWeight: 600 }}>
            Something went wrong. Please try again or email hello@orvnlabs.com.
          </p>
        )}
        <p style={{ color: '#94A3B8', fontSize: 13, marginTop: 24, fontWeight: 500 }}>
          Check your spam folder if you don't see our welcome email in 5 minutes.
        </p>
      </div>
    </Section>
  );
}

// ─── BROKERAGE MEMORY · PAS BRAIN (C4) ───────────────────────────────────────
function BrainMemory() {
  return (
    <Section borderTop>
      <div className="grid-cols-2-responsive" style={{ alignItems: 'start', gap: 'clamp(32px, 5vw, 56px)' }}>
        <div>
          <motion.div {...fadeUp(0)}><Eyebrow>Brokerage memory · PAS Brain</Eyebrow></motion.div>
          <motion.h2
            {...fadeUp(0.05)}
            className="h-section"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '18px 0 0', lineHeight: 1.1 }}
          >
            Your brokerage doesn’t have a memory. It has a dozen people who can leave.
          </motion.h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <motion.div
            {...fadeUp(0.05)}
            style={{ background: '#F8FAFC', border: '1.5px solid #E5E8F0', borderRadius: 20, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#FEF2F2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-xs)' }}>
              <Users size={20} />
            </div>
            <p style={{ fontSize: 15, color: '#0F172A', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
              By default, what your brokerage knows lives in individual heads, inboxes, call logs,
              and a CRM nobody fully updates. When someone leaves, that knowledge leaves with them —
              and the operation resets.
            </p>
          </motion.div>
          <motion.div
            {...fadeUp(0.1)}
            style={{ background: '#F8FAFC', border: '1.5px solid #E5E8F0', borderRadius: 20, padding: 24, display: 'flex', gap: 20, alignItems: 'flex-start' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#F0EEFF', color: '#5B3FD4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-xs)' }}>
              <Database size={20} />
            </div>
            <p style={{ fontSize: 15, color: '#0F172A', lineHeight: 1.7, margin: 0, fontWeight: 500 }}>
              PAS preserves what happened across the first-contact layer: every lead, every response
              attempt, every outcome — held in the operation, not in a person. When people leave, the
              operational record stays.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ─── OPERATIONAL VISIBILITY (C5) ─────────────────────────────────────────────
function OperationalVisibility() {
  const items = [
    'When the lead arrived',
    'Whether a response was attempted, and how fast',
    'The conversation outcome',
    'The qualification result',
    'Who it was routed to',
    'Whether it was booked',
    'The follow-up state',
    'If it didn’t convert, the reason it was lost, went cold, or stayed unresponsive',
  ];
  return (
    <Section borderTop>
      <div style={{ maxWidth: 840, marginBottom: 40 }}>
        <motion.div {...fadeUp(0)}><Eyebrow>Operational visibility</Eyebrow></motion.div>
        <motion.h2
          {...fadeUp(0.05)}
          className="h-section"
          style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '18px 0 20px', lineHeight: 1.1 }}
        >
          Operational visibility is not a list of what people say they did.
        </motion.h2>
        <motion.p
          {...fadeUp(0.1)}
          className="lead"
          style={{ fontSize: 'clamp(17px, 1.8vw, 19px)', color: '#475569' }}
        >
          Real visibility is being able to see what actually happened to every lead — not
          self-reported activity. For each inbound lead, PAS is built to show:
        </motion.p>
      </div>
      <div className="grid-cols-responsive" style={{ gap: 16 }}>
        {items.map((it, i) => (
          <motion.div
            key={it}
            {...fadeUp(0.04 * i)}
            style={{ background: '#F8FAFC', border: '1.5px solid #E5E8F0', borderRadius: 20, padding: 20, display: 'flex', gap: 14, alignItems: 'flex-start' }}
          >
            <Eye size={18} color="#5B3FD4" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 14, color: '#0F172A', lineHeight: 1.55, fontWeight: 500 }}>{it}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default function PAS() {
  useDocumentMeta({
    title: 'PAS — Performative AI Superstaff for Real Estate Brokerages',
    description: 'Explore PAS, the operating layer that controls the gap between inquiry and qualified appointment. Automate lead qualification, routing, and booking with high-fidelity state tracking.',
    path: '/pas',
    schema: {
      '@type': 'Service',
      'name': 'Performative AI Superstaff (PAS)',
      'serviceType': 'Real Estate Lead Management Infrastructure',
      'provider': {
        '@type': 'Organization',
        'name': 'ORVN Labs'
      },
      'description': 'AI infrastructure that answers, qualifies, routes, and books inbound leads for real estate brokerages.'
    }
  });

  return (
    <PageWrapper>
      <Hero />
      <BrandHierarchy />
      <WhatPASControls />
      <HowPASWorks />
      <Capabilities />
      <ProductProof />
      <BrainMemory />
      <ControlRoom />
      <OperationalVisibility />
      <UseCases />
      <ForumSignup />
    </PageWrapper>
  );
}
