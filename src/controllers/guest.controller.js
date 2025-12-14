// controllers/graphqlController.js
const graphqlModel = require("../models/guest.model");

// CONTROLADOR: Obtener datos desde GraphQL y guardarlos localmente
async function fetchData(req, res) {
  try {
    const data = await graphqlModel.fetchGraphqlData();
    res.json({
      message: "Datos obtenidos desde GraphQL correctamente",
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// GET ALL
function getAll(req, res) {
  const items = graphqlModel.findAll();
  res.json(items);
}

// GET ID
function getById(req, res) {
  const { id } = req.params;
  const item = graphqlModel.findById(id);
  if (!item) {
    return res.status(404).json({ message: "Elemento no encontrado" });
  }
  res.json(item);
}

// POST
function create(req, res) {
  const item = graphqlModel.addItem(req.body);
  res.status(201).json({
    message: "Elemento agregado correctamente",
    item,
  });
}

// PUT
function update(req, res) {
  const { id } = req.params;
  const updated = graphqlModel.updateItem(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Elemento no encontrado" });
  }
  res.json({
    message: "Elemento actualizado correctamente",
    updated,
  });
}

// DELETE
function remove(req, res) {
  const { id } = req.params;
  const deleted = graphqlModel.deleteItem(id);
  if (!deleted) {
    return res.status(404).json({ message: "Elemento no encontrado" });
  }
  res.json({ message: "Elemento eliminado correctamente" });
}

module.exports = {
  fetchData,
  getAll,
  getById,
  create,
  update,
  remove,
};
