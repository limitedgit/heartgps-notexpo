const login = "login";
const logout = "logout";


const reducer = (state = false, action) => {
    switch (action.type) {
        case login:
            return true;
        case logout:
            return false;
        default:
            return false;           
    }
};

export default reducer;