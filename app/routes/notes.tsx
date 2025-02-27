import NewNote, { links as newNoteLinks }  from "~/components/NewNote";
import { getStoredNotes, storeNotes } from '~/data/notes';
import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { Link, useLoaderData, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { NoteType } from '~/data/note_type';

export default function NotesPage() {
  const notes = useLoaderData() as NoteType[];
  
  return (
    <main>
      <NewNote />
      <NoteList notes_list={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  if (!notes || notes.length === 0) {
    throw new Response("No notes found yet. Create one above!", {status: 200});
  }
  return notes;
}

export async function action({
  request,
}: ActionFunctionArgs) {

  const formData = await request.formData();

  const noteData = {
    title: formData.get('title'),
    content: formData.get('content'),
    id: new Date().toISOString(),
  } as NoteType;

  if (noteData.title.trim().length < 5) {
    return { message: `Title must be at least 5 characters long` };
  }

  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  //await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
  return redirect('/notes');
}

export function ErrorBoundary() {
  const error = useRouteError();
  const response = error as Response;

  if (isRouteErrorResponse(error)) {
    if (error.status === 200) {
      return (
        <main>
          <NewNote />
          <p className="info-message">{error.data}</p>
        </main>
      );
    }
    else { 
      return (
        <main className="error">
          <h1>Oops! Something went wrong</h1>
          <p><strong>Error: </strong>{error.status} {error.statusText}</p>
          <p>{error.data}</p>
          <p><Link to="/">Return to the homepage</Link></p>
        </main>
      );
    }
  } else if (error instanceof Error) {
    return (
      <main className="error">
        <h1>Oops! Something went wrong</h1>
        <p><strong>Error: </strong>{error.message}</p>
        <p><Link to="/">Return to the homepage</Link></p>
      </main>
    );
  } else {
    return (
      <main className="error">
        <h1>Oops! Something went wrong</h1>
        <p><strong>Error: </strong>{response.type || 'An unknown error occurred'}</p>
        <p><Link to="/">Return to the homepage</Link></p>
      </main>
    );
  }
}

export function links() {
  debugger;
  return [...newNoteLinks(), ...noteListLinks()];
}