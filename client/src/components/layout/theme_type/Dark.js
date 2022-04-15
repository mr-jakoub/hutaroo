import React from 'react'

const Dark = ()=> {
    return (
        <>
            {document.documentElement.style.setProperty('--White-color', '#242526')}
            {document.documentElement.style.setProperty('--Dark-color', '#f5f5f5')}
            {document.documentElement.style.setProperty('--Light-color', '#2b2a2a')}
            {document.documentElement.style.setProperty('--Smooth-Back', 'rgba(255,255,255,.07)')}
            {document.documentElement.style.setProperty('--box-shadow', '0 2px 2px rgba(255,255,255,.08),0 0 2px rgba(255,255,255,.08)')}
            {document.documentElement.style.setProperty('--box-shadow2', '0 0 2px rgba(255,255,255,.12),0 0 2px rgba(255,255,255,.15)')}
            {document.documentElement.style.setProperty('--shadow-sm', 'rgba(255,255,255,.38)')}
            {document.documentElement.style.setProperty('--trangle-shadow', '0 -.5px .5px rgba(255,255,255,.15)')}
        </>
    )
}

export default Dark