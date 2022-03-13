//Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {

    const table = document.getElementById('tableauBody');
    const tableTitre = document.getElementById('tableauTitre');

    //Département sélectionné par l'utilisateur
    let departementClick;

    //Récupère les départements sur la carte
    const departements = document.getElementsByTagName('path');
    //Boucle pour tous les départements
    for (const departement of departements) {
        //Ajoute l'évènement du click
        departement.addEventListener('click', () => {
            //Enlève la couleur à tous les départements
            for (const departement of departements) {
                departement.style.fill = '';
            }

            //Si le département sélectionné n'a pas été séléctionné juste avant, le colorier
            if (departementClick !== departement.id.replace('FR-', '')) {
                //Ajoute la couleur bleue au département cliqué
                departement.style.fill = 'rgb(242, 58, 58)';
                //Sélectionne le numéro du département
                departementClick = departement.id.replace('FR-', ''); //FR-15; FR-34,...

                //Sinon, le désélectionner
            } else {
                departementClick = undefined;
            }
        });
    }

    //Quand le bouton d'actualisation est cliqué, actualiser la page
    document.getElementById('btnReload').addEventListener('click', () => {
        window.location.reload();
    });

    //Quand le bouton 'Rechercher' est cliqué
    document.getElementById('btnRechercher').addEventListener('click', () => {
        const prenom = document.getElementById('prenom').value;
        //Si le prénom et le département n'ont pas été sélectionnés
        if (prenom === '') {
            alert('Erreur, vous devez d\'abord sélectionner un prénom');
        }
        //Si on ne renseigne pas de département
        else {

            cacherInputAfficherDonnees();

            if (departementClick === undefined) {

                const parametres = { name: prenom }
                fetch('/query/selectAll/' + JSON.stringify(parametres)).then(res => {
                    res.json().then(queryResult => {
                        if (queryResult.length > 0) {

                            afficheTableauAll(queryResult, table, tableTitre);
                        } else {
                            alert('Aucun résultat. Veuillez vérifier le prénom que vous avez choisi.')
                        }
                    });
                });
            }
            //Si un nom + un département ont été sélectionné
            else {

                const parametres = {
                    dpt: departementClick,
                    name: prenom,
                }

                fetch('/query/select/' + JSON.stringify(parametres)).then(res => {
                    res.json().then(queryResult => {

                        if (queryResult.length > 0) {
                            drawGraph(queryResult);
                            afficheTableauSelect(queryResult, table, tableTitre);
                        } else {
                            alert('Aucun résultat. Veuillez vérifier le prénom que vous avez choisi.');
                        }
                    });
                });
            }
        }
    });
});

/**
 * Cache les éléments visibles de l'affichage et affiche les élémeInputés
 */
function cacherInputAfficherDonnees() {
    //Récupérer les éléments et les convertir en tableau
    //Car les HTMLCollection renvoyées évoluent dynamiquement selon le DOM
    const visibleArray = Array.from(document.getElementsByClassName("visible"));
    const cacheArray = Array.from(document.getElementsByClassName("cache"));

    //Inverser les visibilités
    for (const visibleElement of visibleArray) {
        visibleElement.classList.remove("visible");
        visibleElement.classList.add("cache");
    }
    for (const cacheElement of cacheArray) {
        cacheElement.classList.remove("cache");
        cacheElement.classList.add("visible");
    }
}


/**
 * Affiche le tableau des données d'un département d'après les résultat de la requête
 * @param {Object} queryResult Résultats de recherche
 * @param {HTMLTableElement} table Tbody où rajouter les données
 * @param {HTMLTableCellElement} tableTitre Th pour le titre de la table
 */
function afficheTableauSelect(queryResult, table, tableTitre) {
    const nom = queryResult[0].name;
    const departement = queryResult[0].dpt;

    videTable(table, tableTitre);

    let totalNumb = 0;
    for (const i in queryResult) {
        const row = table.insertRow(i);
        //Ajoute le nombre total de naissance pour un prénom
        totalNumb += parseInt(queryResult[i].numb);
        //Ajout de la ligne pour l'année de naissance
        row.insertCell(0).innerHTML = queryResult[i].birth;
        //Ajout de la ligne pour le nombre de naissance
        row.insertCell(1).innerHTML = queryResult[i].numb;
    }
    //Insertion d'une colonne supplémentaire pour ajouter le total
    table.insertRow(table.childNodes.length).insertCell(0).innerHTML = "TOTAL".bold();
    //Insertion dans la colonne crée du total de naissances
    table.rows[table.childNodes.length - 1].insertCell(1).innerHTML = totalNumb.toString().bold();

    let departementNom = document.getElementById("FR-" + departement).getAttribute("title");
    tableTitre.innerHTML = `Données pour le prénom ${nom} dans le département N°${departement} : ${departementNom}`;
}


/**
 * Affiche le tableau des données sur toutes la france d'après les résultat de la requête
 * @param {Object} queryResult Résultats de recherche
 * @param {HTMLTableElement} table Tbody où rajouter les données
 * @param {HTMLTableCellElement} tableTitre Th pour le titre de la table
 */
function afficheTableauAll(queryResult, table, tableTitre) {
    videTable(table, tableTitre);

    let totalNumb = 0;
    for (const i in queryResult) {
        const row = table.insertRow(i);
        //Détecte les départements spéciaux pour pouvoir chercher leur nom
        let departement = queryResult[i].dpt;
        if (departement < 10) departement = "0".concat(departement);
        //else if(departement === 20) departement = "2A";
        else if (departement >= 95) break;
        //Ajoute le nombre total de naissance pour un prénom
        totalNumb += parseInt(queryResult[i].totalNumb);
        let departementNom = document.getElementById("FR-" + departement).getAttribute("title")
        //Ajout de la ligne pour l'année de naissance
        row.insertCell(0).innerHTML = departement + " : " + departementNom;
        //Ajout de la ligne pour le nombre de naissance
        row.insertCell(1).innerHTML = queryResult[i].totalNumb;
    }
    //Insertion d'une colonne supplémentaire pour ajouter le total
    table.insertRow(table.childNodes.length).insertCell(0).innerHTML = "TOTAL".bold();
    //Insertion dans la colonne crée du total de naissances
    table.rows[table.childNodes.length - 1].insertCell(1).innerHTML = totalNumb.toString().bold();

    tableTitre.innerHTML = `Données pour le prénom ${document.getElementById('prenom').value} 
        dans toute la France (nombre de naissances par années cumulées par rapport aux départements)`;
}



/**
 * Vide la table des résultats
 * @param {HTMLTableElement} table Tbody où rajouter les données
 * @param {HTMLTableCellElement} tableTitre Th pour le titre de la table
 */
function videTable(table, tableTitre) {
    const childNodes = table.childNodes;
    for (let i = childNodes.length - 1; i >= 0; i--) {
        table.removeChild(childNodes[i]);
    }
    tableTitre.innerHTML = 'Données';
}