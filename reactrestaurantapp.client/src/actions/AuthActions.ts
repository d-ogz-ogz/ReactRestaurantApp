import { LOGIN, LOGIN_SUCCESS,LOGIN_ERROR, LOGOUT } from '../actionTypes/AuthActionTypes'
import { UserModel } from '../models/UserModel'


export const login = (user: UserModel) => {
    return {
        type: LOGIN,
        payload:user,
    }
}
export const loginSuccess = (successMessage: string) => {
    return {
        type: LOGIN_SUCCESS,
        payload: successMessage
    }
}

    export const loginError = (successMessage: string) => {
        return {
            type: LOGIN_ERROR,
            payload: successMessage,
        }
    }
    export const logOut = () => {
        return {
            type: LOGOUT,         
        }
    }