import React from 'react';

import PageWrapper from '../components/PageWrapper';
import { useDocumentMeta } from '../lib/seo';

import HeroRedesigned from '../components/home/HeroRedesigned';
import TheLeak from '../components/home/TheLeak';
import TheSystem from '../components/home/TheSystem';
import TheTools from '../components/home/TheTools';
import TheMemory from '../components/home/TheMemory';
import ThePricing from '../components/home/ThePricing';
import TheProof from '../components/home/TheProof';
import TheBlog from '../components/home/TheBlog';
import TheToolkits from '../components/home/TheToolkits';
import TheFAQ from '../components/home/TheFAQ';
import TheInvitation from '../components/home/TheInvitation';

export default function Home() {
  useDocumentMeta({
    title: 'ORVN Labs · Real Estate Brokerage Infrastructure',
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
      <HeroRedesigned />
      <TheLeak />
      <TheSystem />
      <TheTools />
      <TheMemory />
      <ThePricing />
      <TheProof />
      <TheBlog />
      <TheToolkits />
      <TheFAQ />
      <TheInvitation />
    </PageWrapper>
  );
}
