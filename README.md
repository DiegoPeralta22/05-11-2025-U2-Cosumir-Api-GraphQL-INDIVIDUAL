l sistema funciona como un "puente" o *Gateway*:
1.  **Consumo de Servicios:** Se conecta a un servidor GraphQL externo (en `localhost:4000`) mediante peticiones HTTP `POST`.
2.  **Persistencia Volátil:** Los datos obtenidos se almacenan en un arreglo en memoria local para realizar pruebas rápidas sin base de datos física.
3.  **Gestión Híbrida:**
    * **Sincronización:** Endpoint dedicado (`/fetch`) para traer y normalizar datos desde GraphQL.
    * **CRUD Local:** Operaciones REST completas (GET, POST, PUT, DELETE) para administrar la información traída.

##  Arquitectura y Tecnologías

* **Backend:** Node.js + Express.
* **Patrón de Diseño:** MVC (Modelo - Vista - Controlador) para separar la lógica de negocio de las rutas.
* **Comunicación:** Uso nativo de `fetch` para realizar *queries* al servidor GraphQL.
* **Identificadores:** Generación de `localId` mediante `crypto.randomUUID()` para gestionar los registros localmente.

##  Endpoints de la API

La ruta base es `/api/graphql`.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/fetch` | **Clave:** Ejecuta la *query* `getAllUsers` al servidor GraphQL y llena la memoria local. |
| `GET` | `/` | Obtiene todos los elementos almacenados localmente (`findAll`). |
| `GET` | `/:id` | Busca un elemento por su ID local (`findById`). |
| `POST` | `/` | Agrega un nuevo elemento al arreglo en memoria (`addItem`). |
| `PUT` | `/:id` | Actualiza un elemento existente (`updateItem`). |
| `DELETE`| `/:id` | Elimina un elemento del arreglo local (`deleteItem`). |

