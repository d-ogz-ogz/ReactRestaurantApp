
const initialState = {
    success: false,
    error: false,
    isLogged: false,

}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                error: null,
                success: true,
                isLogged: true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error: true,
                isLogged: false
            };
        case LOGOUT:
            return {
                ...state,
                error: false,
                isLogged: false
            }
        default:
            return {
                state
            }
    }
}

export default authReducer;

