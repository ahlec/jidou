import CommandArgs from './CommandArgs';
import importCsv from './Importer';
import writeToCsv from './Writer';

function main() {
  const commandArgs = CommandArgs.parse();
  const notes = importCsv(commandArgs.inputFilename);
  // GATHER NOTES DATA
  writeToCsv(commandArgs.outputFilename, notes);
}

main();
