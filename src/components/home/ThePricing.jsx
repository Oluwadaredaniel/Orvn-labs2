import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Database, BarChart3 } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
});

const features = [
  { icon: BarChart3, label: 'VOLUME', value: 'Flex · Per lead · Custom Pricing' },
  { icon: Shield, label: 'SECURE', value: 'ROUTING' },
  { icon: Database, label: 'CRM', value: 'Tailored' },
];

export default function ThePricing() {
  return (
    <section className="section-y" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      <div className="container-page" style={{ maxWidth: 840 }}>
        <motion.div {...fadeUp(0)}>
          <span className="label-mono-primary" style={{ display: 'inline-block', marginBottom: 16 }}>Pricing — early access</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.06)} className="h-section-2" style={{ marginBottom: 16 }}>
          Priced against what leakage already costs you.
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead-2" style={{ marginBottom: 12, maxWidth: 640 }}>
          PAS is priced as infrastructure, not a subscription experiment. We recommend a plan based on actual usage and complexity — not a pre-set tier.
        </motion.p>
        <motion.p {...fadeUp(0.14)} style={{ fontSize: 15, color: 'var(--ink-mid)', marginBottom: 32, maxWidth: 640 }}>
          Tailored solutions for every brokerage. Deployment and setup fees vary based on lead volume, integrations, routing complexity, and onboarding needs. Contact us for a quote based on your numbers.
        </motion.p>

        <motion.div {...fadeUp(0.18)} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 48 }}>
          <a href="/pas" className="btn-primary">Apply for early access <ArrowRight size={16} /></a>
          <a href="mailto:hello@orvnlabs.com" className="btn-secondary">Contact for quote</a>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 24 }}>
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                {...fadeUp(0.2 + i * 0.05)}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  padding: 20,
                  textAlign: 'center',
                }}
              >
                <Icon size={20} color="var(--primary)" style={{ marginBottom: 8 }} />
                <div className="label-mono" style={{ marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: 'var(--ink-mid)', fontWeight: 500 }}>{f.value}</div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...fadeUp(0.3)}
          style={{
            background: '#fff',
            border: '1px solid var(--line)',
            borderRadius: 16,
            padding: 24,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 16,
          }}
        >
          {[
            { label: 'VOLUME', value: '50-500 leads' },
            { label: 'INTEGRATION', value: 'CRM + Routes' },
            { label: 'DEPLOYMENT', value: '1-2 weeks' },
            { label: '', value: 'Scales with you' },
          ].map((item, i) => (
            <div key={i}>
              {item.label && <div className="label-mono" style={{ marginBottom: 4 }}>{item.label}</div>}
              <div style={{ fontSize: 14, color: 'var(--ink)', fontWeight: 600 }}>{item.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
