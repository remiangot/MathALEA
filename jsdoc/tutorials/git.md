
* windows : https://gitforwindows.org/ (installe aussi gitBash qui vous permettra de taper les commandes trouvées un peu partout dans un terminal)
* linux : installer le paquet git de votre distribution
* macOs : https://git-scm.com/download/mac

Cf aussi éventuellement https://git-scm.com/downloads/guis

### docs
* [L'aide-mémoire indispensable](http://ndpsoftware.com/git-cheatsheet.html)
* un [article intéressant](https://delicious-insights.com/fr/articles/apprendre-git)
* le [git book en français](https://git-scm.com/book/fr/v2) (2ème édition 2014)
* la [référence](https://git-scm.com/docs) (en anglais)
* un [cours interactif en français](https://learngitbranching.js.org/)
* de [bon tutoriaux en français](https://fr.atlassian.com/git/tutorials)
* Des articles de Christophe Porteneuve [généralités](https://delicious-insights.com/fr/articles/git-workflows-generality/), [git-log](https://delicious-insights.com/fr/articles/git-log/), [hooks](https://delicious-insights.com/fr/articles/git-hooks-commit/)
* qq [recettes de cuisine](http://pioupioum.fr/developpement/git-10-commandes-utiles.html)

### Exemples de commandes utiles

```shell
######################################################################
# CLONER LE DEPOT PRINCIPAL
######################################################################
# Dans le répertoire où l'on veut cloner de dépôt
git clone https://github.com/mathalea/mathalea.git
# pour installer les modules js utilisés en dépendances
pnpm install
# pour lancer le build de dev et ouvrir le navigateur dessus
pnpm start

# pour créer une branche locale
git branch branchetest
# pour aller sur cette branche
git checkout branchetest
# pour faire les deux commandes précédentes en une
git checkout -b branchetest

# pour pousser/créer cette nouvelle branche sur le depot distant
git push origin branchetest
# pour supprimer cette nouvelle branche sur le depot distant
git push origin --delete branchetest
# pour supprimer cette nouvelle branche locale
git branch -d branchetest

# pour récupérer toutes les branches distantes en local (sans modifier le dossier courant)
git fetch origin

# pour mettre à jour une branche locale d'après sa branche distante
# il faut être sur la branche en question donc éventuellement après un git checkout maBrancheQuiDoitEtreMaj
git pull

######################################################################
# COMMITS SUR MASTER PARCE QU'ON A OUBLIÉ DE BOIRE SON 8E CAFÉ
######################################################################
# si on a fait des commits sur master (en pensant être ailleurs), il est toujours temps de mettre ça dans une branche après coup
git checkout -b nouvelleBranche
# => elle contient tous les commits faits sur master, on peut revenir à master
git checkout master
# et le remettre sur son commit précédent les notres
 git reset origin/master

######################################################################
# AIDER UN COPAIN EN REMISANT LE TRUC DE OUF EN COURS
######################################################################
# si on est sur un truc super mais qu'un copain a besoin d'un coup de main et qu'on n'est pas prêt à git commit, on peut remiser en attendant

# mettre le code de la branche maBrancheAvecLeSuperTruc dans la remise
git stash
# changer de branche
git checkout laBrancheDuCopain
# on file le coup de main, modifs, commits, etc 

# revenir à ma branche
git checkout maBrancheAvecLeSuperTruc
# récupérer la remise de cette branche
git stash pop
# la remise est une pile, donc elle peut contenir des éléments de différentes branches
# voir la liste des choses en remise
git stash list

######################################################################
# ANTICIPER UN CONFLIT DE MERGE EN LOCAL
######################################################################
# dans maBranche, on vérifie que tout est clean
git status
# on en crée une autre
git checkout -b tmp
# on tente un merge, par exemple de la branche main
git merge main
# on sait si ça passe (ou pas), on revient où on en était
git checkout maBranche
# et on efface le test
git branch -D tmp
```