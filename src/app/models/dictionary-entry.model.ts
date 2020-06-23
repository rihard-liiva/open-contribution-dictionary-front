import {LanguageI} from './language.model';

export interface DictionaryEntryI {
  id: number;
  word: string;
  equivalent: string;
  originatingLanguage: LanguageI;
  equivalentLanguage: LanguageI;
}
