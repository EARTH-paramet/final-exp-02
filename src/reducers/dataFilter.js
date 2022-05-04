const initialState = {
    sort:"ascDate"
  };
  export default (state = initialState, action) => {
    switch (action.type) {
      case "SET_FILTER":
        return {
          ...state,
          sort:action.payload
        };
     
      default:
        return state;
    }
  };
  