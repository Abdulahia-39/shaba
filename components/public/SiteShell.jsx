import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Phone, Mail } from 'lucide-react';
import SiteHeader from './SiteHeader';
import styles from './site.module.css';
export function ContactInvitation() {
  return <section className={styles.invitation}><div className={styles.container}><div><p>Let’s talk</p><h2>Here for our community.<br />Ready to work together.</h2></div><Link href="/Contact" className={styles.buttonLight}>Contact Shaba<ArrowUpRight size={20} aria-hidden="true" /></Link></div></section>;
}
export function PageIntro({ label, title, description, children }) {
  return <section className={styles.pageIntro}><div className={styles.container}><p className={styles.eyebrow}>{label}</p><h1>{title}</h1><p className={styles.introDescription}>{description}</p>{children}</div></section>;
}
export default function SiteShell({ children, invitation = true, activePath }) {
  return <div className={styles.site}><SiteHeader activePath={activePath} /><main id="site-main" tabIndex={-1}>{children}</main>{invitation && <ContactInvitation />}<footer className={styles.footer}><div className={`${styles.container} ${styles.footerGrid}`}>
    <div className={styles.footerIdentity}><Link href="/" className={styles.brand}><Image src="/assets/shabalogo.png" alt="" width={56} height={56} /><span><strong>Shaba</strong><small>Water Company</small></span></Link><p>Water services for Borama.<br />A commitment to our community.</p><p className={styles.companyName}>Shirkada adeegyada bulshada Awdal</p></div>
    <div><h2>Explore</h2><Link href="/About">About Shaba</Link><Link href="/#services">Our services</Link><Link href="/Projects">Projects</Link><Link href="/Blog">Publications & news</Link></div>
    <div><h2>Get in touch</h2><a href="tel:+252634456478"><Phone size={15} aria-hidden="true" />+252 63 4456478</a><a href="tel:+252634456522">+252 63 4456522</a><a href="mailto:shabaco@gmail.com"><Mail size={15} aria-hidden="true" />shabaco@gmail.com</a><p>Near Borama regional hospital<br />Borama, Awdal, Somaliland</p></div>
    <div><h2>Stay connected</h2><a href="https://www.facebook.com/profile.php?id=61573011164129" target="_blank" rel="noreferrer">Facebook<ArrowUpRight size={15} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a><a href="https://www.linkedin.com/company/shaba-water-company/" target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={15} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a></div>
  </div><div className={`${styles.container} ${styles.footerBottom}`}><p>© {new Date().getFullYear()} Shaba Water Company.</p><span>Borama, Somaliland</span></div></footer></div>;
}
