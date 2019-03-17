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
    note.tags,
  ];
}

export default class Writer {
  public constructor(private readonly filename: string) {}

  public write(notes: ReadonlyArray<Note>) {
    const data = notes.map(convertNoteToColumns);
    const csv = unparse({
      data,
      fields: [
        'kana',
        'kanji',
        'usuall written using kana alone',
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
    writeFileSync(this.filename, csv);
  }
}
