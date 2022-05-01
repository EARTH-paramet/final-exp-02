import { combineReducers } from "redux";
import dataProduct from "./dataProduct";
import dataUser from "./dataUser";
import dataCategory from "./dataCategory";
export default combineReducers({
    dataProduct,
    dataCategory,
    dataUser
});
