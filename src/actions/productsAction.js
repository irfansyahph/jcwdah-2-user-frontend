import axios from "axios";
import { API_URL } from "../helper";

// export const getProductsAction = () => {
//     return async (dispatch) => {
//         try {
//             let res = await axios.get(`${API_URL}/products/get`)
//             dispatch({
//                 type: "GET_PRODUCTS",
//                 payload: res.data
//             })
//             console.log("tesssss", res)
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export const getProductsAction = (products) => {
    return {
        type: "GET_PRODUCTS",
        payload: products
    }
}