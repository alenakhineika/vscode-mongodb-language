The VSCode JavaScript-based grammars are derived from the TypeScript grammar. VSCode uses `npm run update-grammars` script to update these grammars to the latest version of TypeScript. Since the MongoDB language grammar is not a part of VSCode repo (yet?), there is a helper that parses the TypeScript plist and builds `mongodb.tmLanguage.json`.

- Uses the `TypeScript.tmLanguage` grammar and builds the MongoDB compatible JSON grammar.
- Updates `.ts` file types, rule names and scope to `.mongodb`.
- Saves `mongodb.tmLanguage.json` to `syntaxes` folder.
