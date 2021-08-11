import * as ejs from 'ejs';

export function render(template: string, data: ejs.Data) {
  return ejs.render(template, data);
}
