import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Calendar, FileText, ArrowRightCircle, Shield, Clock, BarChart2, Zap } from 'lucide-react';
import PasHeroIllustration from './PasHeroIllustration';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
});

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const itemFade = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } },
};

export default function HeroRedesigned() {
  return (
    <section
      style={{
        position: 'relative',
        paddingTop: 'clamp(100px, 14vw, 180px)',
        paddingBottom: 'clamp(60px, 10vw, 120px)',
        background: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90vw',
          height: '700px',
          background: 'radial-gradient(ellipse at center, rgba(91, 63, 212, 0.05) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Grid pattern */}
      <div
        className="hero-grid-bg"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-page" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}
        >
          {/* LEFT: Copy */}
          <div>
            <motion.div {...fadeUp(0)}>
              <span
                className="pill"
                style={{ marginBottom: 28 }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--primary)',
                    boxShadow: '0 0 8px rgba(91, 63, 212, 0.4)',
                  }}
                />
                ORVN Labs · real estate brokerage infrastructure
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.06)}
              className="h-display-2"
              style={{ marginBottom: 24, lineHeight: 1.08 }}
            >
              Control the first-contact layer
              <br />
              <span
                style={{
                  color: 'var(--primary)',
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                before delay kills conversion.
              </span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.12)}
              className="lead-2"
              style={{ maxWidth: 600, marginBottom: 40 }}
            >
              ORVN Labs builds brokerage intelligence infrastructure.{' '}
              <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>PAS</strong>, our flagship system,
              answers, qualifies, routes, books, and logs inbound leads — before human delay turns
              intent cold.
            </motion.p>

            <motion.div
              {...fadeUp(0.18)}
              style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 28 }}
            >
              <Link to="/calculators/leakage" className="btn-secondary">
                Run your lead leakage score <ArrowRight size={16} />
              </Link>
              <Link to="/pas" className="btn-primary">
                Explore PAS <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.p
              {...fadeUp(0.24)}
              className="label-mono"
              style={{ maxWidth: 520, lineHeight: 1.6 }}
            >
              ✦ Built for brokerage owners, team leads, and operators who cannot afford CRM graveyards.
            </motion.p>
          </div>

          {/* RIGHT: Illustration */}
          <motion.div
            {...fadeUp(0.2)}
            style={{ display: 'none' }}
            className="hero-illustration-wrap"
          >
            <div
              className="card"
              style={{
                padding: 'clamp(16px, 3vw, 32px)',
                borderRadius: 24,
              }}
            >
              <PasHeroIllustration />
            </div>
          </motion.div>
        </div>

        {/* Metrics bar — refined with icons and subtle separators */}
        <motion.div
          {...fadeUp(0.3)}
          style={{
            marginTop: 'clamp(48px, 6vw, 80px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: 1,
            background: 'var(--line)',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {[
            { icon: Phone, label: 'Inbound', value: 'LEAD', color: 'var(--primary)' },
            { icon: Shield, label: 'PAS', value: 'QUALIFY', color: 'var(--primary)' },
            { icon: Calendar, label: 'Booked', value: '✓ ROUTE', color: 'var(--ok)' },
            { icon: BarChart2, label: '94%', value: 'CONTACT RATE', color: 'var(--primary)' },
            { icon: Clock, label: '24/7', value: 'AVAILABILITY', color: 'var(--ok)' },
            { icon: Zap, label: '0', value: 'LEADS LOST', color: 'var(--primary)' },
          ].map((item) => (
            <motion.div
              key={item.label + item.value}
              variants={itemFade}
              style={{
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                background: '#fff',
              }}
            >
              <item.icon size={16} style={{ color: item.color, opacity: 0.7 }} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 18,
                color: 'var(--ink)',
                lineHeight: 1.1,
              }}>
                {item.label}
              </span>
              <span className="label-mono" style={{ fontSize: 9, color: 'var(--ink-dim)' }}>
                {item.value}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Flow diagram — cleaner with connecting lines */}
        <motion.div
          {...fadeUp(0.4)}
          style={{
            marginTop: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 8,
            padding: '20px 16px',
          }}
        >
          {['Lead inquiry', 'PAS', 'Qualified', 'Routed / Booked', 'Logged'].map((step, i) => (
            <React.Fragment key={step}>
              <span
                style={{
                  background: i === 1 ? 'var(--primary)' : 'var(--primary-pale)',
                  color: i === 1 ? '#fff' : 'var(--primary)',
                  padding: '8px 18px',
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                  border: i === 1 ? 'none' : '1px solid rgba(91, 63, 212, 0.1)',
                }}
              >
                {step}
              </span>
              {i < 4 && (
                <div style={{ width: 20, height: 1, background: 'var(--line-strong)', flexShrink: 0 }} />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-illustration-wrap {
            display: block !important;
          }
          section > .container-page > div:first-child {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
