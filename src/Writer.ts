import { writeFileSync } from 'fs';
import { unparse } from 'papaparse';
import Note from './Note';

function convertNoteToColumns(note: Note): ReadonlyArray<string> {
  return [
    note.kana,
    note.kanji || '',
    (note.kanji && note.usuallyWrittenUsingKanaAlone && 'yes') || '',
    note.english,
    note.partOfSpeech,
    '', // picture
    note.example1 ? note.example1.toString() : '',
    note.example2 ? note.example2.toString() : '',
    note.englishDefinitionClarification || '',
    note.kanaClarification || '',
    note.note || '',
    '', // followup
    '', // gakushuu
    Array.from(note.tags)
      .map(tag => `#${tag}`)
      .join(','),
  ];
}

export default function writeToCsv(
  filename: string,
  notes: ReadonlyArray<Note>
) {
  const data = notes.map(convertNoteToColumns);
  const csv = unparse({
    data,
    fields: [
      'kana',
      'kanji',
      'usually written using kana alone',
      'english',
      'part of speech',
      'picture',
      'example one',
      'example two',
      'english definition clarification',
      'kana clarification',
      'note',
      'followup',
      'gakushuu',
      'tags',
    ],
  });
  writeFileSync(filename, csv);
}
