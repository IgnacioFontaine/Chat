//Router de Rooms
const { Router } = require("express");
const { getRoomsByUser } = require("");

const router = Router();

router.get("/", async (req, res) => {
  try {
    //Obtener plataformas
    const rooms = await getRoomsByUser();
    res.status(200).json(platforms);

    //Manejo error
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;