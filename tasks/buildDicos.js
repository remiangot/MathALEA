const fs = require('fs')
const path = require('path')

const isVerbose = /-(-verbode|v)/.test(process.argv)
const logIfVerbose = (...args) => { if (isVerbose) console.log(...args) }

function getAllFiles (dir) {
  const files = []
  fs.readdirSync(dir).forEach(entry => {
    if (entry === 'Exercice.js') return
    const fullEntry = path.join(dir, entry)
    if (fs.statSync(fullEntry).isDirectory()) {
      getAllFiles(fullEntry).forEach(file => files.push(file))
    } else if (/\.js$/.test(entry) && !/^_/.test(entry)) {
      files.push(fullEntry)
    } // sinon on ignore
  })
  return files
}

// pour la fct qui a servi à transformer tous les exos pour ajouter le export const titre = …, cf commit 6d281fb4
// mais attention elle avait un petit bug sur les titres qui finissaient par $ (bug rectifié manuellement dans les 4 exos concernés)

// pour charger dans node des js avec une syntaxe export (sans l'extension mjs, sinon y'aurait pas besoin de ça)
const requireImport = require('esm')(module)

const debut = Date.now()

const jsDir = path.resolve(__dirname, '..', 'src', 'js')
const exercicesDir = path.resolve(jsDir, 'exercices')
const prefixLength = jsDir.length

const exercicesList = getAllFiles(exercicesDir)

const dicoAlea = {}
// ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e

for (const file of exercicesList) {
  const name = path.basename(file, '.js')
  // interactifReady est un booléen qui permet de savoir qu'on peut avoir une sortie html qcm interactif
  // amcType est un objet avec une propriété num et une propriété text pour le type de question AMC
  let titre, amcReady, amcType={}, interactifReady
  try {
    if (dicoAlea[name]) throw Error(`${file} en doublon, on avait déjà un ${name}`)
    const module = requireImport(file)
    if (!module.titre) {
      console.error(`${file} n’a pas d’export titre => IGNORÉ`)
      continue
    }
    titre = module.titre
    // On teste à l'ancienne la présence de this.qcm dans le code car dans ce cas le booléen amcReady doit être true
    // On affiche une erreur dans le terminal pour signaler qu'il faut l'ajouter    
    amcReady = Boolean(module.amcReady)
    interactifReady = Boolean(module.interactifReady)         
    if (amcReady && !module.amcType) {
      console.error(`\x1b[41m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!! (module)\x1b[0m`)
    }
    if (module.amcType && !module.amcReady) {
      console.error(`\x1b[41m${file} a un export amcType mais amcReady est false => VÉRIFIER ÇA !!! (module)\x1b[0m`)
    } 
    // Avant on testait le type AMC pour définir qcmInteractif cf commmit f59bb8e
    if (amcReady) {    
      amcType.num = module.amcType      
    }    
  } catch (error) {
    // ça marche pas pour ce fichier, probablement parce qu'il importe du css et qu'on a pas les loader webpack
    // on passe à l'ancienne méthode qui fouille dans le code simport { amcReady } from '../src/js/exercices/3e/3G21';
    const srcContent = fs.readFileSync(file, { encoding: 'utf8' })
    const chunks = /export const titre *= *(['"])([^'"]+)\1/.exec(srcContent)
    if (chunks) {
      titre = chunks[2]
      amcReady = /export +const +amcReady *= *true/.test(srcContent)
      interactifReady = /export +const +interactifReady *= *true/.test(srcContent)      
      if (amcReady && !/export +const +amcType */.test(srcContent)) {
        console.error(`\x1b[41m${file} n'a pas d'export amcType => IL FAUT L'AJOUTER !!! (à l'ancienne)\x1b[0m`)
      }
      if (/export +const +amcType */.test(srcContent) && !amcReady) {
        console.error(`\x1b[41m${file} a un export amcType mais amcReady est false => VÉRIFIER ÇA !!! (à l'ancienne)\x1b[0m`)
      }
      // Avant on testait le type AMC pour définir qcmInteractif cf commmit f59bb8e   
      if (amcReady) {
        amcType.num = parseInt(srcContent.match(/export +const +amcType *= *(\d*)/)[1])
      }
    } else {
      console.error(Error(`Pas trouvé de titre dans ${file} => IGNORÉ`))
    }
  }
  if (interactifReady && !amcReady) {
    console.error(`\x1b[41m${file} est interactifReady mais amcReady est false => VÉRIFIER S'IL FAUT L'AJOUTER !!!\x1b[0m`)
  }
  if (titre) {
    // Attention, on veut des séparateurs posix (/), pour faire propre faudrait
    // if (path.sep !== path.posix.sep) url = url.replace(new RegExp(path.sep, 'g'), path.posix.sep)
    // mais ça va bcp plus vite de faire
    const url = file.substr(prefixLength).replace(/\\/g, '/')
    // On ajoute amcType que si amcReady est à true
    if (amcReady) {
      // On ajuste la propriété text de amcType différemment si c'est un tableau ou non      
      if (typeof amcType.num === 'number')  {        
        switch (amcType.num) {
          case 1:
            amcType.text = "qcmMono";
            break;
          case 2:
            amcType.text = "qcmMult";
            break;
          case 3:
            amcType.text = "AMCOpen";
            break;
          case 4:
            amcType.text = "AMCOpen Num";
            break;
          case 5:
            amcType.text = "AMCOpen NC";
            break;
          case 6:
            amcType.text = "AMCOpen double NC";
            break;
          default:
            console.error(`\x1b[41m${file} contient un amcType numerique non prévu => IL FAUT VÉRIFIER ÇA (number)!!!\x1b[0m`)
            amcType.text = "type de question AMC non prévu";
        }
      } else  if (typeof amcType.num === 'object')  {
        amcType.text = []
        amcType.num.forEach(
          function(num) { 
            switch (num) {
              case 1:
                amcType.text.push("qcmMono");
                break;
              case 2:
                amcType.text.push("qcmMult");
                break;
              case 3:
                amcType.text.push("AMCOpen");
                break;
              case 4:
                amcType.text.push("AMCOpen Num");
                break;
              case 5:
                amcType.text.push("AMCOpen NC");
                break;
              case 6:
                amcType.text.push("AMCOpen double NC");
                break;
              default:
                console.error(`\x1b[41m${file} contient un element numérique non prévu dans le tableau amcType => IL FAUT VÉRIFIER ÇA (object)!!!\x1b[0m`)
                amcType.text.push("type de question AMC non prévu");
            }
          }        
        )
      } else {
        console.error(`\x1b[41m${file} contient amcType ni entier ni liste => IL FAUT VÉRIFIER ÇA !!!\x1b[0m`)
        amcType.text = "bug amcType.num"
      }      
      dicoAlea[name] = { titre, url, amcReady, amcType, interactifReady, name }
    } else {
      dicoAlea[name] = { titre, url, amcReady, interactifReady, name }
    }    
// ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e
    logIfVerbose(`${name} traité (${titre})`)
  } else {
    console.error(`${name} ignoré (pas de titre)`)
  }
}

let dictFile = path.resolve(jsDir, 'modules', 'dictionnaireDesExercicesAleatoires.js')
fs.writeFileSync(dictFile, `export default ${JSON.stringify(dicoAlea, null, 2)}`)
console.log(`${dictFile} généré`)
// ligne supprimée avant il y avait un dico spécifique pour AMC cf commit 7dac24e
const csvDir = path.resolve(__dirname, '..', 'src', 'csv')
let csvFile = path.resolve(csvDir,'.','listingParTypes.csv')
fs.writeFileSync(csvFile,`amc,interactif\r\n`)
Object.entries(dicoAlea).forEach(([id,props]) => {
  if (props.amcReady && props.interactifReady) {
    fs.appendFileSync(csvFile,`${id},${id}\r\n`)
  } else if (props.amcReady && !props.interactifReady) {
    fs.appendFileSync(csvFile,`${id},\r\n`)
  } else if (!props.amcReady && props.interactifReady) {
    fs.appendFileSync(csvFile,`,${id}\r\n`) 
  }
})
console.log(`${csvFile} généré`)
const fin = Date.now()
console.log(`${path.resolve(__dirname, __filename)} terminé en ${fin - debut}ms`)
