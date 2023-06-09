<<<<<<< HEAD
import { combineReducers } from "redux"
import alert from './alert'
import auth from './auth'
import post from './post'

export default combineReducers({
    alert,
    auth,
    post
=======
import { combineReducers } from "redux"
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post.js'

export default combineReducers({
    alert,
    auth,
    profile,
    post
>>>>>>> b67e24a3929c7e439e1e96708c69243c94545298
})