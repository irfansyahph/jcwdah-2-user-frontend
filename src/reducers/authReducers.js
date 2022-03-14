
const INITIAL_STATE = {
    user_id: null,
    email: "",
    user_role: "",
    cart: [],
    transactions: []
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            console.log("REDUCER ==> Data dari authAction:", action.payload)
            return { ...state, ...action.payload }
        case "UPDATE_CART":
            return { ...state, cart: action.payload }
        case "UPDATE_ADDRESS":
            return { ...state, cart: action.payload }
        case "GET_TRANSACTIONS":
            console.log("GET TRANSACTIONS ==>", action.payload)
            return { ...state, transactions: action.payload }
        case "LOGOUT":
            // reset ulang data reducer dgn INITIAL_STATE
            return { ...state, ...INITIAL_STATE }
        default:
            return state;
    }

}