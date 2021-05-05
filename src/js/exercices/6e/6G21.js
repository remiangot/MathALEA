import Exercice from '../ClasseExercice.js';
import { listeQuestionsToContenu, randint, shuffle, combinaisonListes, calcul, creerNomDePolygone } from '../../modules/outils.js'
import { triangle2points2longueurs, point, pointAdistance, droite, droiteParPointEtPerpendiculaire, polygoneAvecNom, cercle, pointIntersectionLC, pointIntersectionCC, traceCompas, codageAngleDroit, afficheLongueurSegment, mathalea2d } from '../../modules/2d.js'
import Alea2iep from '../../modules/Alea2iep.js'

export const titre = 'Construire un triangle aux instruments'

/**
 * Publié le 30/08/202
 * @Auteur Jean-Claude Lhote (exercice) et Rémi Angot (animation Instrumenpoche)
 * Réfrence 6G21 et ... (exercice en 5e ? pas encore fait)
 * Modifié 2021/04/02
 */
export default function Construire_un_triangle() {
    "use strict"
    Exercice.call(this)
    this.titre = titre;
    this.nbQuestions = 2;
    this.nbCols = 1;
    this.nbColsCorr = 1;
    this.classe = 6
    this.typeExercice = "IEP";
    
    this.nouvelleVersion = function (numeroExercice) {
        this.listeQuestions = []
        this.listeCorrections = []
        let IEP;
        let type_de_questions_disponibles, A, B, C, CC, lAB, lBC, lAC, cA, cB, T, TT, dBC, dAB, objets_enonce, objets_correction, params_enonce, params_correction, nom, sommets
        if (this.classe == 6) type_de_questions_disponibles = [1, 2]
        // else type_de_questions_disponibles = [1, 2, 3]
        else type_de_questions_disponibles = [1]
        let liste_type_de_questions = combinaisonListes(type_de_questions_disponibles, this.nbQuestions)
        for (let i = 0, texte, texteCorr, cpt = 0; i < this.nbQuestions && cpt < 50;) {
            IEP = new Alea2iep()
            objets_enonce = []
            objets_correction = []
            texte = `Le triangle ci-dessous a été réalisé à main levée.<br>Construire ce triangle avec les instruments de géométrie en respectant les mesures indiquées.<br>`
            texteCorr = `Voici la construction que tu devais réaliser.<br>`
            nom = creerNomDePolygone(3, "PQ")
            sommets = []
            for (let i = 0; i < 3; i++) sommets.push(nom[i])
            sommets = shuffle(sommets)
            A = point(0, 0, sommets[0], 'left')
            switch (liste_type_de_questions[i]) {
                case 1: // triangle donné par trois longueurs
                    lAC = randint(35, 45)
                    lBC = calcul(randint(35, 45, lAC) / 10)
                    lAB = calcul(randint(46, 60) / 10)
                    lAC = calcul(lAC / 10)
                    B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
                    B.positionLabel = 'right'
                    cA = cercle(A, lAC)
                    cB = cercle(B, lBC)
                    C = pointIntersectionCC(cA, cB, sommets[2], 1)
                    C.positionLabel = 'above'
                    CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])

                    objets_enonce.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
                    objets_correction.push(traceCompas(A, C, 30, 'gray', 1, 2), traceCompas(B, C, 30, 'gray', 1, 2), afficheLongueurSegment(B, A), afficheLongueurSegment(C, B), afficheLongueurSegment(A, C))
                    texteCorr += `Pour cette construction, nous avons utilisé le compas et la règle graduée.<br>`
                   
                    IEP.triangle3longueurs(sommets,lAB,lAC,lBC)
                    break;

                case 2: // triangle rectangle donné par longueur hypoténuse et un côté de l'angle droit.
                    lAC = randint(70, 80) / 10
                    lAB = calcul(randint(46, 60) / 10)
                    B = pointAdistance(A, lAB, randint(-45, 45), sommets[1])
                    cA = cercle(A, lAC)
                    dAB = droite(A, B)
                    dBC = droiteParPointEtPerpendiculaire(B, dAB)
                    C = pointIntersectionLC(dBC, cA, sommets[2], 1)
                    CC = point(C.x + randint(-5, 5, 0) / 10, C.y + randint(-5, 5, 0) / 10, sommets[2])

                    objets_enonce.push(afficheLongueurSegment(B, A), afficheLongueurSegment(C, A), codageAngleDroit(A, B, C))
                    objets_correction.push(traceCompas(A, C, 30, 'gray', 1, 2), codageAngleDroit(A, B, C), afficheLongueurSegment(B, A), afficheLongueurSegment(C, A))
                    texteCorr += `Pour cette construction, nous avons utilisé la règle graduée, l'équerre et le compas.<br>`
                   
                    IEP.triangleRectangleCoteHypotenuse(sommets,lAB,lAC)
                    break

                case 3:

                    break
            }
            T = polygoneAvecNom(A, B, C)
            TT = polygoneAvecNom(A, B, CC)
            objets_enonce.push(TT[0], TT[1])
            objets_correction.push(T[0], T[1])
            params_enonce = { xmin: Math.min(A.x - 1, B.x - 1, C.x - 1), ymin: Math.min(A.y - 1, B.y - 1, C.y - 1), xmax: Math.max(A.x + 1, B.x + 1, C.x + 1), ymax: Math.max(A.y + 1, B.y + 1, C.y + 1), pixelsParCm: 30, scale: 1, mainlevee: true, amplitude: 0.3 }
            params_correction = { xmin: Math.min(A.x - 1, B.x - 1, C.x - 2), ymin: Math.min(A.y - 1, B.y - 1, C.y - 2), xmax: Math.max(A.x + 1, B.x + 1, C.x + 2), ymax: Math.max(A.y + 1, B.y + 1, C.y + 2), pixelsParCm: 30, scale: 1 }
            texte += mathalea2d(params_enonce, objets_enonce)
            texteCorr += mathalea2d(params_correction, objets_correction)

            texteCorr += IEP.htmlBouton(numeroExercice, i)

            if (this.listeQuestions.indexOf(texte) == -1) {
                // Si la question n'a jamais été posée, on en crée une autre
                this.listeQuestions.push(texte);
                this.listeCorrections.push(texteCorr);
                i++;
            }
            cpt++;
        }
        listeQuestionsToContenu(this);
    };
}
