// on utilise esm pour convertir au runtime des modules js au format esModule vers du commonJs
// NodeJs sait charger des esModule, mais ils doivent avoir l'extension mjs
// sinon il faudrait préciser "type": "module" dans package.json, mais il faudrait alors réécrire tout le code de testsBrowser à la syntaxe import/export

// cf https://github.com/standard-things/esm
const requireImport = require('esm')(module)
const { default: dictionnaireDesExercicesAleatoires } = requireImport('../../src/js/modules/dictionnaireDesExercicesAleatoires')
// ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e
module.exports = {
  // ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e
  dictionnaireDesExercicesAleatoires
}
