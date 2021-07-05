const init_state = {
  username: "",
  fullName: "",
  email: "",
  role: "",
  id: 0,
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
