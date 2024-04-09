import ACTION_TYPES from "./actionsTypes";
import { db } from "../firebase"
import { collection, addDoc } from "firebase/firestore"; 




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

export const newRoom = (room) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ACTION_TYPES.CREATE_ROOM,
        payload: room,
      });
    } catch (error) {
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
}

export const newFirebaseRoom = (room) => {
  return async (dispatch) => {
    try {
    const docRef = await addDoc(collection(db, "rooms"), {
    name: room.name,
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
  } catch (event) {
    console.error("Error adding document: ", event);
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
