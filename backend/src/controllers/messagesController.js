import  Message  from "../db.js";

//Obtener Rooms
const getMessagesByRoom = async (room) => {
  try {
    //Los mensajes de las salas en DB 
    let messagesInDB = await Message.findAll({
      where: { id_room: room },
    });

    return messagesInDB;
  } catch (error) {
    throw new Error(error);
  }
};

const createMessageDB = async (
  name,
  message,
  author,
  id_room
) => {
  try {
    let newMessageDB = await Message.create({
      name,
      message,
      author,
      id_room
    });
    return newMessageDB;
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  getMessagesByRoom,
  createMessageDB
};