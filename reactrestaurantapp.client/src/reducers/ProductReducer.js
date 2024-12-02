
const initialState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null, 
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                productList: action.payload,
                error: null,
                loading: true,
                selectedProduct:null
            }
        case GET_PRODUCTS_FAILURE:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default productReducer;