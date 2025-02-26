import NewNote, { links as newNoteLinks }  from "../components/NewNote";
import { getStoredNotes, storeNotes } from '../data/notes';
import { redirect, type ActionFunctionArgs } from '@remix-run/node';
import NoteList, { links as noteListLinks } from "../components/NoteList";
import { useLoaderData } from "@remix-run/react";
import { NoteType } from '../data/note_type';

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
  return notes;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const noteData = {
    title: formData.get('title'),
    content: formData.get('content'),
    id: new Date().toISOString(),
  } as NoteType;

  if (noteData.title.trim().length < 5) {
    return { message: 'Title must be at least 5 characters long' };
  }

  const existingNotes = await getStoredNotes();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);
  //await new Promise((resolve) => setTimeout(() => resolve(true), 2000));
  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}