import Ecrire_une_expression_numerique from './_Ecrire_une_expression_numerique.js'
export const titre = 'Calculer une expression littérale pour les valeurs données en détaillant les calculs'

/**
 * @author Jean-Claude Lhote
  * Référence 5L14-1
*/
export default function Calculer_une_expression_litterale() {
	Ecrire_une_expression_numerique.call(this);
	this.version = 4;
	this.titre = titre;
	this.litteral = true;
}
