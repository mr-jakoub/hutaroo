import axios from 'axios'

const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['hutaro-auth-token'] = token
    }else{
        delete axios.defaults.headers.common['hutaro-auth-token']
    }
}

export default setAuthToken