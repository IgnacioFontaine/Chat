import ACTION_TYPES from "./actionsTypes";

//Config initialState
const initialState = {
  user: null,
  user_uid: null,
  user_pic:null,
  rooms_firebase: [],
  messages_room: [],
  select_room: null,
  error: false,
  errormsg: {},
};

//Config reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user:action.payload
      }
    
    case ACTION_TYPES.SET_USER_UID:
      return {
        ...state,
        user_uid:action.payload
      }
    
    case ACTION_TYPES.DELETE_ROOM_SUCCES:
      return {
        ...state,
        rooms: state.rooms.filter(rooms => rooms.id !== action.payload)
      };
    
    case ACTION_TYPES.GET_USER_ROOMS:
      return {
        ...state,
        rooms_firebase: action.payload
      };
    
    case ACTION_TYPES.GET_PROFILE_PIC:
      return {
        ...state,
        user_pic: action.payload
      };
    
    case ACTION_TYPES.GET_MESSAGES_ROOM:
      return {
        ...state,
        messages_room: action.payload
      };
    
    case ACTION_TYPES.DELETE_ROOM_FAILURE:
      return {
        ...state
      };
    
    case ACTION_TYPES.SELECT_ROOM:
      return {
        ...state,
        select_room:action.payload
      }
    
    case ACTION_TYPES.ERROR:
      return {
        ...state,
        error: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;