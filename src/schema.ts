// One JSON-LD @graph per page, the same pattern as getlivewire.com: the organization, the website, the page,
// its breadcrumb and, where a page has them, its FAQ. Stable @ids let search and AI answer engines tie every
// page back to one Flywheel.
import { SITE } from './site';

const ROOT = SITE.url;
const ORG = `${ROOT}#organization`;
const WEBSITE = `${ROOT}#website`;

export interface Faq { q: string; a: string }

export const organization = {
  '@type': 'Organization',
  '@id': ORG,
  name: 'Flywheel',
  url: ROOT,
  logo: { '@type': 'ImageObject', '@id': `${ROOT}#logo`, url: `${ROOT}brand/icon-512.jpg`, width: 512, height: 512, caption: 'Flywheel' },
  image: { '@id': `${ROOT}#logo` },
  slogan: 'Data stays home. Lessons travel. The wheel spins faster.',
  description: SITE.description,
  email: SITE.email,
  address: { '@type': 'PostalAddress', addressLocality: 'Richmond', addressRegion: 'VA', addressCountry: 'US' },
  areaServed: { '@type': 'Country', name: 'United States' },
  audience: { '@type': 'BusinessAudience', audienceType: 'Custom integration (CI) firms: residential and commercial audio video, automation, lighting control and security integrators' },
  knowsAbout: ['Custom integration', 'Home technology integration', 'AI agents', 'AI employees', 'Marketing automation for integrators', 'Outbound sales', 'Service triage', 'System design and proposals', 'Data warehouses', 'QuickBooks', 'Construction permit data'],
  founder: { '@type': 'Person', name: 'Henry Clifford', jobTitle: 'Co-founder' },
};

const PAGE_TYPE: Record<string, string> = { '/about/': 'AboutPage', '/apply/': 'ContactPage' };

interface PageInfo { canonical: string; title: string; description: string; image: string; crumbs: { name: string; url: string }[]; faqs?: Faq[]; extra?: Record<string, unknown>[] }

export function graph(p: PageInfo) {
  const path = new URL(p.canonical).pathname;
  const home = path === '/';
  const pageId = `${p.canonical}#webpage`;
  const items = [{ name: 'Home', url: '/' }, ...(home ? [] : p.crumbs)];
  const nodes: Record<string, unknown>[] = [
    organization,
    { '@type': 'WebSite', '@id': WEBSITE, url: ROOT, name: 'Flywheel', description: SITE.tagline, publisher: { '@id': ORG }, inLanguage: 'en-US' },
    {
      '@type': PAGE_TYPE[path] || 'WebPage', '@id': pageId, url: p.canonical, name: p.title, description: p.description,
      isPartOf: { '@id': WEBSITE }, inLanguage: 'en-US', primaryImageOfPage: { '@type': 'ImageObject', url: p.image },
      breadcrumb: { '@id': `${p.canonical}#breadcrumb` }, ...(home && { about: { '@id': ORG } }),
    },
    {
      '@type': 'BreadcrumbList', '@id': `${p.canonical}#breadcrumb`,
      itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: new URL(c.url, ROOT).href })),
    },
  ];
  if (p.faqs?.length) {
    nodes.push({
      '@type': 'FAQPage', '@id': `${p.canonical}#faq`, isPartOf: { '@id': pageId },
      mainEntity: p.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  if (p.extra) nodes.push(...p.extra);
  return { '@context': 'https://schema.org', '@graph': nodes };
}
