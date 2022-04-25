import axios from 'axios'
import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES } from './types'
import { setAlert } from './alert'
import { loadUser } from './auth'

// Get current users profile
export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get profiles
export const getProfiles = () => async dispatch =>{
    dispatch({ type: CLEAR_PROFILE })
    try {
        const res = await axios.get('/api/profile')
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get profile by ID
export const getProfileById = userId => async dispatch =>{
    try {
        const res = await axios.get(`/api/profile/user/${userId}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Update profile
export const updateProfile = (formData) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        const res = await axios.post('/api/profile/info', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert( 'Profile updated successfully' , 'success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Update Security
export const updateSecurityInfo = ({ secret_word, current_password, new_password }) => async dispatch =>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ secret_word, current_password, new_password })
        await axios.post('/api/profile/security', body, config)
        dispatch(setAlert( 'Security information updated successfully' , 'success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}