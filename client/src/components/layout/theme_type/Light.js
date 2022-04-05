import React from 'react'

const Light = ()=> {
    return (
        <>
                {document.documentElement.style.setProperty('--White-color', '#f5f5f5')}
                {document.documentElement.style.setProperty('--Dark-color', '#242526')}
                {document.documentElement.style.setProperty('--Light-color', '#e7e7e7')}
                {document.documentElement.style.setProperty('--box-shadow', '0 2px 2px rgba(0,0,0,.08),0 0 2px rgba(0,0,0,.08)')}
                {document.documentElement.style.setProperty('--box-shadow2', '0 0 2px rgba(0,0,0,.12),0 0 2px rgba(0,0,0,.15)')}
                {document.documentElement.style.setProperty('--shadow-sm', 'rgba(0,0,0,.38)')}
                {document.documentElement.style.setProperty('--trangle-shadow', '0 -.5px .5px rgba(0,0,0,.15)')}
        </>
    )
}

export default Light
