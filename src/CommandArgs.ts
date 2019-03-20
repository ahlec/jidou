import * as fs from 'fs';

const USAGE = 'yarn start input.csv output.csv';

export default class CommandArgs {
  public static parse(): CommandArgs {
    if (process.argv.length <= 2) {
      throw new Error(
        `Input filename and outfile filename are required. USAGE: ${USAGE}`
      );
    }

    const [, inputFilename, outputFilename] = process.argv;
    if (!inputFilename || !outputFilename) {
      throw new Error(
        `Input filename and output filename are required. USAGE: ${USAGE}`
      );
    }

    if (!fs.existsSync(inputFilename)) {
      throw new Error(
        `Specified input file '${inputFilename}' does not exist. USAGE: ${USAGE}`
      );
    }

    if (!fs.openSync(outputFilename, 'a')) {
      throw new Error(
        `Cannot write to output filename '${outputFilename}'. USAGE: ${USAGE}`
      );
    }

    return new CommandArgs(inputFilename, outputFilename);
  }

  private constructor(
    public readonly inputFilename: string,
    public readonly outputFilename: string
  ) {}
}
