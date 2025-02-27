import { Link, useLoaderData, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { type ActionFunctionArgs } from '@remix-run/node';
import styles from '~/styles/note-details.css?url';
import { getStoredNotes } from "~/data/notes";
import { NoteType } from '~/data/note_type';

export default function NoteDetailsPage() {
  const note = useLoaderData() as NoteType;

  return (
    <main id="note-details">
      <nav>
        <Link to="/notes">Back to all notes</Link>
      </nav>
      <h1>{note?.title || 'No title'}</h1>
      <p id="note-details-content">{note?.content || 'No content'}</p>
    </main>
  );
}

export async function action({
  params,
}: ActionFunctionArgs) {
  const notes = await getStoredNotes();
  const noteId = params.noteId;
  const selectedNote = notes.find((note) => note.id === noteId);
  debugger;
  return selectedNote;
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}