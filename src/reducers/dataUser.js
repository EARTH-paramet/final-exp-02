const initialState = {
  uid: "",
  email: "",
  name: "",
  image: "",
  // phone: "",
  status:false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.name,
        image: action.payload.image,
        sub: action.payload.sub,
        status:true
      };
      case "SIGN_OUT":
          return{
            ...state,
              status:false
          }
    default:
      return state;
  }
};
