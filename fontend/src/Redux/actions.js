import { collection, addDoc, query, where, getDocs, getFirestore , deleteDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL,  } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import ACTION_TYPES from "./actionsTypes";
import { db } from "../firebase"

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
      type:message.type,  
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

export const newFirebaseFile = (message) => {
  return async (dispatch) => {
    try {
      const db = getFirestore();
      const storage = getStorage();

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `files/${message.id}`);
      await uploadBytes(storageRef, message.message);

      // Get download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Save message data in Firestore with file URL
      const docRef = await addDoc(collection(db, "message"), {
        message: downloadURL,
        type: message.type,
        room: message.room,
        author: message.author,
        time: message.time,
        id: message.id
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
};

export const newFirebaseAudio = (message) => {
  return async (dispatch) => {
    try {
      const db = getFirestore();
      const storage = getStorage();

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `audio/${message.id}`);
      await uploadBytes(storageRef, message.message);

      // Get download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      // Save message data in Firestore with file URL
      const docRef = await addDoc(collection(db, "audio"), {
        message: downloadURL,
        type: message.type,
        room: message.room,
        author: message.author,
        time: message.time,
        id: message.id
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
};

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

export const deleteFirestoreRoom = (roomId) => {
  return async () => {
        try {
        // Busca Sala con el ID proporcionado
          const querySnapshot = query(collection(db, "rooms"), where("id", "==", roomId))
          const querySnapshotGet = await getDocs(querySnapshot);

        // Busca mensajes con el ID proporcionado
        //  const query_get = query(collection(db, "message"), where("room", "==", roomId));
        //  const queryMessage = await getDocs(query_get);

        // Verifica si se encontró algún documento con el ID
        if (!querySnapshotGet.empty) {
          // Elimina el primer documento encontrado (suponiendo que solo hay uno)
          const docRef = querySnapshotGet.docs[0].ref;

          await deleteDoc(docRef);
          console.log('Documento eliminado correctamente.');
          //Eliminar mensajes

          //   queryMessage.forEach(async(doc) => {
          //      await deleteDoc(doc)
          //   console.log('Eliminado mensaje:', doc);
          //  });
        } else {
          console.log('No se encontró ningún documento con el ID proporcionado.');
        }
      } catch (error) {
        console.error('Error al intentar eliminar el documento:', error);
      }
    };
}

export const setUidUserPic = (userPic) => {
  
  return async (dispatch) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser
      const db = getFirestore();
      const storage = getStorage();

      // Upload file to Firebase Storage
      const storageRef = ref(storage, `files/${user}`);
      await uploadBytes(storageRef, userPic);

      // Get download URL of the uploaded file
      const downloadURL = await getDownloadURL(storageRef);

      updateProfile(user, {
        photoURL: downloadURL,
      })

    } catch (error) {
      console.error("Error adding document: ", error);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: error });
    }
  };
  
}

export const createFirebaseUser = (user) => {
  return async (dispatch) => {
    try {

      console.log("Usuario creado exitosamente:", user);
  
  } catch (event) {
      console.error("Error adding document: ", event);
      return dispatch({ type: ACTION_TYPES.ERROR, payload: event });
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
