import Example from './Example';

export default class Note {
  public usuallyWrittenUsingKanaAlone: boolean;
  public english: string;
  public partOfSpeech: string;
  public example1: Example | null;
  public example2: Example | null;
  public englishDefinitionClarification: string | null;
  public kanaClarification: string | null;
  public note: string | null;
  public tags: Set<string>;

  public constructor(
    public readonly kana: string,
    public readonly kanji: string | null
  ) {}
}
