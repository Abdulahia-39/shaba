import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { contentType, typeLabel, contentHref, contentDate } from '@/lib/public/content.mjs';
import styles from './site.module.css';
export default function ContentCard({ post }) {
  const attributes = post.attributes;
  const image = attributes.postimg?.data?.attributes;
  const date = contentDate(attributes.publishedAt);
  return <article className={styles.contentCard}>
    <Link href={contentHref(post)} className={styles.cardImage} tabIndex={-1} aria-hidden="true">{image?.url && <Image src={image.url} alt="" fill sizes="(max-width: 699px) 100vw, (max-width: 999px) 50vw, 400px" />}</Link>
    <div className={styles.cardMeta}><span>{typeLabel(contentType(post))}</span>{date && <time dateTime={attributes.publishedAt}>{date}</time>}</div>
    <h3><Link href={contentHref(post)}>{attributes.title}<ArrowUpRight size={19} aria-hidden="true" /></Link></h3><p>{attributes.description}</p>
  </article>;
}
