import fs from 'fs/promises';
import type { NoteType } from '~/data/note_type';

const NOTES_FILE = 'data.json';

export async function getStoredNotes() {
    try {
        const rawFileContent = await fs.readFile(NOTES_FILE, {
            encoding: 'utf-8',
        });
        const data = JSON.parse(rawFileContent);
        const storedNotes: NoteType[] = data.notes ?? [];
        return storedNotes;
    } catch {
        return [] as NoteType[];
    }
}
export async function storeNotes(notes: NoteType[]) {
    return fs.writeFile(NOTES_FILE, JSON.stringify({ notes: notes || [] }));
}