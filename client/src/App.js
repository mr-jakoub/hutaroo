import React, { useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from './components/routing/PrivateRoute'

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

window.addEventListener("load",()=>{
const THEME_TYPE = localStorage.getItem("THEME_TYPE")
    if(THEME_TYPE === "DARK_MODE"){
      document.documentElement.style.setProperty('--White-color', '#1a1a1a')
      document.documentElement.style.setProperty('--White-color-secondary', '#2a2b2b')
      document.documentElement.style.setProperty('--Dark-color', '#f5f5f5')
      document.documentElement.style.setProperty('--Light-color', '#141414')
      document.documentElement.style.setProperty('--Grey-color', '#b0b3b8')
      document.documentElement.style.setProperty('--Smooth-Back', 'rgba(0,0,0,.07)')
      document.documentElement.style.setProperty('--box-shadow', '0 2px 2px rgba(255,255,255,.08),0 0 2px rgba(255,255,255,.08)')
      document.documentElement.style.setProperty('--box-shadow2', '0 0 2px rgba(255,255,255,.12),0 0 2px rgba(255,255,255,.15)')
      document.documentElement.style.setProperty('--shadow-sm', 'rgba(255,255,255,.38)')
      document.documentElement.style.setProperty('--trangle-shadow', '0 -.5px .5px rgba(255,255,255,.15)')
    }
})

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <div className="alerts">
          <Alert />
        </div>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/dashboard/:new' component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
