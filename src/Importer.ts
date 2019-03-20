import { parse } from 'papaparse';
import Note from './Note';

const COLUMN_LIST = 1;
const COLUMN_ID = 2;
const COLUMN_WORD = 4;

function shouldConsiderRow(row: string[]): boolean {
  return row[COLUMN_LIST] !== 'History';
}

function getTagFromRow(row: string[]): string | null {
  const list = row[COLUMN_LIST];
  return list === 'Favorites' ? null : list;
}

const CODEPOINT_KANA_A = 'あ'.codePointAt(0)!;
const CODEPOINT_KANA_N = 'ん'.codePointAt(0)!;

function isKanaOnly(str: string): boolean {
  // TODO: find a library that does this?? Come back here and finish

  // Considerations:
  // 1. Hiragana OR Katakana
  // 2. Small characters, hyphens, symbols should be included
  // 3. Numbers, non-Japanese characters should be ignored
  for (let index = 0; index < str.length; ++index) {
    const char = str.codePointAt(index)!;
    if (char <= CODEPOINT_KANA_A || char >= CODEPOINT_KANA_N) {
      return false;
    }
  }

  return true;
}

interface Word {
  kana: string;
  kanji: string | null;
}

function parseRow(row: string[]): Word {
  const csvWord = row[COLUMN_WORD].split(',');
  let kana: string | null = null;
  let kanji: string | null = null;
  let index = 0;
  while (!(kana && kanji) && index < csvWord.length) {
    if (isKanaOnly(csvWord[index])) {
      if (!kana) {
        kana = csvWord[index];
      }
    } else {
      if (!kanji) {
        kanji = csvWord[index];
      }
    }

    ++index;
  }

  if (!kana) {
    throw new Error(`Could not find the kana word in ${row[COLUMN_WORD]}.`);
  }

  return {
    kana,
    kanji,
  };
}

export default function importCsv(filename: string): ReadonlyArray<Note> {
  const notes: Note[] = [];
  const lookup = new Map<number, Note>();
  // TODO: parse the file
  for (const row of []) {
    if (!shouldConsiderRow(row)) {
      continue;
    }

    let note: Note;
    const id = parseInt(row[COLUMN_ID], 10);
    const encountered = lookup.get(id);
    if (encountered) {
      note = encountered;
    } else {
      const word = parseRow(row);
      note = new Note(word.kana, word.kanji);
      lookup.set(id, note);
      notes.push(note);
    }

    const tag = getTagFromRow(row);
    if (tag) {
      note.tags.add(tag);
    }
  }

  return notes;
}
