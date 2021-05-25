import { mathalea2d, pointAdistance, polygoneAvecNom, point, parallelogramme2points1hauteur, afficheLongueurSegment, projectionOrtho , milieu, droite, segment, codageAngleDroit} from '../../modules/2d.js';
import { creerNomDePolygone } from '../../modules/outils.js';
import Exercice from '../Exercice.js'
import { context } from '../../modules/context.js'
import {listeQuestionsToContenuSansNumero,randint,choice,texteEnCouleurEtGras} from '../../modules/outils.js'


export const titre = 'Aire du parallélogramme'

/**
* Deux parallélogrammes sont tracés, on connait les 2 côté et une hauteur.
*
* Il faut calculer leurs aires.
*
* Pas de version LaTeX
* @author Rémi Angot
* 5M10
*/
export default function Aire_du_parallelogramme() {
	Exercice.call(this); // Héritage de la classe Exercice()
	this.titre = titre;
	this.consigne = "Calculer l'aire des 3 parallélogrammes suivants (les longueurs sont données en cm).";
	this.spacing = 2;
	this.spacingCorr = 2;
	this.nbQuestions = 1;
	this.nbCols = 1;
	this.nbColsCorr = 1;
  
	this.nbQuestionsModifiable = false;
	let cadre = function (p,params){
		let xmin=0,xmax=0,ymin=0,ymax=0
		for (let i=0;i<4;i++){
			xmin=Math.min(xmin,p[0].listePoints[i].x-1)
			ymin=Math.min(ymin,p[0].listePoints[i].y-1)
			xmax=Math.max(xmax,p[0].listePoints[i].x+1)
			ymax=Math.max(ymax,p[0].listePoints[i].y+1)
		}
		params.xmin=xmin
		params.xmax=xmax
		params.ymin=ymin
		params.ymax=ymax
		return params
	}

	this.nouvelleVersion = function (numeroExercice) {
		this.listeCorrections = []; // Liste de questions corrigées
		this.listeQuestions=[]
		let texte='',params
        let nom=creerNomDePolygone(12,'Q')
		let objetsEnonce=[]
		let c1 = randint(3, 7);
		let h1 = randint(2, 4);
		let c2 = randint(3, 7);
		let h2 = randint(2, 7);
		let c3 = randint(3, 10);
		let h3 = randint(2, 4);
        let A1,A2,A3,B1,B2,B3,P1,P2,P3,H1,H2,H3,I1,I2,I3,s1,s2,s3,C1,C2,C3
        A1 = point(0,0,nom[0])
        B1 = pointAdistance(A1,c1,randint(-20,20),nom[1])
	      P1=parallelogramme2points1hauteur(nom.slice(0,4),A1,B1,h1)
		  C1=P1[0].listePoints[2]
		  I1=milieu(A1,B1)
		  H1=projectionOrtho(I1,droite(P1[0].listePoints[3],P1[0].listePoints[2]))
		  s1=segment(I1,H1)
		  s1.pointilles=2
		   A2 = point (0,0)
        B2=pointAdistance(A2,c2,randint(-20,20),nom[5])
        P2=parallelogramme2points1hauteur(nom.slice(4,8),A2,B2,h2)
		C2=P2[0].listePoints[2]
		I2=milieu(A2,B2)
		H2=projectionOrtho(I2,droite(P2[0].listePoints[3],P2[0].listePoints[2]))
		s2=segment(I2,H2)
		s2.pointilles=2
		A3 = point (0,0)
        B3 = pointAdistance(A3,c3,randint(-20,20),nom[9])
        P3=parallelogramme2points1hauteur(nom.slice(8,12),A3,B3,h3)
		C3=P3[0].listePoints[2]
		I3=milieu(A3,B3)
		H3=projectionOrtho(I3,droite(P3[0].listePoints[3],P3[0].listePoints[2]))
		s3=segment(I3,H3)
		s3.pointilles=2
	    params={xmin:0,xmax:0,ymin:0,ymax:0,pixelsParCm:20,scale:0.5,mainlevee:false}
		params=cadre(P1,params)
		texte+=	mathalea2d(params,P1[0],P1[1],afficheLongueurSegment(B1,A1),afficheLongueurSegment(C1,B1),afficheLongueurSegment(I1,H1),s1,codageAngleDroit(A1,I1,H1),codageAngleDroit(C1,H1,I1))
		params={xmin:0,xmax:0,ymin:0,ymax:0,pixelsParCm:20,scale:0.5,mainlevee:false}
		params=cadre(P2,params)
		texte+=	mathalea2d(params,P2[0],P2[1],afficheLongueurSegment(B2,A2),afficheLongueurSegment(C2,B2),afficheLongueurSegment(I2,H2),s2,codageAngleDroit(A2,I2,H2),codageAngleDroit(C2,H2,I2))
		params={xmin:0,xmax:0,ymin:0,ymax:0,pixelsParCm:20,scale:0.5,mainlevee:false}
		params=cadre(P3,params)
		texte+='br'+mathalea2d(params,P3[0],P3[1],afficheLongueurSegment(B3,A3),afficheLongueurSegment(C3,B3),afficheLongueurSegment(I3,H3),s3,codageAngleDroit(A3,I3,H3),codageAngleDroit(C3,H3,I3))
		
		
		let texteCorr = `Dans chaque parallélogramme, le segment en pointillés est ${texteEnCouleurEtGras("perpendiculaire")} à deux côtés opposés, c'est donc une ${texteEnCouleurEtGras("hauteur")}.<br>`;
		texteCorr += `Pour obtenir l'aire, il faut multiplier cette ${texteEnCouleurEtGras("hauteur")} par la longueur de la ${texteEnCouleurEtGras("base")} correspondante.`;
		texteCorr += "<br><br>";
		texteCorr += `$\\mathcal{A}_{${nom.slice(0,4)}}=${c1}~\\text{cm}\\times  ${h1}~\\text{cm}=${c1 * h1}~\\text{cm}^2$`;
		texteCorr += `<br>$\\mathcal{A}_{${nom.slice(4,8)}}=${c2}~\\text{cm}\\times  ${h2}~\\text{cm}=${c2 * h2}~\\text{cm}^2$`;
		texteCorr += `<br>$\\mathcal{A}_{${nom.slice(8,12)}}=${c3}~\\text{cm}\\times  ${h3}~\\text{cm}=${c3 * h3}~\\text{cm}^2$`;

        this.listeQuestions.push(texte)
		this.listeCorrections.push(texteCorr);
		listeQuestionsToContenuSansNumero(this);
	};

	// 	this.besoinFormulaireNumerique = ['Niveau de difficulté',3,"1 : Périmètres\n\
	// 2 : Aires\n3 : Périmètres et aires"];
}
