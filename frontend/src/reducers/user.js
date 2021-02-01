const initialState = {
  id: "",
  mail: "",
  firstname: "",
  lastname: "",
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, ...action.user };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};
