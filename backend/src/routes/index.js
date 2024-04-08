// const { Router } = require("express");
import { Router } from "express";
import roomsRouter from "./roomsRouter.js"
import messagesRouter from "./messagesRouter.js"


//Ruter:
const router = Router();

// Configurar los routers
router.use("/rooms", roomsRouter);
router.use("/mesagges", messagesRouter);


export default router;
// module.exports  = router;