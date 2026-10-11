import { ArrowUpRight } from 'lucide-react';
import styles from './site.module.css';
const videos = [
  { id: 'AExvlV5mLnI', title: 'Borama City: Meeting the growing needs for Water' },
  { id: 'S4AaVPdW4Qs', title: 'Meeting the water needs of Borama city' },
];
export default function ProjectVideos() {
  return <section className={`${styles.section} ${styles.videoSection}`} aria-labelledby="project-films-title"><div className={styles.container}>
    <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Shaba & Somaliland Development Fund</p><h2 id="project-films-title">Water infrastructure.<br />A closer look.</h2></div><p>Watch two films showcasing Shaba’s collaboration with Somaliland Development Fund to improve Borama’s water infrastructure.</p></div>
    <div className={styles.videoGrid}>{videos.map(video => <figure className={styles.videoFeature} key={video.id}><div className={styles.videoFrame}><iframe src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} width="560" height="315" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div><figcaption><h3>{video.title}</h3><a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer" className={styles.textLink}>Watch on YouTube<ArrowUpRight size={17} aria-hidden="true" /><span className={styles.srOnly}> (opens in a new tab)</span></a></figcaption></figure>)}</div>
  </div></section>;
}
