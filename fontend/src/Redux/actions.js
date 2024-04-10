import ACTION_TYPES from "./actionsTypes";
import { db } from "../firebase"
import { collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc, arrayUnion } from "firebase/firestore"; 

export const setUser = (user) => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_TYPES.SET_USER,
        payload: user,
      });
    } catch (error) {
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
};

export const setUserUid = (uid) => {
  
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_TYPES.SET_USER_UID,
        payload: uid,
      });
    } catch (error) {
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
};

export const newFirebaseRoom = (room) => {
  return async (dispatch) => {
    try {
    const docRef = await addDoc(collection(db, "rooms"), {
    name: room.name,
    id: room.id,
    room_user: room.user_id
  });
  console.log("Document written with ID: ", docRef.id);
  } catch (event) {
      console.error("Error adding document: ", event);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: event });
  }
  };
}


export const newFirebaseMessage = (message) => {
  return async (dispatch) => {
    try {

      const docRef = await addDoc(collection(db, "message"),{
      message: message.message,
      room: message.room,
      author: message.author,
      time: message.time,
      id: message.id 
    })

    console.log("Document written with ID: ", docRef.id);

  } catch (event) {
      console.error("Error adding document: ", event);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: event });
  }
  };
}

// export const newFirebaseMessage = (message) => {
//   return async (dispatch) => {
//     try {
//       const newMessage = {
//       message: message.message,
//       room: message.room,
//       author: message.author,
//       time: message.time,
//       id: message.id 
//     };

//     // Actualiza el campo "messages" en el documento de la sala
//     await updateDoc(doc(db, "rooms", message.room), {
//       messages: arrayUnion(newMessage) // Usa arrayUnion para agregar el nuevo mensaje al array existente
//     });

//   } catch (event) {
//       console.error("Error adding document: ", event);
//       return dispatch({ type: ACTION_TYPES.ERROR, payload: event });
//   }
//   };
// }

export const getFirebaseRooms = (uid) => {
  return async (dispatch) => {
    try {
      const query_get = query(collection(db, "rooms"), where("room_user", "==", uid));
      const querySnapshot = await getDocs(query_get);

      const all_rooms_firebase = [];

      querySnapshot.forEach((doc) => {
        all_rooms_firebase.push(doc.data());
      });
      
      dispatch({
        type: ACTION_TYPES.GET_USER_ROOMS,
        payload: all_rooms_firebase,
      });
  
  } catch (event) {
      console.error("Error adding document: ", event);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: event });
  }
  };
  
}


export const getMessageByRoom = (room) => {
  return async (dispatch) => {
    try {
      const query_get = query(collection(db, "message"), where("room", "==", room));
      const querySnapshot = await getDocs(query_get);

      const all_message_room = [];

      querySnapshot.forEach((doc) => {
        all_message_room.push(doc.data());
      });

      dispatch({
        type: ACTION_TYPES.GET_MESSAGES_ROOM,
        payload: all_message_room,
      });
  
  } catch (event) {
      console.error("Error: ", event);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: event });
  }
  };
  
}

export const deleteFirestoreRoom = (id) => {
  return async (dispatch) => {
    try {
      const query_delete = query(collection(db, "rooms"), where("id", "==", id));
      const queryDelete = await deleteDoc(doc(query_delete));
      
    } catch (error) {
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
}

export const deleteRoom = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_TYPES.DELETE_ROOM_SUCCES,
        payload: id,
      });
    } catch (error) {
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
}

export const modifyRoom = ({id,updateName}) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_TYPES.MODIFY_ROOM_SUCCES,
        payload: {id,updateName},
      });
    } catch (error) {
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
}

export const selectRoom = (room) => {

  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_TYPES.SELECT_ROOM,
        payload: room,
      });
    } catch (error) {
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
}
