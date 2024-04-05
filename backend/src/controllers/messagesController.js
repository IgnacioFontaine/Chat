const { Message } = require("../db");

//Obtener Rooms
const getMessagesByRoom = async (room) => {
  try {
    //Los mensajes de las salas en DB 
    let roomsInDB = await Message.findAll({
      where: { id_author: user },
    });

    return roomsInDB;
  } catch (error) {
    throw new Error(error);
  }
};

const createRoomDB = async (
  name,
  id_author
) => {
  try {
    let newRoomDB = await Room.create({
      name,
      id_author
    });
    return newRoomDB;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getRoomsByUser,
  createMessageDB
};