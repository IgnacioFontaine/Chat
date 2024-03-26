import ACTION_TYPES from "./actionsTypes";

//Config initialState
const initialState = {
  user: null,
  rooms: [],
  select_room:null,
  error: false,
  errormsg: {},
};

//Config reducer
const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return {
        ...state,
        user:action.payload
      }
    
    case ACTION_TYPES.CREATE_ROOM:
      return {
        ...state,
        rooms:[...state.rooms, action.payload]
      }
    
    case ACTION_TYPES.DELETE_ROOM_SUCCES:
      return {
        ...state,
        rooms: state.rooms.filter(rooms => rooms.id !== action.payload)
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