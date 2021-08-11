import { QuestionCollection, prompt } from 'inquirer';
import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';

const Choices = fs.readdirSync(path.join(__dirname, '../templates'));

export interface Answers {
  template: string;
  name: string;
  author?: string;
  keywords?: string;
}

export const Questions: QuestionCollection<Answers>[] = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: Choices,
    when: () => !yargs.argv['template']
  },
  {
    name: 'name',
    type: 'input',
    message: 'Project name:',
    when: () => !yargs.argv['name'],
    validate: (input: string) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true;
      } else {
        return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    }
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author name:',
    when: () => !yargs.argv['author']
  },
  {
    name: 'keywords',
    type: 'input',
    message: 'Keywords for project:',
    when: () => !yargs.argv['keywords']
  }
];

export async function fillInquirer(): Promise<Answers> {
  const answers = await prompt(Questions);
  return {
    template: yargs.argv['template'],
    name: yargs.argv['name'],
    ...answers
  };
}
