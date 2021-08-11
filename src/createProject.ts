import * as fs from 'fs';
import * as path from 'path';
import * as chalk from 'chalk';

import { render } from './placeholders';
import { OptionPlaceholders, Options } from './options';
import { createIgnoreFilter } from './ignoreFiles';

function createFolder(path: string): boolean {
  if (fs.existsSync(path)) {
    console.log(
      chalk.red(`Folder ${path} exists. Delete or use another name.`)
    );
    return false;
  }

  fs.mkdirSync(path);
  return true;
}

const PlaceholderPattern = /\.ejs(\.[\w]+)$/;

function isPlaceholderFile(file: string): boolean {
  return file === 'package.json' || PlaceholderPattern.test(file);
}

function createFiles(
  origin: string,
  target: string,
  options: {
    placeholders: OptionPlaceholders;
    filter?: (file: string, isFolder: boolean) => boolean;
  }
): void {
  const filesToCreate = fs.readdirSync(origin);
  const { placeholders, filter } = options;

  let filesFilter = createIgnoreFilter(origin) ?? filter ?? (() => true);

  filesToCreate.forEach((file) => {
    const originFilePath = path.join(origin, file);
    const targetFilePath = path.join(target, file);

    // get stats about the current file
    const stats = fs.statSync(originFilePath);

    if (stats.isFile()) {
      if (!filesFilter(originFilePath, false)) {
        return;
      }

      if (isPlaceholderFile(file)) {
        writeFileWithPlaceholders(originFilePath, targetFilePath, placeholders);
      } else {
        copyFile(
          originFilePath,
          targetFilePath.replace(PlaceholderPattern, '')
        );
      }
    } else if (stats.isDirectory()) {
      if (!filesFilter(path.join(originFilePath, '/'), true)) {
        return;
      }

      fs.mkdirSync(targetFilePath);

      // recursive call
      createFiles(originFilePath, targetFilePath, {
        placeholders,
        filter: filesFilter
      });
    }
  });
}

function copyFile(origin: string, target: string): void {
  fs.copyFileSync(origin, target);
}

const Encoding = 'utf8';

function writeFileWithPlaceholders(
  origin: string,
  target: string,
  placeholders: OptionPlaceholders
): void {
  let contents = fs.readFileSync(origin, Encoding);
  contents = render(contents, placeholders);
  fs.writeFileSync(target, contents, Encoding);
}

export function createProject(options: Options): boolean {
  const { targetPath, templatePath, placeholders } = options;

  if (createFolder(options.targetPath)) {
    createFiles(templatePath, targetPath, { placeholders });
    return true;
  } else {
    return false;
  }
}
