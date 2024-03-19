import ACTION_TYPES from "./actionsTypes";

//Config initialState
const initialState = {
  user: null,
  rooms:[],
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