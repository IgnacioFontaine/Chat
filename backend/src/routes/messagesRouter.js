//Router de Rooms
// const { Router } = require("express");
import { Router } from "express";
import { getMessagesByRoom, createMessageDB} from "../controllers/messagesController"

const router = Router();

router.get("/", async (req, res) => {
  try {
    //Obtener mensajes
    // const { room } = req.params;
    // const messages = await getMessagesByRoom(room);
    res.status(200).send("Soy el router de menesajes")

    //Manejo error
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:room", async (req, res) => {
  try {
    //Obtener mensajes
    const { room } = req.params;
    const messages = await getMessagesByRoom(room);
    res.status(200).json(messages);

    //Manejo error
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Crear Mensaje
router.post("/", async (req, res) => {
  try {
    const { name, message, author, id_room } =
      req.body;

    //Crearla
    const newMessage = await createMessageDB(
      name,
      message,
      author,
      id_room
    );

    //Retornarla
    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;