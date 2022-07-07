const initalState = {
    currentUser: null,
}

const user = (state = initalState, action ) => {
    switch (action.type){
        case "setUser":
            return {
                ...state,
                currentUser: action.payload
            }
        case "logout":
            return {
                ...state,
                currentUser: null
            }
        default:
            return initalState
    }
}

export default user