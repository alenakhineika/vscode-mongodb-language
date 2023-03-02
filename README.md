# VSCode MongoDB Language Extension

The MongoDB language support for VSCode extensions.

![example](./example.png)

Adds a MongoDB language support to any VSCode extension.

```json
"languages": [
  {
    "id": "mongodb",
    "aliases": ["MongoDB", "mongodb"],
    "extensions": [".mongodb"],
    "configuration": "./language-configuration.json"
  }
]
```

## How to install

The MongoDB Language Extension is not released yet. To start using this extension with VSCode copy it into the `<user home>/.vscode/extensions` folder and restart VSCode.

## syntaxes/mongodb.tmLanguage.json

The MongoDB Shell language is a JavaScript-based query language that supports extended JSON, also called BSON.

The `mongodb.tmLanguage.json` file is derived from [TypeScript.tmLanguage](https://github.com/Microsoft/TypeScript-TmLanguage/blob/master/TypeScript.tmLanguage) and injected with MongoDB symbols from `mongodb-symbols.json`.

If you download a new version of the TypeScript grammar or update the MongoDB symbols you should update the MongoDB grammar by running the script:

```bash
npm run update-grammar
```

The script does the following changes:

- Parses the `TypeScript.tmLanguage` plist and builds `mongodb.tmLanguage.json`.
- Updates `.ts` file types, rule names and scope to `.mongodb`.
- Injects the `mongodb.tmLanguage.json` grammar with MongoDB symbols.

Compare `uuid` in `TypeScript.tmLanguage` and `mongodb.tmLanguage.json` to verify that a proper version of the grammar is being used.

## syntaxes/mongodb-symbols.json

The `mongodb-symbols.json` file contains symbols that are defined in [mongodb-ace-mode](https://github.com/mongodb-js/ace-mode/blob/master/index.js#L63-L263).
