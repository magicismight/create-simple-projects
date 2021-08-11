import * as fs from 'fs';
import * as path from 'path';
import * as gitignore from 'parse-gitignore';
import ignore from 'ignore';

export function createIgnoreFilter(
  folder: string
): ((file: string, isFolder: boolean) => boolean) | null {
  const gitignorePath = path.join(folder, '.gitignore');

  if (!fs.existsSync(gitignorePath)) {
    return null;
  }

  const rules = gitignore(fs.readFileSync(gitignorePath));
  const pattern = ignore({
    ignorecase: true
  })
    .add(rules)
    .add('.git');

  return (file: string, isFolder: boolean): boolean => {
    return !pattern.ignores(
      path.join(path.relative(folder, file), isFolder ? '/' : '')
    );
  };
}
