const initialState = {
    categoryData: [
        
    ],
    // masterProduct: [
    //     {
    //         barcode: "8853253001216",
    //         name: "coke",
    //         category: "water",
    //     },
    // ],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            return {
                ...state,
                categoryData: action.payload,
            };
        case "CHECK_CATEGORY":
            return {
                ...state,
                categoryData: action.payload,
            };
        default:
            return state;
    }
};
