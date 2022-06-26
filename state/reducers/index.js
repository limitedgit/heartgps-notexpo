import {combineReducers} from "redux";
import login from "./loginReducer";
import location from "./locationReducer";
import user from './userReducer'

const reducers = combineReducers({
    login,
    location,
    user,
})

export default reducers


