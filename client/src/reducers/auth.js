import { GET_RECENT_USERS, CLEAR_USERS, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCESS, LOGOUT } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    users: null
}

const auth = (state = initialState, action)=>{
    const { type, payload } = action
    switch(type){
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case GET_RECENT_USERS:
        return{
            ...state,
            users: payload,
            loading: false
        }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case CLEAR_USERS:
            return{
                ...state,
                users: null,
                loading: false
            }
        default: return state
    }
}
export default auth