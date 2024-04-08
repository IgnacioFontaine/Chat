const { Router } = require("express");

const roomsRouter = require("./videogamesRouter.js");
const messagesRoute = require("./videogameIdRouter");

//Ruter:
const router = Router();

// Configurar los routers
router.use("/rooms", roomsRouter);
router.use("/mesagges", messagesRoute);


module.exports  = router;