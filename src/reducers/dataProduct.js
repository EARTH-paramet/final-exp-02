const initialState = {
    productData: [
        // {
        //     id:"",
        //     value:{
        //         category:"",
        //         image:"",
        //         note:"",
        //         name:"",
        //         date:{
        //             seconds:1651510800,
        //             nanoseconds:0
        //         }
        //     }
        // }
    ],
    masterProduct: [
        {
            barcode: "9770012345673",
            name: "coke",
            category: "water",
        },
    ],
};
export default (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                productData: action.payload,
            };
        case "CHECK_PRODUCT":
            return {
                ...state,
                productData: action.payload,
            };
        default:
            return state;
    }
};
