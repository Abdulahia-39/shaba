'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, FileText, FolderOpen } from 'lucide-react';
import BlogContext from '@/contexts/BlogContext';
import { contentType } from '@/lib/public/content.mjs';
import ContentCard from './ContentCard';
import styles from './site.module.css';
export default function ContentCollection({ kind = 'publications', compact = false }) {
  const { blogPosts, loading, error, refresh } = useContext(BlogContext);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  useEffect(() => {
    if (compact) return;
    const read = () => { const params = new URLSearchParams(window.location.search); setQuery(params.get('q') || ''); setFilter(['all', 'blog', 'article'].includes(params.get('type')) ? params.get('type') : 'all'); };
    read(); window.addEventListener('popstate', read); return () => window.removeEventListener('popstate', read);
  }, [compact]);
  function update(nextQuery, nextFilter) {
    setQuery(nextQuery); setFilter(nextFilter);
    const url = new URL(window.location.href);
    if (nextQuery) url.searchParams.set('q', nextQuery); else url.searchParams.delete('q');
    if (nextFilter !== 'all') url.searchParams.set('type', nextFilter); else url.searchParams.delete('type');
    window.history.replaceState(null, '', url);
  }
  const posts = blogPosts.filter(post => kind === 'projects' ? contentType(post) === 'project' : contentType(post) !== 'project');
  const matching = posts.filter(post => (kind === 'projects' || filter === 'all' || contentType(post) === filter) && `${post.attributes.title} ${post.attributes.description}`.toLowerCase().includes(query.toLowerCase()));
  const visible = compact ? matching.slice(0, 3) : matching;
  return <>
    {!compact && <h2 className={styles.srOnly}>Browse {kind}</h2>}
    {compact ? <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>{kind === 'projects' ? 'Our work' : 'From Shaba'}</p><h2>{kind === 'projects' ? 'Infrastructure with a purpose.' : 'News, ideas & publications.'}</h2></div><Link href={kind === 'projects' ? '/Projects' : '/Blog'} className={styles.textLink}>{kind === 'projects' ? 'Explore projects' : 'View publications'}<ArrowUpRight size={19} aria-hidden="true" /></Link></div> : <div className={styles.collectionTools}><label className={styles.search}><Search size={20} aria-hidden="true" /><span className={styles.srOnly}>Search {kind}</span><input name="search" type="search" autoComplete="off" placeholder={`Search ${kind}…`} value={query} onChange={event => update(event.target.value, filter)} /></label>{kind !== 'projects' && <div className={styles.filters} aria-label="Publication type">{[{ id: 'all', label: 'All' }, { id: 'blog', label: 'News' }, { id: 'article', label: 'Publications' }].map(item => <button key={item.id} aria-pressed={filter === item.id} className={filter === item.id ? styles.filterActive : ''} onClick={() => update(query, item.id)}>{item.label}</button>)}</div>}</div>}
    {loading ? <div className={styles.skeletonGrid} role="status" aria-label={`Loading ${kind}`}><span className={styles.srOnly}>Loading {kind}…</span>{[1, 2, 3].map(id => <div key={id} className={styles.skeleton} />)}</div> : error ? <div className={styles.empty} role="alert"><h3>Updates are temporarily unavailable.</h3><p>Please try again, or contact Shaba directly.</p><button className={styles.button} onClick={refresh}>Try again</button></div> : visible.length ? <><p className={styles.srOnly} role="status">{matching.length} {kind} found.</p><div className={styles.contentGrid}>{visible.map(post => <ContentCard post={post} key={post.id} />)}</div></> : <div className={styles.empty}>{kind === 'projects' ? <FolderOpen size={30} aria-hidden="true" /> : <FileText size={30} aria-hidden="true" />}<h3>{posts.length ? 'No matching results.' : kind === 'projects' ? 'Project updates will appear here.' : 'More from Shaba, coming soon.'}</h3><p>{posts.length ? 'Try a different search or category.' : kind === 'projects' ? 'Contact our team to discuss our work and current projects.' : 'Visit again for news and publications from our team.'}</p>{posts.length ? <button className={styles.textLink} onClick={() => update('', 'all')}>Clear filters</button> : <Link className={styles.textLink} href="/Contact">Contact our team<ArrowUpRight size={18} aria-hidden="true" /></Link>}</div>}
  </>;
}
