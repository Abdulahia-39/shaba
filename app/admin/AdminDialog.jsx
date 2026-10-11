'use client';
import { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import styles from './dashboard.module.css';

export default function AdminDialog({ dialog, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    if (dialog && !ref.current.open) ref.current.showModal();
    if (!dialog && ref.current.open) ref.current.close();
  }, [dialog]);
  return <dialog ref={ref} className={styles.dialog} aria-labelledby="admin-dialog-title" aria-describedby="admin-dialog-description"
    onCancel={event => { event.preventDefault(); onClose(false); }} onClose={() => { if (dialog) onClose(false); }}>
    {dialog && <div>
      <div className={dialog.danger ? styles.dangerIcon : styles.dialogIcon}>{dialog.danger ? <AlertTriangle aria-hidden="true" size={24} /> : <CheckCircle2 aria-hidden="true" size={24} />}</div>
      <h2 id="admin-dialog-title">{dialog.title}</h2>
      <p id="admin-dialog-description">{dialog.description}</p>
      <div className={styles.dialogActions}>
        {dialog.confirm && <button autoFocus className={styles.secondary} onClick={() => onClose(false)}>Cancel</button>}
        <button autoFocus={!dialog.confirm} className={dialog.danger ? styles.dangerButton : styles.primary} onClick={() => onClose(true)}>{dialog.confirm || 'Close'}</button>
      </div>
    </div>}
  </dialog>;
}
