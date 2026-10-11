import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Droplets, MessagesSquare, Waypoints } from 'lucide-react';
import { BlogProvider } from '@/contexts/BlogContext';
import SiteShell from './SiteShell';
import ContentCollection from './ContentCollection';
import Partners from './Partners';
import styles from './site.module.css';
export default function HomePage() {
  return <SiteShell><BlogProvider>
    <section className={styles.hero}><div className={`${styles.container} ${styles.heroGrid}`}><div className={styles.heroCopy}><p className={styles.location}><span />Borama, Somaliland</p><h1>Water services for Borama. Infrastructure for its future.</h1><p className={styles.heroDescription}>Connecting our community through water services, local expertise, and lasting partnerships.</p><div className={styles.actions}><Link href="/Projects" className={styles.button}>Explore our projects<ArrowUpRight size={19} aria-hidden="true" /></Link><Link href="/Contact" className={styles.textLink}>Contact our team<ArrowUpRight size={19} aria-hidden="true" /></Link></div><p className={styles.heroFootnote}>Shirkada adeegyada bulshada Awdal</p></div><figure className={styles.heroImage}><Image src="/assets/shabapics1.jpg" alt="Workers inspecting pipework beside a stone infrastructure wall" fill priority sizes="(max-width: 899px) 100vw, 600px" /><figcaption><span>On the ground.<br /><strong>For our community.</strong></span><Droplets size={34} strokeWidth={1.5} aria-hidden="true" /></figcaption></figure></div></section>
    <section id="services" className={`${styles.section} ${styles.services}`}><div className={styles.container}><div className={styles.sectionHeading}><div><p className={styles.eyebrow}>What we do</p><h2>Water connects everything.</h2></div><p>From everyday enquiries to long-term infrastructure, our work begins with the needs of Borama.</p></div><div className={styles.serviceGrid}>
      <article><Droplets size={29} strokeWidth={1.5} aria-hidden="true" /><h3>Water supply</h3><p>Managing water supply and distribution for Borama’s community.</p><Link href="/Contact?enquiry=service" className={styles.textLink}>Ask about water services<ArrowUpRight size={17} aria-hidden="true" /></Link></article>
      <article><MessagesSquare size={29} strokeWidth={1.5} aria-hidden="true" /><h3>Customer enquiries</h3><p>Speak with our team about your water service, a concern, or a question.</p><Link href="/Contact?enquiry=service" className={styles.textLink}>Get in touch<ArrowUpRight size={17} aria-hidden="true" /></Link></article>
      <article><Waypoints size={29} strokeWidth={1.5} aria-hidden="true" /><h3>Infrastructure & collaboration</h3><p>Working with public bodies and development partners on water infrastructure.</p><Link href="/Projects" className={styles.textLink}>Explore our work<ArrowUpRight size={17} aria-hidden="true" /></Link></article>
    </div></div></section>
    <section className={styles.section}><div className={styles.container}><ContentCollection kind="projects" compact /></div></section>
    <section className={`${styles.section} ${styles.storySection}`}><div className={`${styles.container} ${styles.storyGrid}`}><figure className={styles.storyImage}><Image src="/assets/success.jpg" alt="A concrete infrastructure wall under construction in a dry landscape" fill sizes="(max-width: 899px) 100vw, 600px" /></figure><div className={styles.storyCopy}><p className={styles.eyebrow}>Rooted in Borama</p><h2>A local company.<br />A shared responsibility.</h2><p>Established in 2003, Shaba is a public-private partnership water supply company in Borama, in Somaliland’s Awdal region.</p><p>We bring together the work of a local service provider and collaboration with public institutions and development partners.</p><Link href="/About" className={styles.textLink}>Get to know Shaba<ArrowUpRight size={19} aria-hidden="true" /></Link></div></div></section>
    <Partners />
    <section className={`${styles.section} ${styles.softSection}`}><div className={styles.container}><ContentCollection compact /></div></section>
  </BlogProvider></SiteShell>;
}
