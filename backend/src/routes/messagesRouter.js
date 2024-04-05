//Router de Rooms
const { Router } = require("express");
const { getMessagesByRoom } = require("");

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

module.exports = router;