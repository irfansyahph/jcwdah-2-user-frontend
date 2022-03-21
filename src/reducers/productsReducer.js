const INITIAL_STATE = {
    products: [],
    produk_id:null,
    nama_produk:""
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.key) {
        case "GET_PRODUCT_SUCCESS":
            return { ...state, products: action.payload }
        default:
            return state
    }
}