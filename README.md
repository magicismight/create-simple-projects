# Inspired by:

[mycli](https://github.com/pongsatt/mycli)

# Usage

Create a new project based on template.

`npx create-simple-projects`

Or

`npm i create-simple-projects - g && npx csp`

## Options

### template

Select template project, Available options:

- `ts`

`npx csp --template ts`

### name

Name for new project.

`npx csp --name test`

## Placeholder

Use [ejs](https://ejs.co/) as template placeholder.
Any package.json files or \*.ejs.\* files will automatically transform the ejs tags within.

### PROJECT_NAME

```JSON
"name": "<%= PROJECT_NAME %>"
```

### AUTHOR

```JSON
"author": {
  "name": "<%= AUTHOR %>"
}
```

### KEYWORDS

`KEYWORDS` template variable is an array of string.

```
npx csp --keywords "react classnames style"
```

Use in template file.

xxx.ejs.ts

```ts
const keywords = JSON.parse(<%= JSON.stringify(KEYWORDS); %>);

```

Use in package.json

```JSON
"keywords": "<%= KEYWORDS.join('", "') %>"

```
