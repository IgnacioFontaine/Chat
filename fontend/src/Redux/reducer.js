import ACTION_TYPES from "./actionsTypes";

//Config initialState
const initialState = {
  user: null,
  error: false,
  errormsg: {},
};

//Config reducer
const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    
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