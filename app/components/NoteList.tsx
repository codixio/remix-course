import styles from '~/components/NoteList.css?url';
import { NoteType } from '~/data/note_type';
import { Link } from '@remix-run/react';

interface NoteListProps {
  notes_list: NoteType[];
}

function NoteList({ notes_list }: NoteListProps) {
  return (
    <ul id="note-list">
      {notes_list.map((note, index) => (
        <li key={note.id} className="note">
          <Link to={`/notes/${note.id}`}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p>{note.content}</p>
              </article>
            </Link>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}