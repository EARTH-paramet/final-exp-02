const initialState = {
  uid: "",
  email: "",
  name: "",
  image: "",
  sub: "",
  scanner: false,
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
    case "SCANNER_ON":
          return{
            ...state,
              scanner:true
          }
    case "SCANNER_OFF":
          return{
            ...state,
              scanner:false
          }
    default:
      return state;
  }
};
