import Image from 'next/image';
import styles from './site.module.css';
const partners = [{ name: 'UNICEF', image: '/assets/unicef.png' }, { name: 'Somaliland Development Fund', image: '/assets/sdf.png' }, { name: 'Ministry of Water Resources', image: '/assets/mowr.png' }, { name: 'Borama Municipality', image: '/assets/dawladahoose.png' }];
export default function Partners() {
  return <section className={styles.partners}><div className={styles.container}><div className={styles.partnerHeading}><h2>Progress through partnership.</h2><p>Working with public institutions and development partners to strengthen water services in Borama.</p></div><ul className={styles.partnerLogos}>{partners.map(partner => <li key={partner.name}><Image src={partner.image} alt="" width={160} height={100} sizes="160px" /><span>{partner.name}</span></li>)}</ul></div></section>;
}
