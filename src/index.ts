#!/usr/bin/env ts-node

import { createProject } from './createProject';
import { fillInquirer } from './inquirer';
import { createOptionsFromAnswers } from './options';
import { postProcess } from './postProcess';

(async function () {
  const answers = await fillInquirer();
  const options = createOptionsFromAnswers(answers);
  createProject(options);
  postProcess(options);
})();
