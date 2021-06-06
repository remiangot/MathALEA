import ExerciceConversionsAires from './_Exercice_conversions_aires.js'
import { amcReady, interactifReady, amcType, interactifType } from './_Exercice_conversions_aires.js'
export const titre = 'Conversions d’aires'

export { amcReady, interactifReady, amcType, interactifType } from './_Exercice_conversions_aires.js'
/**
 * @author Rémi Angot
 * référence 6M23
 *
*/
export default function Reglages6M23 () {
  ExerciceConversionsAires.call(this)
  this.titre = titre
  this.amcReady = amcReady
  this.amcType = amcType
  this.interactif = false
  this.interactifReady = interactifReady
  this.interactifType = interactifType
  this.sup = 3
  this.nbColsCorr = 1
}
