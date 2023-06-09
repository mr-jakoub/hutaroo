import axios from 'axios'
import { GET_RECENT_USERS, CLEAR_USERS, DELETE_USER, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, LOGIN_SUCCESS, LOGOUT } from './types'
import { setAlert } from './alert'
import setAuthToken from '../utils/setAuthToken'

// Load user
export const loadUser = () => async dispatch =>{
    const token = localStorage.getItem('token')
    if(token){
        setAuthToken(token)
        try {
            const res = await axios.get('/api/auth')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL
            })
        }
    }
}

// Load recent users
export const getRecentUsers = () => async dispatch =>{
    dispatch({ type: CLEAR_USERS })
    try {
        const res = await axios.get('/api/users/recent')
        dispatch({
            type: GET_RECENT_USERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Register user
export const register = ({ account_type, name, email, password, gender, birthdate, phone }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ account_type, name, email, password, gender, birthdate, phone })
    try {
        const res = await axios.post('/api/users',body,config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Registration completed successfully.','success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    try {
        const res = await axios.post('/api/auth',body,config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
        dispatch(setAlert('Welcome back.','success'))
    } catch (err) {
        const errors = err.response.data.errors
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Logout
export const logout = () => dispatch =>{
    dispatch({ type: LOGOUT })
    dispatch(setAlert('See you next time.','success'))
}

// Delete account

export const deleteAccount = (id) => async (dispatch) => {
    try {
      await axios.delete(`/api/users/${id}`);
  
      dispatch({
        type: DELETE_USER,
        payload: id
      });
  
      dispatch(setAlert('User Removed', 'success'));
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
// Accept account

export const acceptAccount = (id) => async (dispatch) => {
    try {
      const res = await axios.post(`/api/users/accept/${id}`)
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
  
      dispatch(setAlert('User Accepted', 'success'));
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };
