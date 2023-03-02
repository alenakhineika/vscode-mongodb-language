import fs = require('fs');
import path = require('path');
import plist = require('fast-plist');

const tsGrammarPlist = fs.readFileSync('./grammar/TypeScript.tmLanguage');
const tsGrammarJSON = plist.parse(tsGrammarPlist.toString('utf8'));
const mongodbGrammar = path.resolve('./syntaxes/mongodb.tmLanguage.json');
const mongodbSymbols = require(path.resolve('./syntaxes/mongodb-symbols.json'));

/**
 * Updates `.ts` rule names to `.mongodb`.
 *
 * @param {String} str - The original rule name.
 *
 * @returns {String} - The rule name where `.ts` replaced with `.mongodb`.
 */
const toMongoDB = (str): string =>
  str
    .split(' ')
    .map((prop) => {
      const item = path.parse(prop);
      const itemExt = item.ext === '.ts' ? '.mongodb' : item.ext;

      return `${item.name}${itemExt}`;
    })
    .join(' ');

/**
 * Looks for all rule names that have `.ts` extension in order
 * to replace them with `.mongodb` extension. The MongoDB language
 * that is built by this project is going to be used
 * by the official MongoDB VSCode plugin
 * that introduces a new `.mongodb` extention for its playground.
 *
 * @see https://github.com/mongodb-js/vscode
 *
 * @param {String} item - The pattern or the repository item of the TypeScript grammar.
 *
 * @returns {Object} - The MongoDB grammar item.
 */
const replaceExtension = (item): string => {
  if (item.name) {
    item.name = toMongoDB(item.name);
  }

  if (item.contentName) {
    item.contentName = toMongoDB(item.contentName);
  }

  Object.keys(item).forEach((key) => {
    if (item[key] instanceof Object) {
      item[key] = replaceExtension(item[key]);
    }

    if (item[key] instanceof Array) {
      item[key] = item[key].map(replaceExtension);
    }
  });

  return item;
};

const patterns = tsGrammarJSON.patterns.map(replaceExtension);
const repository = replaceExtension(tsGrammarJSON.repository);

const mongoDBGrammarJSON = {
  name: 'MongoDB',
  uuid: tsGrammarJSON.uuid,
  scopeName: 'source.mongodb',
  fileTypes: ['mongodb'],
  patterns,
  repository
};

// Inject the resulting grammar with MongoDB symbols
Object.keys(mongodbSymbols).forEach((key) => {
  mongodbSymbols[key].forEach((item) => {
    const value = item.substring(1);

    mongoDBGrammarJSON.repository['object-member'].patterns.unshift({
      name: 'meta.object.member.mongodb',
      match: `\\$${value}\\b`,
      captures: {
        0: {
          name: `keyword.other.${key}.${value}.mongodb`
        }
      }
    });
  });
});

// Create the `mongodb.tmLanguage.json` file with the MongoDB grammar.
fs.unlink(mongodbGrammar, (unlinkFileError) => {
  if (!unlinkFileError || unlinkFileError.code === 'ENOENT') {
    fs.writeFile(
      mongodbGrammar,
      JSON.stringify(mongoDBGrammarJSON, null, 2),
      'utf8',
      (writeFileError: Record<string, any> | null) => {
        if (writeFileError) {
          return console.log(
            'An error occured while writing to mongodb.tmLanguage.json',
            writeFileError
          );
        }

        console.log(`${mongodbGrammar} file has been saved`);
      }
    );
  } else {
    return console.log(
      'An error occured while deleting mongodb.tmLanguage.json',
      unlinkFileError
    );
  }
});
