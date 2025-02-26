import { MIMEType } from 'node:util';
import styles from './NewNote.css?url';
import { useFetcher, useActionData } from '@remix-run/react';

function NewNote() {
  const fetcher = useFetcher<{ message?: string }>();
  const data = fetcher.data;
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <fetcher.Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{isSubmitting ? 'Adding...' : 'Add Note'}</button>
      </div>
    </fetcher.Form>
  );
}

export default NewNote;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}
