import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';
import PAS from './pages/PAS';
// import Thesis from './pages/Thesis';
import RevenueCalculator from './pages/RevenueCalculator';
import LeakageScorecard from './pages/LeakageScorecard';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import FAQ from './pages/FAQ';
import AdminLogin from './pages/admin/AdminLogin';
import BlogDashboard from './pages/admin/BlogDashboard';
import BlogEditor from './pages/admin/BlogEditor';
import BlogCategories from './pages/admin/BlogCategories';
import BlogTags from './pages/admin/BlogTags';
import BlogSettings from './pages/admin/BlogSettings';
import BlogAuthors from './pages/admin/BlogAuthors';
import BlogComments from './pages/admin/BlogComments';
// import Login from './pages/Login';
import NotFound from './pages/NotFound';

import Privacy from './pages/legal/Privacy';
import Terms from './pages/legal/Terms';
import AIDisclosure from './pages/legal/AIDisclosure';
import DataRetention from './pages/legal/DataRetention';
import AcceptableUse from './pages/legal/AcceptableUse';
import FairHousing from './pages/legal/FairHousing';

function AnimatedRoutes() {
  const location = useLocation();

  // Handle anchor navigation
  React.useEffect(() => {
    const anchors = {
      '/calculate': 'calculate',
      '/pricing': 'pricing',
    };

    const targetId = anchors[location.pathname];
    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pas" element={<PAS />} />
        {/* <Route path="/thesis" element={<Thesis />} /> */}

        {/* Anchor Navigation Redirects to Home */}
        <Route path="/calculate" element={<Home />} />
        <Route path="/pricing" element={<Home />} />

        <Route path="/calculators/revenue" element={<RevenueCalculator />} />
        <Route path="/calculators/leakage" element={<LeakageScorecard />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />

        <Route path="/faq" element={<FAQ />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/blog" element={<BlogDashboard />} />
        <Route path="/admin/blog/categories" element={<BlogCategories />} />
        <Route path="/admin/blog/tags" element={<BlogTags />} />
        <Route path="/admin/blog/settings" element={<BlogSettings />} />
        <Route path="/admin/blog/authors" element={<BlogAuthors />} />
        <Route path="/admin/blog/comments" element={<BlogComments />} />
        <Route path="/admin/blog/create" element={<BlogEditor />} />
        <Route path="/admin/blog/edit/:slug" element={<BlogEditor />} />

        {/* <Route path="/login" element={<Login />} /> */}

        <Route path="/legal/privacy" element={<Privacy />} />
        <Route path="/legal/terms" element={<Terms />} />
        <Route path="/legal/ai-disclosure" element={<AIDisclosure />} />
        <Route path="/legal/data-retention" element={<DataRetention />} />
        <Route path="/legal/acceptable-use" element={<AcceptableUse />} />
        <Route path="/legal/fair-housing" element={<FairHousing />} />

        {/* Short URLs — kept aliases of the canonical longer paths so links shared
            externally (e.g. /scorecard, /test) resolve correctly. Canonical URLs in the
            sitemap and SEO meta still point at /calculators/leakage, /demo, /legal/*. */}
        <Route path="/scorecard" element={<Navigate to="/calculators/leakage" replace />} />
        <Route path="/lead-leakage-scorecard" element={<Navigate to="/calculators/leakage" replace />} />
        <Route path="/test" element={<Navigate to="/pas" replace />} />
        <Route path="/test-pas" element={<Navigate to="/pas" replace />} />
        <Route path="/resources" element={<Blog />} />
        <Route path="/newsletter" element={<Navigate to="/blog" replace />} />
        <Route path="/privacy" element={<Navigate to="/legal/privacy" replace />} />
        <Route path="/terms" element={<Navigate to="/legal/terms" replace />} />
        <Route path="/ai-call-disclosure" element={<Navigate to="/legal/ai-disclosure" replace />} />
        <Route path="/fair-housing" element={<Navigate to="/legal/fair-housing" replace />} />

        {/* Legacy routes from the previous site — redirect rather than break inbound links. */}
        <Route path="/product" element={<Navigate to="/pas" replace />} />
        <Route path="/why-orvn" element={<Navigate to="/pas" replace />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}
