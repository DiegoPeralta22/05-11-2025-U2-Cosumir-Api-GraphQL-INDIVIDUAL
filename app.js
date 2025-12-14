const express = require("express");
const graphqlRoutes = require("../ejercicio1/src/routes/guest.routes"); // ← tus rutas nuevas

const app = express();

app.use(express.json());

app.use("/api/graphql", graphqlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor REST corriendo en http://localhost:${PORT}`);
});
