import Link from 'next/link';
import SiteShell, { PageIntro } from '@/components/public/SiteShell';
import styles from '@/components/public/site.module.css';
export default function NotFound() {
  return <SiteShell invitation={false}><PageIntro label="Page not found" title="Let’s get you back on track." description="This page may have moved, or the content is no longer available."><div className={styles.actions}><Link href="/" className={styles.button}>Back to home</Link><Link href="/Blog" className={styles.textLink}>Explore publications</Link></div></PageIntro></SiteShell>;
}
