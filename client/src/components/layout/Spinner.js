import React from 'react'
import spinner from './spinner.gif'

const Spinner = () =>(
    <>
        <img className="spinner" src={spinner} style={{width:"50px", margin:"auto", display:"block" }} alt='Loading...' />
    </>
)

export default Spinner