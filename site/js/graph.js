/**
 * Supprime le canvas actuel et le recréé
 * @returns Le contexte du nouveau canvas
 */
function resetCanvas() {
    //Supprimer le canvas s'il existe
    const oldCanvas = document.getElementById('dataChart');
    if (oldCanvas) {
        oldCanvas.remove()
    }

    //Créer le canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'dataChart';
    canvas.width = '400';
    canvas.height = '400';
    document.getElementById('graphDiv').appendChild(canvas);

    //Retourner le contexte du nouveau canvas
    return canvas.getContext('2d');
}

/**
 * Trace un graphique dans un canvas selon les résultats de recherche
 * @param {Object} queryResult Résultats de recherche
 */
function drawGraph(queryResult) {
    const years = queryResult.map(queryResult => queryResult.birth);
    const nbNaiss = queryResult.map(queryResult => queryResult.numb);

    //Tracer le graphique à partir du contexte du canvas
    const ctx = resetCanvas();

    const dataChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: years,
            datasets: [{
                label: 'Nombre de Naissances',
                data: nbNaiss,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}