// Definimos la ruta base del servidor GraphQL
const GRAPHQL_URL = "http://localhost:4000/";

// Arreglo local donde almacenaremos los datos traídos desde GraphQL
let graphqlData = [];

// Construimos una consulta GraphQL genérica (por ejemplo, obtener usuarios)
function buildQuery() {
  return `
    query {
      getAllUsers {
        id
        name
        email
        age
      }
    }
  `;
}

// Función asíncrona para obtener datos desde el proyecto GraphQL
async function fetchGraphqlData() {
  const query = buildQuery();

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) throw new Error("Error al obtener datos de GraphQL");

  const data = await res.json();
  const results = data?.data?.getAllUsers ?? [];

  graphqlData = results.map((item) => ({
    ...item,
    localId: crypto.randomUUID(), // si quieres tener un id local como hiciste con Apple
  }));

  return graphqlData;
}

// GET ALL (devuelve los datos ya cargados)
function findAll() {
  return graphqlData;
}

// GET ID
function findById(id) {
  return graphqlData.find((x) => x.localId === id) || null;
}

// POST
function addItem(item) {
  const newItem = { localId: crypto.randomUUID(), ...item };
  graphqlData.push(newItem);
  return newItem;
}

// PUT
function updateItem(id, data) {
  const i = graphqlData.findIndex((x) => x.localId === id);
  if (i === -1) return null;
  graphqlData[i] = { ...graphqlData[i], ...data };
  return graphqlData[i];
}

// DELETE
function deleteItem(id) {
  const i = graphqlData.findIndex((x) => x.localId === id);
  if (i === -1) return false;
  graphqlData.splice(i, 1);
  return true;
}

// Exportamos las funciones
module.exports = {
  fetchGraphqlData,
  findAll,
  findById,
  addItem,
  updateItem,
  deleteItem,
};
