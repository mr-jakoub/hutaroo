import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import TextareaAutosize from 'react-autosize-textarea'
import defaultImg from '../../assets/img/default.png'
import { addPost } from '../../actions/post'
import userNameHandler from '../../utils/userNameHandler'

const PostForm = ({ addPost, auth:{ user } }) => {
    const [activeBox, setActiveBox] = useState({
        emojis: false,
        locationPage: false,
        backPage: false
    })
    const { emojis, locationPage, backPage } = activeBox
    const history = useHistory()
    // Create post
    const [formData, setFormData] = useState({
        text: '',
        feeling: '',
        location: '',
        link: ''
    })
    const { text, location, feeling } = formData
    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})
    const onSubmit = e =>{
        e.preventDefault()
        if(text) addPost(formData)
        setFormData({
            text: '',
            feeling: '',
            location: '',
            link: ''
        })
    }
  return (
    <div className='postForm'>
        <div className="box">
            <div className="header">
                <p className='text-xs'>New opinion</p>
                <span onClick={()=>history.push("/dashboard")} className="close svg-icon">
                    <svg viewBox="0 0 512 512"><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>
                </span>
            </div>
            <div className="line"></div>
            <div className="inner">
                <div className="head">
                    <div className="off-user">
                        <Link to={`/profile/${user._id}`}>
                            <div className="avatar">
                                <img src={user.avatar === "default"?defaultImg:user.avatar} alt="avatar" />
                            </div>
                        </Link>
                        <div className="user-info">
                            <div className="inline">
                                <span className="text-bold underline"><Link to={`/profile/${user._id}`} title={user.name}>{userNameHandler(user.name,feeling ? feeling.length > 0 : false)}</Link></span>
                                <label>{feeling && (<p> is feeling&nbsp;<span>{ feeling }</span></p>)}
                                </label>
                            </div>
                            <span className="date underline" title='Just now'>Just now {location &&
                                (<p className="text-bold svg-icon">
                                    <svg viewBox="0 0 512 512">
                                            <g>
                                            <path style={{fill:'var(--Primary-color)'}} d="M258.499,512c-5.186,0-10.008-2.68-12.745-7.091L102.869,274.652C85.289,246.26,76,213.534,76,180 C76,80.748,156.748,0,256,0s180,80.748,180,180c0,32.539-8.779,64.428-25.389,92.22L271.368,504.707 c-2.688,4.488-7.52,7.251-12.75,7.292C258.578,512,258.539,512,258.499,512z M256,30c-82.71,0-150,67.29-150,150 c0,27.95,7.734,55.214,22.368,78.846l129.905,209.34l126.594-211.368C398.689,233.688,406,207.121,406,180 C406,97.29,338.71,30,256,30z"/>
                                            <path style={{fill:'var(--Primary-color)'}} d="M256,270c-31.397,0-60.044-15.977-76.631-42.737C170.62,213.117,166,196.778,166,180 c0-49.626,40.374-90,90-90s90,40.374,90,90c0,16.284-4.371,32.209-12.639,46.055C316.913,253.574,287.994,270,256,270z M256,120 c-33.084,0-60,26.916-60,60c0,11.2,3.069,22.082,8.875,31.47C215.945,229.33,235.06,240,256,240 c21.337,0,40.629-10.965,51.607-29.331c5.49-9.193,8.393-19.8,8.393-30.669C316,146.916,289.084,120,256,120z"/>
                                            </g>
                                    </svg>
                                    <span>{location}</span>
                                </p>)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={e =>onSubmit(e)} className="body">
                <TextareaAutosize name="text" value={text} onChange={e => onChange(e)} placeholder="We would like to hear from you..." />
                <div className="moreinfo">
                    <p>Add to your post</p>
                    <div className='items'>
                        <span onClick={()=>setActiveBox({...activeBox,backPage: true})} className="svg-icon">
                            <svg viewBox="0 0 256 256">
                                <path fill='var(--Primary-color)' d="M159.999,83.99414h-112a12.01343,12.01343,0,0,0-12,12v112a12.01343,12.01343,0,0,0,12,12h112a12.01343,12.01343,0,0,0,12-12v-112A12.01343,12.01343,0,0,0,159.999,83.99414Zm4,124a4.00426,4.00426,0,0,1-4,4h-112a4.00427,4.00427,0,0,1-4-4v-112a4.00428,4.00428,0,0,1,4-4h112a4.00427,4.00427,0,0,1,4,4ZM140,40a4.0002,4.0002,0,0,1,4-4h16a4,4,0,0,1,0,8H144A4.0002,4.0002,0,0,1,140,40Zm80,8v8a4,4,0,0,1-8,0V48a4.00427,4.00427,0,0,0-4-4h-8a4,4,0,0,1,0-8h8A12.01343,12.01343,0,0,1,220,48Zm0,48v16a4,4,0,0,1-8,0V96a4,4,0,0,1,8,0Zm0,56v8a12.01343,12.01343,0,0,1-12,12h-8a4,4,0,0,1,0-8h8a4.00427,4.00427,0,0,0,4-4v-8a4,4,0,0,1,8,0ZM84,56V48A12.01343,12.01343,0,0,1,96,36h8a4,4,0,0,1,0,8H96a4.00427,4.00427,0,0,0-4,4v8a4,4,0,0,1-8,0Z"/>
                            </svg>
                        </span>
                        <span onClick={()=>setActiveBox({...activeBox,emojis: true})} className="svg-icon">
                            <svg viewBox="0 0 24 24">
                                <g>
                                    <g fill="#ffde34">
                                        <path d="M12.0000002,1.99896738 C17.523704,1.99896738 22.0015507,6.47681407 22.0015507,12.0005179 C22.0015507,17.5242217 17.523704,22.0020684 12.0000002,22.0020684 C6.47629639,22.0020684 1.99844971,17.5242217 1.99844971,12.0005179 C1.99844971,6.47681407 6.47629639,1.99896738 12.0000002,1.99896738 Z M12.0000002,3.49896738 C7.30472352,3.49896738 3.49844971,7.30524119 3.49844971,12.0005179 C3.49844971,16.6957946 7.30472352,20.5020684 12.0000002,20.5020684 C16.6952769,20.5020684 20.5015507,16.6957946 20.5015507,12.0005179 C20.5015507,7.30524119 16.6952769,3.49896738 12.0000002,3.49896738 Z M8.46174078,14.7838355 C9.31087697,15.8615555 10.6018926,16.5020843 11.9999849,16.5020843 C13.396209,16.5020843 14.6856803,15.8632816 15.5349376,14.7880078 C15.7916692,14.4629512 16.2633016,14.4075628 16.5883582,14.6642944 C16.9134148,14.9210259 16.9688032,15.3926584 16.7120717,15.717715 C15.5813083,17.1494133 13.8601276,18.0020843 11.9999849,18.0020843 C10.1373487,18.0020843 8.41411759,17.1471146 7.28351576,15.7121597 C7.02716611,15.3868018 7.08310832,14.9152347 7.40846617,14.6588851 C7.73382403,14.4025354 8.20539113,14.4584777 8.46174078,14.7838355 Z M9.00044779,8.75115873 C9.69041108,8.75115873 10.2497368,9.3104845 10.2497368,10.0004478 C10.2497368,10.6904111 9.69041108,11.2497368 9.00044779,11.2497368 C8.3104845,11.2497368 7.75115873,10.6904111 7.75115873,10.0004478 C7.75115873,9.3104845 8.3104845,8.75115873 9.00044779,8.75115873 Z M15.0004478,8.75115873 C15.6904111,8.75115873 16.2497368,9.3104845 16.2497368,10.0004478 C16.2497368,10.6904111 15.6904111,11.2497368 15.0004478,11.2497368 C14.3104845,11.2497368 13.7511587,10.6904111 13.7511587,10.0004478 C13.7511587,9.3104845 14.3104845,8.75115873 15.0004478,8.75115873 Z"></path>
                                    </g>
                                </g>
                            </svg>
                        </span>
                        <span onClick={()=>setActiveBox({...activeBox,locationPage: true})} className="svg-icon">
                            <svg viewBox="0 0 297 297">
                                <path fill='#EA4335' d="M148.5,0C87.43,0,37.747,49.703,37.747,110.797c0,91.026,99.729,179.905,103.976,183.645
                                    c1.936,1.705,4.356,2.559,6.777,2.559c2.421,0,4.841-0.853,6.778-2.559c4.245-3.739,103.975-92.618,103.975-183.645
                                    C259.253,49.703,209.57,0,148.5,0z M148.5,79.693c16.964,0,30.765,13.953,30.765,31.104c0,17.151-13.801,31.104-30.765,31.104
                                    c-16.964,0-30.765-13.953-30.765-31.104C117.735,93.646,131.536,79.693,148.5,79.693z"/>
                            </svg>
                        </span>
                        <span className="svg-icon">
                            <svg viewBox="0 0 442.246 442.246">
                                <g>
                                    <g>
                                        <path fill='#21aad1' d="M409.657,32.474c-43.146-43.146-113.832-43.146-156.978,0l-84.763,84.762c29.07-8.262,60.589-6.12,88.129,6.732
                                            l44.063-44.064c17.136-17.136,44.982-17.136,62.118,0c17.136,17.136,17.136,44.982,0,62.118l-55.386,55.386l-36.414,36.414
                                            c-17.136,17.136-44.982,17.136-62.119,0l-47.43,47.43c11.016,11.017,23.868,19.278,37.332,24.48
                                            c36.415,14.382,78.643,8.874,110.467-16.219c3.06-2.447,6.426-5.201,9.18-8.262l57.222-57.222l34.578-34.578
                                            C453.109,146.306,453.109,75.926,409.657,32.474z"/>
                                        <path d="M184.135,320.114l-42.228,42.228c-17.136,17.137-44.982,17.137-62.118,0c-17.136-17.136-17.136-44.981,0-62.118
                                            l91.8-91.799c17.136-17.136,44.982-17.136,62.119,0l47.43-47.43c-11.016-11.016-23.868-19.278-37.332-24.48
                                            c-38.25-15.3-83.232-8.262-115.362,20.502c-1.53,1.224-3.06,2.754-4.284,3.978l-91.8,91.799
                                            c-43.146,43.146-43.146,113.832,0,156.979c43.146,43.146,113.832,43.146,156.978,0l82.927-83.845
                                            C230.035,335.719,220.243,334.496,184.135,320.114z"/>
                                    </g>
                                </g>
                            </svg>
                        </span>
                    </div>
                </div>
                <button className='btn-submit' type="submit">Post</button>
            </form>
            <div className={!emojis && !locationPage && backPage ? "backPage active overpop":"backPage overpop"}>
                <div className="header">
                    <p className='text-xs'>Appearance</p>
                    <span  onClick={()=>setActiveBox({...activeBox,backPage: false})} className="back svg-icon">
                    <svg style={{padding:".15rem"}} viewBox="0 0 476.213 476.213">
                        <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
                            57.427,253.107 476.213,253.107 "/>
                    </svg>
                    </span>
                </div>
                <div className="line"></div>
            </div>
            <div className={emojis && !locationPage && !backPage ? "emojis active overpop":"emojis overpop"}>
                <div className="header">
                    <p className='text-xs'>Emojis</p>
                    <span  onClick={()=>setActiveBox({...activeBox,emojis: false})} className="back svg-icon">
                    <svg style={{padding:".15rem"}} viewBox="0 0 476.213 476.213">
                        <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
                            57.427,253.107 476.213,253.107 "/>
                    </svg>
                    </span>
                </div>
                <div className="line"></div>
            </div>
            <div className={!emojis && locationPage && !backPage ? "locationPage active overpop":"locationPage overpop"}>
                <div className="header">
                    <p className='text-xs'>Location</p>
                    <span  onClick={()=>setActiveBox({...activeBox,locationPage: false})} className="back svg-icon">
                    <svg style={{padding:".15rem"}} viewBox="0 0 476.213 476.213">
                        <polygon points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 
                            57.427,253.107 476.213,253.107 "/>
                    </svg>
                    </span>
                </div>
                <div className="line"></div>
            </div>
        </div>
    </div>
  )
}

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{ addPost })(PostForm)