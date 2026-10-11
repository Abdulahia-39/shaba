import { BlogProvider } from '@/contexts/BlogContext';
import SiteShell, { PageIntro } from './SiteShell';
import ContentCollection from './ContentCollection';
import styles from './site.module.css';
export default function CollectionPage({ projects = false }) {
  return <SiteShell><PageIntro label={projects ? 'Our work' : 'From Shaba'} title={projects ? 'Infrastructure for a growing community.' : 'Publications & news.'} description={projects ? 'Explore the projects, proposals, and infrastructure stories published by our team.' : 'Updates from our work, perspectives from our team, and publications to explore.'} /><section className={styles.collectionSection}><div className={styles.container}><BlogProvider><ContentCollection kind={projects ? 'projects' : 'publications'} /></BlogProvider></div></section></SiteShell>;
}
