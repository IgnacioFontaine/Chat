//Router de Rooms
const { Router } = require("express");
const { getMessagesByRoom, createMessageDB } = require("");

const router = Router();

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
    const { name, message, id_author } =
      req.body;

    //Crearla
    const newMessage = await createMessageDB(
      name,
      message,
      id_author
    );

    //Retornarla
    res.status(200).json(newMessage);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;