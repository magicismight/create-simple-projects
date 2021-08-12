import * as path from 'path';

import { Answers } from './inquirer';

export interface OptionPlaceholders {
  PROJECT_NAME: string;
  AUTHOR?: string;
  KEYWORDS?: string[];
}

export interface Options {
  placeholders: OptionPlaceholders;
  templateName: string;
  templatePath: string;
  targetPath: string;
}
export function createOptionsFromAnswers(answers: Answers): Options {
  const { template, name, author, keywords } = answers;
  const templatePath = path.join(__dirname, '../templates', template);
  const targetPath = path.join(process.cwd(), name);

  return {
    templateName: template,
    templatePath,
    targetPath,
    placeholders: {
      PROJECT_NAME: name,
      AUTHOR: author,
      KEYWORDS: keywords?.split(/\s+/)
    }
  };
}
