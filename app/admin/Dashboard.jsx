'use client';
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import { loadDashboard, saveContent, deleteContent, loadPostComments, moderateComment } from './actions';

const blank = () => ({ id: null, version: 0, title: '', description: '', content: '', author: 'Shaba', type: 'blog', status: 'draft', image: null });
const inputClass = 'w-full rounded-lg border border-gray-300 bg-white p-3 outline-green-700';
const buttonClass = 'rounded-lg bg-green-900 px-5 py-3 text-white disabled:opacity-50 cursor-pointer';
async function result(promise) {
  const response = await promise;
  if (response.error) throw new Error(response.error);
  return response.data;
}
function editable(post) {
  return { id: String(post.id), version: post.version || 0, ...post.attributes,
    type: post.type || (post.attributes.categories.data[0]?.attributes.category === 'projects' ? 'project' : 'blog'),
    status: post.status || 'published', image: post.attributes.postimg.data.attributes };
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
  function choose(post) {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return;
    setDraft(post ? editable(post) : blank()); setDirty(false); setPreview(false); setError(''); setNotice(''); setComments([]);
  }
  async function refresh() {
    if (dirty && !window.confirm('Reload and discard your unsaved changes?')) return;
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
    if (!window.confirm('Delete this content? This cannot be undone. Its uploaded image will remain in B2.')) return;
    setBusy(true); setError('');
    try {
      await result(deleteContent(draft.id, draft.version));
      setData(current => ({ ...current, posts: current.posts.filter(item => String(item.id) !== draft.id) }));
      setDraft(blank()); setDirty(false); setComments([]); setNotice('Content deleted.');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function viewComments() {
    setBusy(true); setError('');
    try { setComments(await result(loadPostComments(draft.id))); setNotice('Comments loaded.'); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  async function removeComment(comment) {
    if (!window.confirm('Delete this comment?')) return;
    setBusy(true); setError('');
    try { await result(moderateComment(draft.id, comment.sk)); setComments(items => items.filter(item => item.sk !== comment.sk)); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-[#f5f7f5] text-gray-900">
    <header className="bg-green-950 text-white px-6 py-5 flex flex-wrap items-center justify-between gap-4">
      <div><p className="text-sm text-green-200">SHABA / ADMIN</p><h1 className="text-2xl font-bold">Content dashboard</h1></div>
      <div className="flex items-center gap-4 text-sm"><span>{email}</span><button disabled={busy} onClick={() => { if (!dirty || window.confirm('Sign out and discard unsaved changes?')) signOut({ callbackUrl: '/admin/login' }); }} className="border border-green-300 rounded-lg px-4 py-2 cursor-pointer">Sign out</button></div>
    </header>
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <nav className="flex gap-3 mb-6" aria-label="Admin sections">
        {['content', 'messages'].map(item => <button key={item} onClick={() => setTab(item)} className={`px-5 py-3 rounded-lg cursor-pointer ${tab === item ? 'bg-green-900 text-white' : 'bg-white border border-gray-300'}`}>{item === 'content' ? 'Publications & projects' : `Contact messages (${data.contacts.length})`}</button>)}
        <button disabled={busy || loading} onClick={refresh} className="ml-auto text-green-900 underline cursor-pointer disabled:opacity-50">Refresh dashboard</button>
      </nav>
      {error && <p role="alert" className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-4">{error}</p>}
      {notice && <p role="status" className="bg-green-100 text-green-900 rounded-lg p-4 mb-4">{notice}</p>}
      {loading ? <p role="status">Loading your dashboard…</p> : tab === 'messages' ? <section className="space-y-4">
        <h2 className="text-xl font-bold">Contact inbox</h2>
        {!data.contacts.length && <p className="bg-white rounded-xl p-6">No messages yet.</p>}
        {data.contacts.map(contact => <article key={contact.sk} className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="font-bold">{contact.name}</h3><p className="text-sm text-gray-600">{contact.email} {contact.phone && ` · ${contact.phone}`}</p>
          <p className="text-sm text-gray-500 mt-1">{contact.sk.split('#')[0]}</p><p className="mt-4 whitespace-pre-wrap break-words">{contact.message}</p>
        </article>)}
      </section> : <div className="grid lg:grid-cols-[300px_1fr] gap-6">
        <aside className="bg-white border border-gray-200 rounded-xl p-5 h-fit">
          <button disabled={busy} onClick={() => choose(null)} className={`${buttonClass} w-full`}>+ New content</button>
          <h2 className="font-bold mt-6 mb-3">Your content ({data.posts.length})</h2>
          {!data.posts.length && <p className="text-sm text-gray-500">Create your first post, article, or project.</p>}
          <ul className="space-y-2">{data.posts.map(post => <li key={post.id}><button disabled={busy} onClick={() => choose(post)} className={`w-full text-left p-3 rounded-lg border cursor-pointer ${String(post.id) === draft.id ? 'border-green-800 bg-green-50' : 'border-gray-200'}`}>
            <span className="block font-semibold break-words">{post.attributes.title}</span><span className="text-xs uppercase text-gray-500">{post.type || 'blog'} · {post.status || 'published'}</span>
          </button></li>)}</ul>
        </aside>
        <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-8">
          <div className="flex justify-between items-center gap-4 mb-6"><h2 className="text-2xl font-bold">{draft.id ? 'Edit content' : 'Create content'}</h2><button type="button" onClick={() => setPreview(value => !value)} className="text-green-900 underline cursor-pointer">{preview ? 'Back to editor' : 'Preview'}</button></div>
          {preview ? <article>
            <p className="text-sm text-gray-500 mb-3">Preview · {draft.status}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {draft.image && <img src={draft.image.url} alt="Cover preview" className="w-full max-h-96 object-cover rounded-lg mb-6" />}
            <h1 className="text-3xl font-bold mb-3">{draft.title || 'Untitled'}</h1><p className="text-gray-500 mb-6">{draft.author}</p>
            <p className="mb-6">{draft.description}</p><div className="prose max-w-none"><ReactMarkdown>{draft.content}</ReactMarkdown></div>
          </article> : <form onSubmit={save} className="space-y-5">
            <fieldset disabled={busy} className="space-y-5 disabled:opacity-60">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block">Content type<select value={draft.type} onChange={e => change('type', e.target.value)} className={`${inputClass} mt-2`}><option value="blog">Blog post</option><option value="article">Article / publication</option><option value="project">Project</option></select></label>
                <label className="block">Visibility<select value={draft.status} onChange={e => change('status', e.target.value)} className={`${inputClass} mt-2`}><option value="draft">Draft — admin only</option><option value="published">Published — visible to visitors</option></select></label>
              </div>
              <label className="block">Title<input required maxLength={200} value={draft.title} onChange={e => change('title', e.target.value)} className={`${inputClass} mt-2`} /></label>
              <label className="block">Author<input required maxLength={100} value={draft.author} onChange={e => change('author', e.target.value)} className={`${inputClass} mt-2`} /></label>
              <label className="block">Short description<textarea required maxLength={1000} rows={3} value={draft.description} onChange={e => change('description', e.target.value)} className={`${inputClass} mt-2`} /></label>
              <div><label htmlFor="cover" className="block">Cover image</label><p className="text-sm text-gray-500 mt-1 mb-3">JPEG, PNG, or WebP. Maximum 3 MB. Uploaded images are public; draft text stays private.</p><input id="cover" type="file" accept="image/jpeg,image/png,image/webp" onChange={upload} className="w-full text-sm file:bg-green-100 file:text-green-950 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-3" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {draft.image && <img src={draft.image.url} alt="Cover image" className="max-h-48 rounded-lg mt-4" />}
              </div>
              <label className="block">Body <span className="text-sm text-gray-500">(Markdown)</span><textarea required maxLength={60000} rows={14} value={draft.content} onChange={e => change('content', e.target.value)} className={`${inputClass} mt-2 font-mono text-sm`} placeholder="Write your content here. Use ## for headings and **text** for bold." /></label>
              <div className="flex flex-wrap items-center gap-4"><button disabled={!draft.image} className={buttonClass}>{busy ? 'Working…' : draft.status === 'published' ? 'Save & publish' : 'Save draft'}</button>{draft.id && <button type="button" onClick={remove} className="text-red-700 underline cursor-pointer">Delete content</button>}<span className="text-sm text-gray-500">{dirty ? 'Unsaved changes' : 'No unsaved changes'}</span></div>
              {!draft.image && <p className="text-sm text-gray-500">Upload a cover image before saving.</p>}
            </fieldset>
          </form>}
          {draft.id && <section className="border-t border-gray-200 mt-8 pt-6">
            <button disabled={busy} onClick={viewComments} className="text-green-900 underline cursor-pointer">Load comments for this content</button>
            {comments.map(comment => <article key={comment.sk} className="border rounded-lg p-4 mt-4"><p className="font-semibold">{comment.name}</p><p className="text-sm text-gray-500">{comment.email} · {comment.createdAt}</p><p className="whitespace-pre-wrap my-3">{comment.comment}</p><button disabled={busy} onClick={() => removeComment(comment)} className="text-red-700 underline cursor-pointer">Delete comment</button></article>)}
          </section>}
        </section>
      </div>}
    </div>
  </main>;
}
