# DataSetWeb

Projet effectué dans le cadre du début de la 1ère année de formation Ingénieure de Polytech Lyon.

Membres de l'équipe : Clara BEAL, Julian DEGUT, Rayan ELHAMDI, Benjamin GUYOT DE LA POMMERAYE, Thibault NICOLAS

## Introduction

Lors de notre "remise à niveau" en début d'année, nous avons réalisé un mini-projet consistant à afficher les données d'un DataSet sur un site web dynamique (avec une bas de données).
Pour ce faire nous avons diviser les tâches en 2 groupes : le Front et le Back.
Le Front étant la partie présentation du site (HTML/CSS) et le Back étant la liaison entre le Front et la BDD (NodeJS).

Notre équipe a choisi d'utiliser un DataSet en lien avec les prénoms donnés à la naissance en France entre 2000 et 2020.

## Déroulement

#### Le commencement
Pour commencer, nos données sont sur un fichier Excel inutilisable par nos soins sans traitement.
Nous avons donc du convertir cet excel en fichier csv pour le rendre utilisable avec Python.

Une fois le fichier CSV créé, nous avons pu créer un algorithme qui réécrivait les données dans un format SQL.
Nous avons donc obtenu un fichier avec plus de 1 000 000 d'opérations SQL différentes (et non juste une création de Database avec 1 000 000 de données directement dedans => cela fait bugger la BDD).

#### Mise en place du site

Ensuite nous avons commencé à mettre en place le site web avec la partie Front. Une page de bienvenue, une page principale où l'utilisateur peut faire sa recherche.
Et pour terminer le site, il ne restait plus qu'à mettre en place le Back. Nous avons choisi d'utiliser NodeJS, un framework de Javascript, relié à une BDD MySql.

#### Problèmes rencontrés

Les problèmes ne manquaient pas :
- pas de responsivité quant aux CSS du site
- dur apprentissage de NodeJS en quelques semaines
- données trop grandes pour être importées sur une BDD quelconque (VPS loué chez OVH)

## Documentation

#### Dossier "site"

Ce dossier regroupe l'ensemble de la partie Front de notre WebSite

#### Dossier "data"

Dossier où l'on peut trouver les données de base, les données CSV, et le script Python permettant de les transformer en données SQL.

#### Dossier "backend"

Toute la partie Back se situe dans ce dossier, avec les script NodeJS et tous les modules recommandés/nécessaires.

## Lien GitHub

https://github.com/jDegut/Project-1-DataSetWeb