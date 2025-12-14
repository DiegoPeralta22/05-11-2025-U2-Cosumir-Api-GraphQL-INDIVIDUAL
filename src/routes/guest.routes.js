const express = require("express");
const router = express.Router();
const graphqlController = require("../controllers/guest.controller");

// Ruta para obtener datos desde GraphQL
router.get("/fetch", graphqlController.fetchData);

// Rutas CRUD locales
router.get("/", graphqlController.getAll);
router.get("/:id", graphqlController.getById);
router.post("/", graphqlController.create);
router.put("/:id", graphqlController.update);
router.delete("/:id", graphqlController.remove);

module.exports = router;
