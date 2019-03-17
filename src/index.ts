import Note from './Note';
import Writer from './Writer';

const note = new Note();
const writer = new Writer('test.csv');
writer.write([note]);
