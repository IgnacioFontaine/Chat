import ACTION_TYPES from "./actionsTypes";

//Config initialState
const initialState = {
  user: null,
  rooms: [],
  select_room:{},
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
    
    case ACTION_TYPES.CREATE_ROOM:
      return {
        ...state,
        rooms:[...state.rooms, action.payload]
      }
    
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