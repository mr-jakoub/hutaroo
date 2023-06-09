import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES } from "../actions/types"
const initialState = {
    user_profile: null,
    profiles: [],
    loading: true,
    error: {}
}

const profile = (state = initialState, action)=>{
    const { type, payload } = action
    switch(type){
        case GET_PROFILES:
            return{
                ...state,
                profiles: payload,
                loading: false
            }
        case GET_PROFILE:
            return{
                ...state,
                user_profile: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                user_profile: null,
                loading: false
            }
        default: return state
    }
}

export default profile