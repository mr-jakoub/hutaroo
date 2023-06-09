import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading, token }, ...rest }) => {
    const [navbarHeight, setNavbarHeight] = useState(0)
    useEffect(() => {
        let navbarRef = document.getElementById('mainNavbar')
        setNavbarHeight(navbarRef.clientHeight)
    })
    return <Route {...rest} render={props => loading && token ? (
        <div style={navbarHeight > 0 ?{'top':`calc(${navbarHeight}px + 20px)`,'opacity':'1'}:{'top':`80px)`,'opacity':'1'}} className="body-loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    ): isAuthenticated ? ( <Component {...props} /> ) : (<Redirect to='/login' />)} />
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)