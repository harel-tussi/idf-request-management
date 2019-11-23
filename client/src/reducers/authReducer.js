const initialState = {
  user: null,
  loading: true,
  token: localStorage.getItem("token")
};

if (!initialState.token) {
  initialState.loading = false;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGNIN":
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case "VERIFY_TOKEN":
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case "SIGNOUT": {
      return {
        ...state,
        user: null
      };
    }
    default:
      return state;
  }
};
