import {combineReducers} from "redux";
import login from "./loginReducer";
import location from "./locationReducer";
import user from './userReducer';
import profile from './profileReducer'

const reducers = combineReducers({
    login,
    location,
    user,
    profile,
})

export default reducers


