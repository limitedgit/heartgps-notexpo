import {combineReducers} from "redux";
import loginReducer from "./loginReducer";
import locationReducer from "./locationReducer";

const reducers = combineReducers({
    loginReducer,
    locationReducer,
})

export default reducers


