import ACTION_TYPES from "./actionsTypes";

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
