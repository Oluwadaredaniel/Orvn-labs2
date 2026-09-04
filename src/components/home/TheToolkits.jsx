import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ClipboardList, ArrowRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
});

const toolkits = [
  {
    icon: FileText,
    title: 'Lead Qualification Template',
    desc: 'A structured intake flow you can deploy today.',
  },
  {
    icon: ClipboardList,
    title: 'Speed-to-Lead Audit Checklist',
    desc: 'Identify and eliminate every delay in your pipeline.',
  },
];

export default function TheToolkits() {
  return (
    <section className="section-y" style={{ background: 'var(--surface)', borderTop: '1px solid var(--line)' }}>
      <div className="container-page" style={{ maxWidth: 720 }}>
        <motion.div {...fadeUp(0)}>
          <span className="label-mono-primary" style={{ display: 'inline-block', marginBottom: 16 }}>Toolkits & Thesis</span>
        </motion.div>
        <motion.h2 {...fadeUp(0.06)} className="h-section-2" style={{ marginBottom: 12 }}>
          First-Contact Intelligence Framework
        </motion.h2>
        <motion.p {...fadeUp(0.1)} className="lead-2" style={{ marginBottom: 40 }}>
          The philosophy and operational model behind PAS.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {toolkits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                {...fadeUp(0.1 + i * 0.05)}
                style={{
                  background: '#fff',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--primary-pale)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>{item.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--ink-mid)', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div {...fadeUp(0.2)} style={{ marginTop: 28 }}>
          <a href="/blog" style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            Explore all <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
