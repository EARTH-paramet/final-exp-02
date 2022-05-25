const initialState = {
  sort: "ascDate",
  fridgeNotification: "group1",
  dateNotification: "",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        sort: action.payload,
      };
    case "SET_FILTER_FRIDGE":
      return {
        ...state,
        fridgeNotification: action.payload,
      };
      case "SET_FILTER_DATE":
        return {
          ...state,
          dateNotification: action.payload,
        };

    default:
      return state;
  }
};
