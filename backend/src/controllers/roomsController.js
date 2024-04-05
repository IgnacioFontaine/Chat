const { Room } = require("../db");

//Obtener Rooms
const getRoomsByUser = async (user) => {
  try {
    //Los videojuegos en la base de datos
    let roomsInDB = await Room.findAll({
      where: { id_author: user },
    });

    return roomsInDB;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getRoomsByUser,
};