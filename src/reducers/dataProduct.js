const initialState = {
  productData: [],
  masterProduct: [],
  byGroup: "1",
};
export default (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      return {
        ...state,
        productData: action.payload,
      };
    case "ADD_MASTER_PRODUCT":
      return {
        ...state,
        masterProduct: action.payload,
      };
    case "CHECK_PRODUCT":
      return {
        ...state,
        productData: action.payload,
      };
    case "EDIT_GROUP":
      return {
        ...state,
        byGroup: action.payload,
      };
    default:
      return state;
  }
};
