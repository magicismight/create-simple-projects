import * as fs from 'fs';
import * as path from 'path';
import * as shell from 'shelljs';
import * as chalk from 'chalk';

import { Options } from './options';

export function postProcess(options: Options): boolean {
  if (isNodePackage(options)) {
    return postProcessNode(options);
  }
  return true;
}

function isNodePackage(options: Options): boolean {
  return fs.existsSync(path.join(options.templatePath, 'package.json'));
}

function postProcessNode(options: Options) {
  shell.cd(options.targetPath);

  let cmd: string | null = null;

  if (shell.which('yarn')) {
    cmd = 'yarn';
  } else if (shell.which('npm')) {
    cmd = 'npm install';
  }

  if (cmd) {
    const result = shell.exec(cmd);

    if (result.code !== 0) {
      return false;
    }
  } else {
    console.log(chalk.red('No yarn or npm found. Cannot run installation.'));
  }

  return true;
}
