'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import styles from './site.module.css';
const links = [{ href: '/', label: 'Home' }, { href: '/#services', label: 'Services' }, { href: '/Projects', label: 'Projects' }, { href: '/About', label: 'About Shaba' }, { href: '/Blog', label: 'Publications' }, { href: '/Reports', label: 'Reports' }];
export default function SiteHeader({ activePath }) {
  const currentPath = usePathname();
  const pathname = activePath || currentPath;
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (open && !dialog.current.open) dialog.current.showModal();
    if (!open && dialog.current.open) { dialog.current.close(); trigger.current?.focus(); }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  useEffect(() => { const resize = () => { if (window.innerWidth >= 1000) setOpen(false); }; window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize); }, []);
  const active = href => href !== '/#services' && (href === '/' ? pathname === '/' : pathname.startsWith(href));
  return <>
    <a href="#site-main" className={styles.skip}>Skip to content</a>
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand} aria-label="Shaba Water Company home"><Image src="/assets/shabalogo.png" alt="" width={56} height={56} priority /><span><strong>Shaba</strong><small>Water Company</small></span></Link>
        <nav className={styles.desktopNav} aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={active(link.href) ? 'page' : undefined}>{link.label}</Link>)}</nav>
        <Link href="/Contact" className={`${styles.button} ${styles.headerContact}`}>Contact Shaba<ArrowUpRight size={17} aria-hidden="true" /></Link>
        <button ref={trigger} onClick={() => setOpen(true)} className={styles.menuButton} aria-label="Open navigation" aria-expanded={open} aria-controls="public-navigation"><Menu size={25} aria-hidden="true" /></button>
      </div>
    </header>
    <dialog id="public-navigation" ref={dialog} className={styles.mobileDialog} aria-labelledby="navigation-title" onCancel={event => { event.preventDefault(); setOpen(false); }} onClose={() => setOpen(false)}>
      <div className={styles.mobileHead}><h2 id="navigation-title">Explore Shaba</h2><button onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} aria-hidden="true" /></button></div>
      <nav aria-label="Mobile navigation">{[...links, { href: '/Contact', label: 'Contact Shaba' }].map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} aria-current={active(link.href) ? 'page' : undefined}>{link.label}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}</nav>
      <p>Serving Borama, Awdal, Somaliland.</p>
    </dialog>
  </>;
}
