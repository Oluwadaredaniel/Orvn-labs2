import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1], delay },
});

export default function TheInvitation() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'home_cta' }),
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
      <section className="section-y" style={{ background: '#F7F8FB', borderTop: '1px solid #E5E8F0' }}>
        <div className="container-page" style={{ maxWidth: 600 }}>
          <motion.div
            {...fadeUp(0)}
            style={{
              background: '#ECFDF5',
              border: '1.5px solid #A7F3D0',
              borderRadius: 24,
              padding: 'clamp(48px, 8vw, 64px) clamp(24px, 4vw, 40px)',
              textAlign: 'center',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 100,
                background: '#D1FAE5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <CheckCircle2 size={32} color="#0D9E6E" />
            </div>
            <motion.h3
              {...fadeUp(0.05)}
              style={{
                color: '#065F46',
                fontSize: 'clamp(24px, 3vw, 30px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                marginBottom: 12,
              }}
            >
              Welcome to the forum.
            </motion.h3>
            <motion.p
              {...fadeUp(0.1)}
              style={{ color: '#065F46', fontSize: 17, margin: 0, fontWeight: 500, lineHeight: 1.6 }}
            >
              You're in. We'll reach out within one business day.<br />
              <span style={{ opacity: 0.8, fontSize: 14 }}>Check your spam folder if you don't see our welcome email in 5 minutes.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-y-lg" style={{ background: '#fff', borderTop: '1px solid #E5E8F0' }}>
      <div className="container-page" style={{ maxWidth: 900 }}>
        <motion.div
          {...fadeUp(0)}
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
          {/* Subtle background pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
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
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.h2
              {...fadeUp(0)}
              className="h-display-2"
              style={{
                color: '#fff',
                fontSize: 'clamp(36px, 5vw, 56px)',
                margin: '0 0 20px',
                lineHeight: 1.02,
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
                fontSize: 'clamp(16px, 1.8vw, 19px)',
                lineHeight: 1.65,
                margin: '0 auto 40px',
                maxWidth: 620,
                fontWeight: 400,
              }}
            >
              Early access is limited. Join the forum to secure your brokerage's spot in our next cohort.
            </motion.p>

            <motion.form
              {...fadeUp(0.1)}
              onSubmit={submit}
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                justifyContent: 'center',
                maxWidth: 560,
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
                  fontSize: 16.5,
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
                  fontSize: 16.5,
                  fontWeight: 700,
                  borderRadius: 100,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Joining...' : 'Join the forum'} <ArrowRight size={20} />
              </button>
            </motion.form>
            {status === 'error' && (
              <motion.p
                {...fadeUp(0.15)}
                style={{ color: '#FFB2B2', fontSize: 15, marginTop: 16, fontWeight: 600 }}
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
            <motion.p
              {...fadeUp(0.15)}
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, marginTop: 24, fontWeight: 500 }}
            >
              Check your spam folder if you don't see our welcome email in 5 minutes.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}