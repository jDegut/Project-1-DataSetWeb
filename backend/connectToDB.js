const mysql = require('mysql2/promise');
//https://www.npmjs.com/package/mysql2

let db;

(async () => {
  try {
    db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'datawebset'
    });
    console.log('Connecté à la BD !');
  } catch (error) {
    console.error(error);
  }

})();

/**
 * Construit une requête SELECT d'après un objet passé en paramètres
 * @param {Object} queryArgs Valeurs des paramètres pour le WHERE de la requête
 * @returns Object: La requête à préparer et le tableau des valeurs à remplacer
 */
function prepareQueryAndArgs(queryArgs) {

  let baseQuery = 'SELECT sexe, name, birth, dpt, numb FROM main';

  let whereProps = [];
  let prepareValues = [];

  if (queryArgs) {
    for (const prop in queryArgs) {
      //Si le paramètre passé est une liste :
      if (Array.isArray(queryArgs[prop])) {
        //? ==> variable sans nom que l'on attribut après
        whereProps.push(`\`${prop}\` BETWEEN ? AND ?`);
        prepareValues.push(queryArgs[prop][0], queryArgs[prop][1]);

      } else {

        whereProps.push(`\`${prop}\` = ?`);
        prepareValues.push(queryArgs[prop]);
      }
    }

    baseQuery += ` WHERE ${whereProps.join(' AND ')} ORDER BY birth`;
  }

  return { baseQuery: baseQuery, prepareValues: prepareValues }
}


/**
 * Effectue une requête SELECT sur la BD selon les paramètres fournis
 * @param {Object} queryArgs Valeurs des paramètres pour le WHERE de la requête
 * @returns Le résultat de requête
 */
const querySelectSimple = async (queryArgs) => {

  const [rows] = await db.execute(
    'SELECT sexe, name, birth, dpt, numb FROM main WHERE dpt = ? AND name = ?',
    Object.values(queryArgs)
  );

  return rows;
}


/**
 * Effectue une requête SELECT sur la BD pour récupérer 5 noms
 * @param {Object} queryArgs Valeurs des paramètres pour le WHERE de la requête
 * @returns Le résultat de requête
 */
const queryAutocompletion = async (queryArgs) => {

  queryArgs['name'] += '%';

  const [rows] = await db.execute(
    'SELECT DISTINCT name FROM main WHERE name LIKE ? LIMIT 5',
    Object.values(queryArgs)
  )
  return rows;
}


/**
 * Effectue une requête SELECT sur la BD pour récupérer la répartition des noms sur toute la France
 * @param {Object} queryArgs Valeurs des paramètres pour le WHERE de la requête
 * @returns Le résultat de requête
 */
const querySelectAll = async (queryArgs) => {

  const [rows] = await db.execute(
    'SELECT SUM(numb) AS totalNumb, dpt FROM main WHERE name = ? GROUP BY dpt',
    Object.values(queryArgs)
  )
  return rows;
}



module.exports = {
  querySelectSimple: querySelectSimple,
  queryAutocompletion: queryAutocompletion,
  querySelectAll: querySelectAll
}



