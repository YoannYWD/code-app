#Sujet :
Réaliser un gestionnaire de résultats de séances de code.
Cette mini SPA présentera sur une page la liste des élèves d'une auto-école, et les notes pour chaque élève.
Sur une seconde page, on affichera la liste des résultats uniques obtenus, et pour chaque résultat, la liste des élèves ayant obtenu cette note.

#Objectif :
Présenter et modifier des données en utilisant Vue JS, Vue Router et le store VueX.

#Contraintes :

- Utilisation de Vue JS 2 ou 3 (Si possible privilégier Javascript plutôt que Typescript),
- Utilisation de VueX ou Pinia
- Utilisation de Vue Router
- Utilisation d'un framework CSS ou librairie de composant, idéalement Bootstrap ou Tailwind CSS

Lors de cet exercice, on ne réalisera pas la partie serveur / API. On utilisera donc directement le store VueX ou Pinia pour stocker et les données.
A l'initialisation de l'application, le store pourra être alimenté par un fichier JSON.

#Spécifications :

- 1ère page / Route learners :

* présente sous forme d'un tableau la liste des élèves récupérée depuis le store VueX.
  Pour chaque élève est présenté :
  - une puce / avatar avec les initiales de l'élève
  - le nom
  - le prénom
  - la date de naissance
  - la moyenne des notes de l'élève (une note est composée d'une valeur, un entier entre 0 et 40, et d'une date de saisie)
  - si une des valeurs des notes de l'élève est supérieure à 35 alors la ligne doit s'afficher en fond vert
  - si une des valeurs des notes de l'élève est inférieure à 20 alors la ligne doit s'afficher en fond rouge
  - sinon la ligne s'affiche avec la couleur par défaut
* offre la possibilité de visualiser les notes de l'élève : chaque ligne de la liste aura un bouton déclenchant l'ouverture d'une modale listant toutes les notes de l'élève triés par ordre chronologique inversé (la plus récente d'abord), avec en fond vert, les notes supérieures à 35 et en fond rouge les notes inférieures à 20. (Optionnel) Eventuellement, on pourra à la place afficher un petit graphique de progression (y: valeur de la note, x: date de saisie)
* offre la possibilité d'ajouter une note pour un élève : chaque ligne de la liste aura un bouton déclenchant l'ouverture d'une modale permettant de saisir une note avec une date définie par défaut à la valeur du jour, et valider.
* offre la possibilité de supprimer un élève : chaque ligne de la liste aura un bouton de suppression avec une confirmation.
* offre la possibilité d'ajouter un élève : un formulaire présenté dans une modale ou depuis une route dédiée permettra d'ajouter un élève.

mode responsive :
- prévoir un affichage sous forme de carte en cas de résolution inférieure à 768px;

- Seconde page / Route results :
* présente la liste des résultats uniques, avec pour chaque résultat, la liste des élèves qui ont eu ce résultat

Une barre de navigation permettra d'alterner entre les deux vues.

- Les données manipulées auront la structure suivante :
learner {
  Integer id
  String lastName,
  String firstName,
  Date birthDate,
  Array notes
}

note { 
  Integer value,
  Date inputDate
} 

Contrôle des données :
- Deux élèves peuvent avoir le même nom et prénom, en revanche deux élèves ne peuvent pas avoir les même nom, prénom et date de naissance.
- Une valeur de note doit être comprise entre 0 et 40.
- Un message devra avertir l'utilisateur en cas d'erreur de saisie.
