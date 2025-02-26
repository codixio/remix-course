import fs from 'fs/promises';
import fs2 from 'fs';

const NOTES_FILE = 'notes.json';

export async function getStoredNotes() {
  if (!fs2.existsSync(NOTES_FILE)) {
    await fs.writeFile(NOTES_FILE, JSON.stringify({ notes: [] }));
    return [];
  }
  else {
    const rawFileContent = await fs.readFile(NOTES_FILE, { encoding: 'utf-8' });
    const data = JSON.parse(rawFileContent);
    const storedNotes = data.notes ?? [];
    return storedNotes;
  }
}

export function storeNotes(notes: { title: string; content: string; id: string }[]) {
  return fs.writeFile(NOTES_FILE, JSON.stringify({ notes: notes || [] }));
}