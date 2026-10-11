'use client';
import { useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import { FileText, FolderOpen, Inbox, Layers, LogOut, RefreshCw, Plus, Search, Eye, Pencil, Trash2, ArrowUpRight, ImagePlus, Check, Menu, X } from 'lucide-react';
import AdminDialog from './AdminDialog';
import styles from './dashboard.module.css';
import { loadDashboard, saveContent, deleteContent, loadPostComments, moderateComment } from './actions';

const blank = () => ({ id: null, version: 0, title: '', description: '', content: '', author: 'Shaba', type: 'blog', status: 'draft', image: null });
const sections = [{ id: 'content', label: 'All content', icon: Layers }, { id: 'publications', label: 'Publications', icon: FileText }, { id: 'reports', label: 'Reports', icon: FileText }, { id: 'projects', label: 'Projects', icon: FolderOpen }, { id: 'messages', label: 'Contact inbox', icon: Inbox }];
const formatDate = value => value ? new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' }).format(new Date(value)) : '';
async function result(promise) {
  const response = await promise;
  if (response.error) throw new Error(response.error);
  return response.data;
}
function editable(post) {
  return { id: String(post.id), version: post.version || 0, ...post.attributes,
    type: post.type || (post.attributes.categories.data[0]?.attributes.category === 'projects' ? 'project' : 'blog'),
    deletionPending: Boolean(post.deletionPending), status: post.status || 'published', image: post.attributes.postimg.data.attributes };
}
export default function Dashboard({ email }) {
  const [data, setData] = useState({ posts: [], contacts: [] });
  const [draft, setDraft] = useState(blank);
  const [tab, setTab] = useState('content');
  const [preview, setPreview] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [mobileNav, setMobileNav] = useState(false);
  const [dialog, setDialog] = useState(null);
  const answer = useRef(null);
  const editorHeading = useRef(null);
  const sidebarRef = useRef(null);
  const menuTrigger = useRef(null);
  useEffect(() => {
    if (!mobileNav) return;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    sidebarRef.current?.querySelector('button')?.focus();
    const keys = event => {
      if (event.key === 'Escape') { setMobileNav(false); return; }
      if (event.key !== 'Tab') return;
      const controls = [...sidebarRef.current.querySelectorAll('button:not(:disabled), a[href]')];
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    const resize = () => { if (window.innerWidth >= 960) setMobileNav(false); };
    document.addEventListener('keydown', keys); window.addEventListener('resize', resize);
    return () => { document.body.style.overflow = overflow; document.removeEventListener('keydown', keys); window.removeEventListener('resize', resize); previous?.focus(); };
  }, [mobileNav]);
  function ask(options) { return new Promise(resolve => { answer.current = resolve; setDialog(options); }); }
  function closeDialog(value) { setDialog(null); answer.current?.(value); answer.current = null; }
  useEffect(() => { if (error) setDialog({ title: 'Action could not be completed', description: error, danger: true }); }, [error]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => setNotice(''), 6500); return () => clearTimeout(timer); }, [notice]);
  useEffect(() => {
    result(loadDashboard()).then(setData).catch(err => setError(err.message)).finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function change(key, value) { setDraft(current => ({ ...current, [key]: value })); setDirty(true); setNotice(''); }
  async function choose(post) {
    if (dirty && !await ask({ title: 'Discard unsaved changes?', description: 'Your latest edits have not been saved. Discard them to open another item.', confirm: 'Discard changes' })) return;
    setDraft(post ? editable(post) : { ...blank(), type: tab === 'reports' ? 'report' : tab === 'projects' ? 'project' : 'blog' }); setDirty(false); setPreview(false); setError(''); setNotice(''); setComments([]); setCommentsLoaded(false); requestAnimationFrame(() => editorHeading.current?.focus());
  }
  async function refresh() {
    if (dirty && !await ask({ title: 'Refresh the workspace?', description: 'Refreshing will discard your unsaved edits.', confirm: 'Refresh & discard' })) return;
    setBusy(true); setError('');
    try {
      setData(await result(loadDashboard())); setDraft(blank()); setDirty(false); setComments([]); setNotice('Dashboard refreshed. Select content to reopen it.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function upload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true); setError('');
    try {
      const form = new FormData(); form.set('image', file);
      const response = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      change('image', result);
      setNotice('Image uploaded. Save the content to use it.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); event.target.value = ''; }
  }
  async function save(event) {
    event.preventDefault(); setBusy(true); setError(''); setNotice('');
    try {
      const post = await result(saveContent(draft));
      setDraft(editable(post)); setDirty(false);
      setData(current => ({ ...current, posts: [post, ...current.posts.filter(item => String(item.id) !== String(post.id))] }));
      setNotice(post.status === 'published' ? 'Published. Visitors can now read this content.' : 'Draft saved. Only you can view it.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function remove() {
    if (!await ask({ title: draft.deletionPending ? 'Finish deleting content?' : 'Delete this content?', description: `“${draft.title}” and its saved cover will be permanently deleted. A cover used by another item will be kept. This cannot be undone.`, confirm: draft.deletionPending ? 'Retry deletion' : 'Delete content & image', danger: true })) return;
    setBusy(true); setError('');
    try {
      const response = await deleteContent(draft.id, draft.version);
      if (response.pendingPost) {
        setDraft(editable(response.pendingPost)); setDirty(false);
        setData(current => ({ ...current, posts: current.posts.map(post => String(post.id) === draft.id ? response.pendingPost : post) }));
      }
      if (response.error) throw new Error(response.error);
      setData(current => ({ ...current, posts: current.posts.filter(item => String(item.id) !== draft.id) }));
      setDraft(blank()); setDirty(false); setComments([]); setNotice(response.data.imageRetained ? 'Content deleted. Its shared cover is still used by another item.' : 'Content and its cover image deleted.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function viewComments() {
    setBusy(true); setError('');
    try { setComments(await result(loadPostComments(draft.id))); setCommentsLoaded(true); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function removeComment(comment) {
    if (!await ask({ title: 'Delete this comment?', description: 'The comment will be permanently removed from this content.', confirm: 'Delete comment', danger: true })) return;
    setBusy(true); setError('');
    try { await result(moderateComment(draft.id, comment.sk)); setComments(items => items.filter(item => item.sk !== comment.sk)); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function leave() {
    if (dirty && !await ask({ title: 'Sign out?', description: 'Your unsaved edits will be discarded.', confirm: 'Sign out & discard' })) return;
    signOut({ callbackUrl: '/admin/login' });
  }
  async function switchSection(next) {
    if (next === tab) { setMobileNav(false); return; }
    if (dirty && !await ask({ title: 'Discard unsaved changes?', description: 'Save your edits before leaving, or discard them to switch sections.', confirm: 'Discard changes' })) return;
    setDraft({ ...blank(), type: next === 'reports' ? 'report' : next === 'projects' ? 'project' : 'blog' }); setDirty(false); setPreview(false); setComments([]); setCommentsLoaded(false);
    setTab(next); setSearch(''); setStatus('all'); setMobileNav(false);
  }
  const section = sections.find(item => item.id === tab);
  const visiblePosts = data.posts.filter(post => (tab !== 'reports' || post.type === 'report') && (tab !== 'projects' || post.type === 'project') && (tab !== 'publications' || !['project', 'report'].includes(post.type)))
    .filter(post => status === 'all' || (status === 'pending' ? post.deletionPending : !post.deletionPending && (post.status || 'published') === status))
    .filter(post => post.attributes.title.toLowerCase().includes(search.toLowerCase()));
  const published = data.posts.filter(post => !post.deletionPending && (post.status || 'published') === 'published').length;
  const draftCount = data.posts.filter(post => !post.deletionPending && post.status === 'draft').length;
  const badge = post => post.deletionPending ? 'Deletion pending' : post.status || 'published';
  return <div className={styles.workspace}>
    <a href="#admin-main" className={styles.skipLink}>Skip to workspace</a>
    <aside id="admin-navigation" ref={sidebarRef} role={mobileNav ? 'dialog' : undefined} aria-modal={mobileNav || undefined} aria-label="Administration navigation" className={`${styles.sidebar} ${mobileNav ? styles.sidebarOpen : ''}`}>
      <div className={styles.brand}><img src="/assets/shabalogo.png" alt="Shaba" width="56" height="56" /><div><strong>Shaba</strong><span>Administration</span></div><button className={styles.mobileClose} aria-label="Close navigation" onClick={() => setMobileNav(false)}><X aria-hidden="true" size={20} /></button></div>
      <nav aria-label="Admin sections" className={styles.navigation}>{sections.map(({ id, label, icon: Icon }) => <button key={id} disabled={busy} onClick={() => switchSection(id)} aria-current={tab === id ? 'page' : undefined} className={tab === id ? styles.navActive : ''}><Icon aria-hidden="true" size={20} /><span>{label}</span>{id === 'messages' && <span className={styles.count}>{data.contacts.length}</span>}</button>)}</nav>
      <div className={styles.sidebarBottom}><a href="/" target="_blank" rel="noreferrer"><ArrowUpRight aria-hidden="true" size={18} />View website<span className={styles.srOnly}> (opens in a new tab)</span></a><div className={styles.account}><span className={styles.avatar}>A</span><div><strong>Administrator</strong><span>{email}</span></div></div><button disabled={busy} onClick={leave}><LogOut aria-hidden="true" size={18} />Sign out</button></div>
    </aside>
    <main id="admin-main" inert={mobileNav || undefined} className={styles.main}>
      <header className={styles.topbar}><div className={styles.topbarLabel}><button ref={menuTrigger} className={styles.mobileToggle} aria-controls="admin-navigation" aria-label="Open navigation" aria-expanded={mobileNav} onClick={() => setMobileNav(true)}><Menu aria-hidden="true" size={22} /></button><span>Shaba workspace</span></div><span className={styles.privateLabel}>Private administration</span></header>
      <div className={styles.content}>
        <div className={styles.pageHeading}><div><h1>{section.label}</h1><p>{tab === 'messages' ? 'Conversations from your website, in one place.' : 'Keep your community and partners informed.'}</p></div><button className={styles.secondary} disabled={busy || loading} onClick={refresh}><RefreshCw aria-hidden="true" size={17} />{busy ? 'Working…' : 'Refresh'}</button></div>
        {notice && <div role="status" className={styles.toast}><Check aria-hidden="true" size={18} /><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice('')}><X aria-hidden="true" size={16} /></button></div>}
        {error && <div role="alert" className={styles.errorBanner}>{error}<button disabled={busy} onClick={() => { setError(''); refresh(); }}>Try refreshing</button></div>}
        {loading ? <div role="status" className={styles.empty}>Loading your workspace…</div> : tab === 'messages' ? <section className={styles.inbox} aria-label="Contact messages">
          <div className={styles.sectionHeading}><h2>Contact inbox</h2><span>{data.contacts.length} messages</span></div>
          {!data.contacts.length && <div className={styles.empty}><Inbox aria-hidden="true" size={32} /><h3>No messages yet</h3><p>Messages submitted through the website will appear here.</p></div>}
          {data.contacts.map(contact => <article key={contact.sk} className={styles.message}><div className={styles.messageHeader}><div><h3>{contact.name}</h3><a href={`mailto:${contact.email}`}>{contact.email}</a>{contact.phone && <p>{contact.phone}</p>}</div><time dateTime={contact.sk.split('#')[0]}>{formatDate(contact.sk.split('#')[0])}</time></div><p className={styles.messageBody}>{contact.message}</p></article>)}
        </section> : <>
          <div className={styles.summary}><span><strong>{data.posts.length}</strong> total items</span><span><strong>{published}</strong> published</span><span><strong>{draftCount}</strong> drafts</span></div>
          <div className={styles.editorGrid}>
            <section className={styles.library} aria-label="Content library">
              <div className={styles.libraryHeading}><h2>Content library</h2><button disabled={busy} className={styles.primary} onClick={async () => { await choose(null); }}><Plus aria-hidden="true" size={18} />New</button></div>
              <label className={styles.search}><Search aria-hidden="true" size={17} /><span className={styles.srOnly}>Search content titles</span><input type="search" name="search" autoComplete="off" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search content…" /></label>
              <label className={styles.filter}><span>Show</span><select name="status-filter" value={status} onChange={event => setStatus(event.target.value)}><option value="all">All statuses</option><option value="published">Published</option><option value="draft">Drafts</option><option value="pending">Deletion pending</option></select></label>
              <ul className={styles.postList}>{visiblePosts.map(post => <li key={post.id}><button disabled={busy} onClick={() => choose(post)} aria-pressed={String(post.id) === draft.id} className={String(post.id) === draft.id ? styles.postSelected : ''}><span className={styles.postType}>{post.type === 'report' ? 'Report' : post.type === 'project' ? 'Project' : post.type === 'article' ? 'Article' : 'Blog post'}</span><strong>{post.attributes.title}</strong><span className={styles.postMetadata}><span className={post.deletionPending ? styles.pendingBadge : post.status === 'draft' ? styles.draftBadge : styles.publishedBadge}>{badge(post)}</span><time dateTime={post.updatedAt || post.createdAt}>{formatDate(post.updatedAt || post.createdAt)}</time></span></button></li>)}</ul>
              {!visiblePosts.length && <div className={styles.libraryEmpty}><FileText aria-hidden="true" size={28} /><p>{data.posts.length ? 'No content matches these filters.' : 'Your next story starts here.'}</p><span>{data.posts.length ? 'Try another search or status.' : 'Select New to create a post, article, or project.'}</span></div>}
            </section>
            <section className={styles.editor} aria-label="Content editor">
              <div className={styles.editorHeader}><div><span className={styles.editorKicker}>{draft.id ? 'Content editor' : 'New content'}</span><h2 ref={editorHeading} tabIndex={-1}>{draft.id ? draft.title : 'Create something worth sharing'}</h2></div><button type="button" disabled={busy} className={styles.secondary} onClick={() => setPreview(value => !value)}>{preview ? <Pencil aria-hidden="true" size={17} /> : <Eye aria-hidden="true" size={17} />}{preview ? 'Edit' : 'Preview'}</button></div>
              {draft.deletionPending ? <div className={styles.pendingPanel}><h3>Deletion pending</h3><p>This content is hidden from visitors. Its image cleanup or final deletion did not finish. Retry to complete the deletion.</p><button disabled={busy} className={styles.dangerButton} onClick={remove}><Trash2 aria-hidden="true" size={18} />{busy ? 'Deleting…' : 'Retry deletion'}</button></div> : preview ? <article className={styles.preview}>
                <span className={draft.status === 'draft' ? styles.draftBadge : styles.publishedBadge}>{draft.status} preview</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {draft.image && <img src={draft.image.url} alt={`Cover for ${draft.title || 'untitled content'}`} width={draft.image.width} height={draft.image.height} />}
                <h2>{draft.title || 'Untitled'}</h2><p className={styles.muted}>By {draft.author}</p><p className={styles.lead}>{draft.description}</p><div className="prose max-w-none"><ReactMarkdown>{draft.content}</ReactMarkdown></div>
              </article> : <form onSubmit={save} className={styles.form}>
                <fieldset disabled={busy}>
                  <div className={styles.fieldRow}><label>Content type<select name="type" value={draft.type} onChange={event => change('type', event.target.value)}><option value="blog">Blog post</option><option value="article">Article / publication</option><option value="project">Project</option><option value="report">Report</option></select></label><label>Visibility<select name="visibility" value={draft.status} onChange={event => change('status', event.target.value)}><option value="draft">Draft · admin only</option><option value="published">Published · public</option></select></label></div>
                  <label>Title <span className={styles.required}>Required</span><input name="title" autoComplete="off" required maxLength={200} value={draft.title} onChange={event => change('title', event.target.value)} placeholder="Give your content a clear title…" /></label>
                  <label>Author<input name="author" autoComplete="off" required maxLength={100} value={draft.author} onChange={event => change('author', event.target.value)} /></label>
                  <label>Short description <span className={styles.required}>Required</span><textarea name="description" autoComplete="off" required maxLength={1000} rows={3} value={draft.description} onChange={event => change('description', event.target.value)} placeholder="A short introduction for your readers…" /></label>
                  <div className={styles.coverField}><div className={styles.sectionHeading}><label htmlFor="cover">Cover image <span className={styles.required}>Required</span></label>{draft.image && <span>{draft.image.width} × {draft.image.height}</span>}</div><div className={styles.coverUpload}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {draft.image ? <img src={draft.image.url} alt="Selected cover" width={draft.image.width} height={draft.image.height} /> : <ImagePlus aria-hidden="true" size={30} />}
                    <div><label htmlFor="cover">{draft.image ? 'Replace cover image' : 'Upload a cover image'}</label><p>JPEG, PNG or WebP, up to 3 MB.</p><input id="cover" name="cover" type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} aria-describedby="cover-help" /></div>
                  </div><p id="cover-help" className={styles.help}>Uploaded images are public. Draft text stays private.</p></div>
                  <label>Body <span className={styles.required}>Required</span><span className={styles.help}>Use Markdown: ## for headings and **text** for bold.</span><textarea name="body" autoComplete="off" required maxLength={60000} rows={12} value={draft.content} onChange={event => change('content', event.target.value)} placeholder="Tell your story…" className={styles.bodyInput} /></label>
                  <div className={styles.savebar}><div><button className={styles.primary} disabled={!draft.image}><Check aria-hidden="true" size={18} />{busy ? 'Saving…' : draft.status === 'published' ? 'Save & publish' : 'Save draft'}</button><span className={styles.saveState}>{dirty ? 'Unsaved changes' : draft.id ? 'All changes saved' : 'Ready when you are'}</span></div>{draft.id && <button type="button" onClick={remove} className={styles.deleteLink}><Trash2 aria-hidden="true" size={16} />Delete</button>}</div>
                  {!draft.image && <p className={styles.help}>Add a cover image to save this content.</p>}
                </fieldset>
              </form>}
              {draft.id && !draft.deletionPending && <section className={styles.comments}><div className={styles.sectionHeading}><h3>Comments</h3><button disabled={busy} onClick={viewComments} className={styles.textButton}>{commentsLoaded ? 'Refresh comments' : 'Load comments'}</button></div>{commentsLoaded && !comments.length && <p className={styles.help}>No comments on this content yet.</p>}{comments.map(comment => <article key={comment.sk}><div className={styles.messageHeader}><div><strong>{comment.name}</strong><p>{comment.email}</p></div><time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time></div><p className={styles.messageBody}>{comment.comment}</p><button disabled={busy} onClick={() => removeComment(comment)} className={styles.deleteLink}><Trash2 aria-hidden="true" size={16} />Delete comment</button></article>)}</section>}
            </section>
          </div>
        </>}
      </div>
    </main>
    <AdminDialog dialog={dialog} onClose={closeDialog} />
  </div>;
}
