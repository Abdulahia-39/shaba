'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { submitContact } from '@/actions/form-actions';
import { submitComment } from '@/actions/blog-actions';
import styles from './site.module.css';
export default function PublicForm({ postId }) {
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [enquiry, setEnquiry] = useState('general');
  const form = useRef(null);
  const status = useRef(null);
  useEffect(() => {
    if (postId) return;
    const value = new URLSearchParams(window.location.search).get('enquiry');
    if (['service', 'partnership'].includes(value)) setEnquiry(value);
  }, [postId]);
  async function send(event) {
    event.preventDefault(); if (busy) return;
    setBusy(true); setFeedback(null);
    const data = new FormData(event.currentTarget);
    try {
      if (postId) await submitComment(data);
      else { data.set('message', `[${{ general: 'General enquiry', service: 'Water service enquiry', partnership: 'Partnership enquiry' }[enquiry]}]\n${data.get('message')}`); await submitContact(data); }
      form.current.reset();
      setFeedback({ ok: true, text: postId ? 'Your comment has been submitted.' : 'Your message has been sent to Shaba. Thank you for getting in touch.' });
    } catch {
      setFeedback({ ok: false, text: postId ? 'Your comment could not be sent. Please try again.' : 'Your message could not be sent. Try again, or contact us by phone or email.' });
    } finally { setBusy(false); requestAnimationFrame(() => status.current?.focus()); }
  }
  return <form ref={form} onSubmit={send} className={styles.publicForm}>
    {!postId && <label>What can we help with?<select name="enquiry" value={enquiry} onChange={event => setEnquiry(event.target.value)} disabled={busy}><option value="general">General enquiry</option><option value="service">Water service enquiry</option><option value="partnership">Partnership & collaboration</option></select></label>}
    <div className={styles.formRow}><label>Your name <span>Required</span><input name="name" autoComplete="name" required maxLength={100} disabled={busy} /></label><label>Email address <span>Required</span><input type="email" name="email" autoComplete="email" spellCheck={false} required maxLength={254} disabled={busy} /></label></div>
    {!postId && <label>Phone number <span>Optional</span><input type="tel" name="phone" autoComplete="tel" maxLength={40} disabled={busy} /></label>}
    <label>{postId ? 'Your comment' : 'Your message'} <span>Required</span><textarea name={postId ? 'comment' : 'message'} rows={5} required maxLength={postId ? 5000 : 4900} disabled={busy} placeholder={postId ? 'Share your thoughts…' : 'Tell us how we can help…'} /></label>
    {postId && <input type="hidden" name="postId" value={postId} />}
    {postId && <p className={styles.formNote}>Your name and comment will be public. Your email address will not be displayed.</p>}
    <button className={styles.button} disabled={busy}>{busy ? 'Sending…' : postId ? 'Submit comment' : 'Send message'}<ArrowUpRight size={18} aria-hidden="true" /></button>
    {feedback && <div ref={status} tabIndex={-1} role={feedback.ok ? 'status' : 'alert'} className={feedback.ok ? styles.formSuccess : styles.formError}>{feedback.ok && <CheckCircle2 size={20} aria-hidden="true" />}<p>{feedback.text}</p></div>}
  </form>;
}
