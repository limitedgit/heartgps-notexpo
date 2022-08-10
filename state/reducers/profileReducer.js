const setAge = "setAge";
const setGender = "setGender";
const setGenderPref = "setGenderPref";
const setName = "setName";

const initalState = {
    age: null,
    gender: null,
    genderPref: null,
}


const reducer = (state = initalState, action) => {
    switch (action.type) {
        case setAge:
            return {
                ...state,
                age : action.payload
            }
        case setName:
            return{
                ...state,
                name: action.payload
            }
        case setGender:
            return {
                ...state,
                gender: action.payload
            }
        case setGenderPref:
            return {
                ...state,
                genderPref: action.payload
            }
        default:
            return state;           
    }
};

export default reducer;