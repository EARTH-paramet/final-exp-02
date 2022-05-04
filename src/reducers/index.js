import { combineReducers } from "redux";
import dataProduct from "./dataProduct";
import dataUser from "./dataUser";
import dataCategory from "./dataCategory";
import dataFilter from "./dataFilter";
export default combineReducers({
    dataProduct,
    dataCategory,
    dataUser,
    dataFilter
});
