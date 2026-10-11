import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { contentType, contentDate, typeLabel } from '@/lib/public/content.mjs';
import SiteShell from './SiteShell';
import PublicForm from './PublicForm';
import styles from './site.module.css';
export default function ArticlePage({ post }) {
  const attributes = post.attributes;
  const type = contentType(post);
  const project = type === 'project';
  const image = attributes.postimg?.data?.attributes;
  const date = contentDate(attributes.publishedAt);
  return <SiteShell activePath={project ? '/Projects' : '/Blog'}><article>
    <header className={styles.articleHeader}><div className={styles.container}><Link href={project ? '/Projects' : '/Blog'} className={styles.backLink}><ArrowLeft size={17} aria-hidden="true" />{project ? 'All projects' : 'Publications & news'}</Link><div className={styles.articleMeta}><span>{typeLabel(type)}</span>{date && <time dateTime={attributes.publishedAt}>{date}</time>}</div><h1>{attributes.title}</h1><p className={styles.articleDescription}>{attributes.description}</p><p className={styles.author}>By {attributes.author || 'Shaba'}</p></div></header>
    {image?.url && <div className={`${styles.container} ${styles.articleImage}`}><Image src={image.url} alt={`Cover for ${attributes.title}`} width={image.width || 1200} height={image.height || 800} sizes="(max-width: 1200px) 100vw, 1200px" priority /></div>}
    <div className={`${styles.container} ${styles.articleLayout}`}><div className={styles.articleBody}><ReactMarkdown components={{ h1: ({ children }) => <h2>{children}</h2> }}>{attributes.content}</ReactMarkdown></div><aside className={styles.articleAside}><h2>{project ? 'Discuss this project' : 'Continue the conversation'}</h2><p>{project ? 'Contact Shaba for more information about this work or to discuss collaboration.' : 'Have a question about this publication? Get in touch with our team.'}</p><Link href="/Contact?enquiry=partnership" className={styles.textLink}>Contact Shaba<ArrowUpRight size={18} aria-hidden="true" /></Link></aside></div>
  </article><section className={styles.commentSection}><div className={styles.readingContainer}><h2>Join the conversation.</h2><p>Leave a comment about this {project ? 'project' : 'publication'}.</p><PublicForm postId={String(post.id)} /></div></section></SiteShell>;
}
