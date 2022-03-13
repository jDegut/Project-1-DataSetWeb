//Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {

    const div_autocompletion = document.getElementById('autocompletion');
    const input_prenom = document.getElementById('prenom');

    //Afficher une liste de prénoms selon l'entrée de l'utilisateur
    let isLoadingPrenom = false;

    input_prenom.addEventListener('input', () => {
        videPrenoms(div_autocompletion);

        if (!isLoadingPrenom) {
            isLoadingPrenom = true;

            fetch('/query/autocompletion/' + JSON.stringify({ name: input_prenom.value.toUpperCase() })).then(res => {
                res.json().then(queryResult => {
                    affichePrenoms(queryResult, div_autocompletion, input_prenom);
                    isLoadingPrenom = false;
                });
            });
        }
    });

    //Remplir la case avec le nom choisi
    div_autocompletion.addEventListener('click', (event) => {
        input_prenom.value = event.target.innerHTML;
        videPrenoms(div_autocompletion);
    });
});



/**
 * Vide la div d'autocomplétion des prénoms
 * @param {HTMLDivElement} div_autocompletion Div d'affichage des prénoms
 */
function videPrenoms(div_autocompletion) {
    const childNodes = div_autocompletion.childNodes;
    for (let i = childNodes.length - 1; i >= 0; i--) {
        div_autocompletion.removeChild(childNodes[i]);
    }
}


/**
 * Affiche une div d'autocomplétion selon l'entrée utilisateur
 * @param {Object} queryResult Résultats de recherche
 * @param {HTMLDivElement} div_autocompletion Div d'affichage des prénoms
 * @param {HTMLInputElement} input_prenom Input de saisie du prénom
 */
function affichePrenoms(queryResult, div_autocompletion, input_prenom) {
    if (input_prenom.value.length >= 1){
        queryResult.forEach(element => {
            const p = document.createElement('p');
            p.innerHTML = element.name;
            div_autocompletion.appendChild(p);
        });
    }
}
