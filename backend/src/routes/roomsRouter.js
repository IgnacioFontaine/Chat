//Router de Rooms
// const { Router } = require("express");
import { Router } from "express";
import {getRoomsByUser, createRoomDB} from "../controllers/roomsController"

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send("Soy el router de Salas")

    //Manejo error
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:user", async (req, res) => {
  try {
    //Obtener plataformas
    const { user } = req.params;
    const rooms = await getRoomsByUser(user);
    res.status(200).json(rooms);

    //Manejo error
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//Crear Sala
router.post("/", async (req, res) => {
  try {
    const { name, id_author } =
      req.body;

    //Crearla
    const newRoom = await createRoomDB(
      name,
      id_author
    );

    //Retornarla
    res.status(200).json(newRoom);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;