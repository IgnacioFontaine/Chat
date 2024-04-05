const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const roomsRouter = require("./videogamesRouter.js");
const messagesRoute = require("./videogameIdRouter");

//Ruter:
const router = Router();

// Configurar los routers
router.use("/rooms", videoGamesRouter);
router.use("/mesagges", videoGameIdRoute);
router.use("/genres", genresRouter);
router.use("/platforms", platformRouter);

module.exports = router;