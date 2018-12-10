export interface ITranslation {
  id: string;
  version: string;
  // name: string;
  [t: string]: object | string;
}

export interface ICurrentLanguage {
  translationId: string;
  translationVersion: string;
}
