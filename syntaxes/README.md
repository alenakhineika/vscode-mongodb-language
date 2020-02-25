## mongodb.tmLanguage.json

The `mongodb.tmLanguage.json` file is derived from [TypeScript.tmLanguage](https://github.com/Microsoft/TypeScript-TmLanguage/blob/master/TypeScript.tmLanguage).

If you downloaded a new version of the TypeScript grammar you can update the MongoDB grammar by running the following script:

`npm run update-grammar`

The script does the following changes:

- Uses the `TypeScript.tmLanguage` grammar and builds the MongoDB compatible JSON grammar.
- Updates `.ts` file types, rule names and scope to `.mongodb`.
- Saves `mongodb.tmLanguage.json` to `syntaxes` folder.

## mongodb-injection.json

The mongodb-injection.json file contains only MongoDB related syntax.
