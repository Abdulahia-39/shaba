import { BlogProvider } from '@/contexts/BlogContext';
import SiteShell, { PageIntro } from './SiteShell';
import ProjectVideos from './ProjectVideos';
import ContentCollection from './ContentCollection';
import styles from './site.module.css';
export default function CollectionPage({ projects = false, reports = false }) {
  return <SiteShell><PageIntro label={reports ? 'Reports' : projects ? 'Our work' : 'From Shaba'} title={reports ? 'Reports & resources.' : projects ? 'Infrastructure for a growing community.' : 'Publications & news.'} description={reports ? 'Explore reports published by Shaba about our work and water services.' : projects ? 'Explore the projects, proposals, and infrastructure stories published by our team.' : 'Updates from our work, perspectives from our team, and publications to explore.'} /><section className={styles.collectionSection}><div className={styles.container}><BlogProvider><ContentCollection kind={reports ? 'reports' : projects ? 'projects' : 'publications'} /></BlogProvider></div></section>{projects && <ProjectVideos />}</SiteShell>;
}
