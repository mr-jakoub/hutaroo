import React, { useState } from 'react'
import TextareaAutosize from 'react-autosize-textarea';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import sinceDate from '../../utils/sinceDate'
import userNameHandler from '../../utils/userNameHandler'
import textCheck from '../../utils/textCheck'
import defaultImg from '../../assets/img/default.png'
import { deletePost, addLike, addRise, addComment } from '../../actions/post'
import Comment from './Comment'

const Post = ({post, addComment, comments, auth:{ user }, profilePosts, deletePost, addLike, addRise}) => {
    const [dropDown, setDropDown] = useState({
        type: '',
        postId: ''
    })
    const [turnToComments, setTurnToComments] = useState({
        type: '',
        postId: ''
    })
    const [readMore, setReadMore] = useState({
        type: '',
        postId: ''
    })
    const [formData, setFormData] = useState({
        text: ''
    })
    const { text } = formData
    // Post liked or not
    let likedPost = user && post.likes.filter(like=> like.user.toString() === user._id).length > 0
    let risedPost = user && post.rises.filter(rise=> rise.user.toString() === user._id).length > 0
    const filledLike = 'M295.706,35.522C295.706,35.522,295.706,35.522,295.706,35.522c-34.43-0.184-67.161,14.937-89.339,41.273c-22.039-26.516-54.861-41.68-89.339-41.273C52.395,35.522,0,87.917,0,152.55C0,263.31,193.306,371.456,201.143,375.636c3.162,2.113,7.286,2.113,10.449,0c7.837-4.18,201.143-110.759,201.143-223.086C412.735,87.917,360.339,35.522,295.706,35.522zM206.367,354.738C176.065,336.975,20.898,242.412,20.898,245.738z'
    const unfilledLike = 'M295.706,35.522C295.706,35.522,295.706,35.522,295.706,35.522c-34.43-0.184-67.161,14.937-89.339,41.273c-22.039-26.516-54.861-41.68-89.339-41.273C52.395,35.522,0,87.917,0,152.55C0,263.31,193.306,371.456,201.143,375.636c3.162,2.113,7.286,2.113,10.449,0c7.837-4.18,201.143-110.759,201.143-223.086C412.735,87.917,360.339,35.522,295.706,35.522zM206.367,354.738C176.065,336.975,20.898,242.412,20.898,152.55c0-53.091,43.039-96.131,96.131-96.131c32.512-0.427,62.938,15.972,80.457,43.363c3.557,4.905,10.418,5.998,15.323,2.44c0.937-0.68,1.761-1.503,2.44-2.44c29.055-44.435,88.631-56.903,133.066-27.848c27.202,17.787,43.575,48.114,43.521,80.615C391.837,243.456,236.669,337.497,206.367,354.738z'
    let commentsLength = comments.filter(cmnts => {
        if(cmnts.postId === post._id){
            return cmnts
        }else{
            return null
        }
        }).length
    let showedComments = turnToComments.type && post._id === turnToComments.postId
    // handlers
    let handleDropDown = (id, type) =>{
        if(type==='dpMenu'){
            id === dropDown.postId && dropDown.type ? setDropDown({ type: '', postId: id }) : setDropDown({ type: 'dpMenu', postId: id })
        }else if(type==='readMore'){
            id === readMore.postId && readMore.type ? setReadMore({ type: '', postId: id }) : setReadMore({ type: 'readMore', postId: id })
        }else{
            id === turnToComments.postId && turnToComments.type ? setTurnToComments({ type: '', postId: id }) : setTurnToComments({ type: 'commentSection', postId: id })
        }
    }
    const onChange = e => setFormData({...formData,[e.target.name]: e.target.value})
    const onSubmit = e =>{
        e.preventDefault()
        if(text) addComment(post._id,formData)
        setFormData({
            text: ''
        })
    }
    return (
        <div className={risedPost?"post blured-background rised":"post blured-background"}>
            {post._id &&
            <div className="dropdown">
                <span onClick={()=>handleDropDown(post._id, 'dpMenu')} className="svg-icon toggler">
                    <svg viewBox="0 0 512 512">
                        <g>
                            <g>
                                <path d="M64,192c-35.285,0-64,28.715-64,64s28.715,64,64,64s64-28.715,64-64S99.285,192,64,192z M64,298.667
                                    c-23.531,0-42.667-19.136-42.667-42.667S40.469,213.333,64,213.333c23.531,0,42.667,19.136,42.667,42.667
                                    S87.531,298.667,64,298.667z"/>
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M256,192c-35.285,0-64,28.715-64,64s28.715,64,64,64s64-28.715,64-64S291.285,192,256,192z M256,298.667
                                    c-23.531,0-42.667-19.136-42.667-42.667s19.136-42.667,42.667-42.667s42.667,19.136,42.667,42.667S279.531,298.667,256,298.667z"
                                    />
                            </g>
                        </g>
                        <g>
                            <g>
                                <path d="M448,192c-35.285,0-64,28.715-64,64s28.715,64,64,64c35.285,0,64-28.715,64-64S483.285,192,448,192z M448,298.667
                                    c-23.531,0-42.667-19.136-42.667-42.667s19.136-42.667,42.667-42.667c23.531,0,42.667,19.136,42.667,42.667
                                    S471.531,298.667,448,298.667z"/>
                            </g>
                        </g>
                    </svg>
                </span>
                
                <ul className={dropDown.type && (post._id === dropDown.postId) ? "show":''}>
                        {user._id !== post.user ? (
                            <>
                                <li className="svg-icon">
                                    <svg style={{width: '28px', height: '28px', marginLeft: '-5px'}} viewBox="0 0 25 25">
                                        <path d="M18 2.5a.5.5 0 0 1 1 0V5h2.5a.5.5 0 0 1 0 1H19v2.5a.5.5 0 1 1-1 0V6h-2.5a.5.5 0 0 1 0-1H18V2.5zM7 7a1 1 0 0 1 1-1h3.5a.5.5 0 0 0 0-1H8a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V7z" />
                                    </svg>
                                    <p>Save post
                                        <span>Add this to your saved items</span>
                                    </p>
                                </li>
                                <div className="line"></div>
                                <li className="svg-icon">
                                    <svg viewBox="0 0 512.001 512.001">
                                            <g><g><path d="M404.99,344.077c-26.743,0-50.588,12.583-65.974,32.124l-154.093-88.964c3.888-9.662,6.049-20.198,6.049-31.236
                                        c0-11.037-2.162-21.573-6.049-31.236l154.093-88.964c15.387,19.54,39.231,32.124,65.974,32.124
                                        c46.297,0,83.962-37.666,83.962-83.962C488.952,37.666,451.288,0,404.99,0s-83.962,37.665-83.962,83.961
                                        c0,11.038,2.163,21.576,6.052,31.24l-154.091,88.964c-15.387-19.542-39.233-32.127-65.978-32.127
                                        c-46.297,0-83.962,37.666-83.962,83.962c0,46.296,37.665,83.962,83.962,83.962c26.745,0,50.591-12.585,65.978-32.127L327.08,396.8
                                        c-3.889,9.664-6.052,20.201-6.052,31.24c0,46.297,37.665,83.961,83.962,83.961s83.962-37.665,83.962-83.961
                                        C488.952,381.744,451.288,344.077,404.99,344.077z M404.99,23.808c33.169,0,60.155,26.985,60.155,60.153
                                        c0,33.169-26.985,60.155-60.155,60.155c-33.169,0-60.155-26.986-60.155-60.155C344.836,50.792,371.822,23.808,404.99,23.808z
                                        M107.011,316.155c-33.169,0-60.155-26.986-60.155-60.155c0-33.169,26.985-60.155,60.155-60.155
                                        c33.169,0,60.155,26.986,60.155,60.155C167.166,289.169,140.18,316.155,107.011,316.155z M404.99,488.192
                                        c-33.169,0-60.155-26.985-60.155-60.153c0-33.169,26.985-60.155,60.155-60.155c33.169,0,60.155,26.986,60.155,60.155
                                        C465.145,461.208,438.159,488.192,404.99,488.192z"></path></g></g><g><g><path d="M107.011,220.606c-19.516,0-35.394,15.877-35.394,35.394c0,6.573,5.329,11.904,11.904,11.904s11.904-5.331,11.904-11.904
                                        c0-6.389,5.197-11.586,11.586-11.586c6.574,0,11.904-5.331,11.904-11.904C118.915,225.936,113.585,220.606,107.011,220.606z"></path></g></g>
                                    </svg>
                                    <p>Copy the link
                                        <span>Permanently delete this post</span>
                                    </p>
                                </li>
                                <div className="line"></div>
                                <li className="svg-icon">
                                    <svg viewBox="0 0 511.996 511.996"><g><g><path d="m507.243 244.504-239.751-239.751c-6.338-6.338-16.65-6.338-22.988 0l-239.751 239.751c-6.337 6.337-6.337 16.65 0 22.987l142.742 142.742c2.93 2.929 7.678 2.929 10.607 0s2.929-7.678 0-10.606l-142.742-142.742c-.489-.489-.489-1.285 0-1.774l239.751-239.751c.488-.489 1.285-.489 1.773 0l239.751 239.751c.489.489.489 1.285 0 1.774l-239.75 239.751c-.488.489-1.285.489-1.773 0l-72.763-72.762c-2.929-2.928-7.677-2.929-10.607 0-2.929 2.929-2.929 7.678 0 10.606l72.763 72.762c3.169 3.169 7.332 4.753 11.494 4.753s8.325-1.584 11.494-4.753l239.751-239.751c6.336-6.337 6.336-16.649-.001-22.987z"/><path d="m255.998 462.468c3.875 0 7.519-1.509 10.26-4.25l191.961-191.96c2.74-2.74 4.249-6.384 4.249-10.26s-1.509-7.52-4.249-10.26l-191.961-191.96c-2.741-2.741-6.385-4.25-10.26-4.25s-7.519 1.509-10.26 4.25l-191.961 191.96c-2.74 2.74-4.249 6.384-4.249 10.26s1.509 7.52 4.249 10.26l191.961 191.96c2.741 2.741 6.385 4.25 10.26 4.25zm0-397.737 191.267 191.267-191.267 191.267-191.267-191.267z"/><path d="m255.998 317.514c14.052 0 25.799-10.982 26.748-25.056l4.086-67.934c.249-4.135-2.901-7.688-7.036-7.937-4.138-.256-7.688 2.901-7.937 7.036l-4.083 67.879c-.416 6.174-5.59 11.011-11.778 11.011s-11.362-4.836-11.775-10.956l-8.044-133.764c-.375-5.548 1.51-10.84 5.307-14.903 3.798-4.063 8.951-6.3 14.513-6.3s10.715 2.237 14.513 6.3c3.797 4.063 5.682 9.355 5.304 14.958l-1.875 31.137c-.249 4.134 2.9 7.688 7.035 7.937 4.179.255 7.688-2.901 7.938-7.036l1.872-31.082c.647-9.596-2.747-19.13-9.315-26.156-6.568-7.027-15.852-11.057-25.471-11.057s-18.902 4.03-25.471 11.057c-6.568 7.026-9.963 16.56-9.318 26.101l8.044 133.764c.944 14.019 12.691 25.001 26.743 25.001z"/><path d="m284.683 361.72c0-15.817-12.868-28.685-28.685-28.685s-28.685 12.868-28.685 28.685 12.868 28.685 28.685 28.685 28.685-12.868 28.685-28.685zm-42.37 0c0-7.546 6.139-13.685 13.685-13.685s13.685 6.139 13.685 13.685-6.139 13.685-13.685 13.685-13.685-6.139-13.685-13.685z"/></g></g></svg>
                                        <p>Report post
                                            <span>I have doubts about this post</span>
                                        </p>
                                    </li>
                                <li className="svg-icon">
                                    <svg viewBox="0 0 490.034 490.034">
                                        <g>
                                        <g>
                                            <path d="M435.667,54.311c-7-7.1-18.4-7-25.5,0l-64,64c-79.3-36-163.9-27.2-244.6,25.5c-60.1,39.2-96.6,88.5-98.1,90.6
                                                c-4.8,6.6-4.6,15.6,0.5,22c34.2,42,70,74.7,106.6,97.5l-56.3,56.3c-7,7-7,18.4,0,25.5c3.5,3.5,8.1,5.3,12.7,5.3s9.2-1.8,12.7-5.3
                                                l356-355.9C442.667,72.811,442.667,61.411,435.667,54.311z M200.467,264.011c-2.6-5.9-3.9-12.3-3.9-19c0-12.9,5-25.1,14.2-34.3
                                                c14.4-14.4,35.7-17.8,53.3-10.3L200.467,264.011z M290.667,173.911c-32.7-21-76.8-17.2-105.3,11.3c-16,16-24.7,37.2-24.7,59.7
                                                c0,16.4,4.7,32.1,13.4,45.6l-37.1,37.1c-32.5-18.8-64.5-46.6-95.6-82.9c13.3-15.6,41.4-45.7,79.9-70.8
                                                c66.6-43.4,132.9-52.8,197.5-28.1L290.667,173.911z"/>
                                        </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M486.067,233.611c-24.7-30.4-50.3-56-76.3-76.3c-7.9-6.1-19.2-4.7-25.4,3.1c-6.1,7.8-4.7,19.1,3.1,25.3
                                                    c20.6,16.1,41.2,36.1,61.2,59.5c-11.8,13.8-34.8,38.6-66,61.3c-60.1,43.7-120.8,59.5-180.3,46.9c-9.7-2.1-19.3,4.2-21.3,13.9
                                                    c-2.1,9.7,4.2,19.3,13.9,21.3c15.5,3.3,31.1,4.9,46.8,4.9c23.6,0,47.4-3.7,71.1-11.1c31.1-9.7,62-25.7,91.9-47.5
                                                    c50.4-36.9,80.5-77.6,81.8-79.3C491.367,249.011,491.167,240.011,486.067,233.611z"/>
                                            </g>
                                        </g>
                                    </svg>  
                                    <p>Hide post
                                        <span>I don't want to see it again</span>
                                    </p>
                                </li>
                            </>
                        ):(
                        <>
                            <li onClick={()=>deletePost(post._id)} className="svg-icon">
                                <svg viewBox="0 0 407.521 407.521">
                                    <g>
                                        <g>
                                            <g>
                                                <path d="M335.94,114.944H71.581c-2.86-0.243-5.694,0.702-7.837,2.612c-2.107,2.024-3.083,4.954-2.612,7.837l27.167,236.669
                                                    c3.186,26.093,25.436,45.647,51.722,45.453h131.657c27.026,0.385,49.791-20.104,52.245-47.02l22.465-236.147
                                                    c0.139-2.533-0.811-5.005-2.612-6.792C341.634,115.646,338.8,114.701,335.94,114.944z M303.026,359.45
                                                    c-1.642,15.909-15.366,27.803-31.347,27.167H140.022c-15.694,0.637-29.184-11.024-30.825-26.645L83.075,135.842h241.371
                                                    L303.026,359.45z"/>
                                                <path d="M374.079,47.026H266.454V30.307c0.58-16.148-12.04-29.708-28.188-30.288c-0.53-0.019-1.061-0.024-1.591-0.014h-65.829
                                                    c-16.156-0.299-29.494,12.555-29.793,28.711c-0.01,0.53-0.005,1.061,0.014,1.591v16.718H33.442
                                                    c-5.771,0-10.449,4.678-10.449,10.449s4.678,10.449,10.449,10.449h340.637c5.771,0,10.449-4.678,10.449-10.449
                                                    S379.849,47.026,374.079,47.026z M245.556,30.307v16.718h-83.592V30.307c-0.589-4.579,2.646-8.768,7.225-9.357
                                                    c0.549-0.071,1.104-0.086,1.656-0.047h65.829c4.605-0.326,8.603,3.142,8.929,7.748C245.643,29.203,245.627,29.758,245.556,30.307
                                                    z"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>  
                                <p>Delete post
                                    <span>Permanently delete this post</span>
                                </p>
                            </li>
                        </>
                        )}
                </ul>
            </div>
            }
            <div className="inner">
                <div className="head">
                    <div className="off-user">
                        <Link to={`/profile/${post.user}`}>
                            <div className="avatar">
                                <img src={post.avatar === "default"?defaultImg:post.avatar} alt="avatar" />
                            </div>
                        </Link>
                        <div className="user-info">
                            <div className="inline">
                                <span className="text-bold underline"><Link to={`/profile/${post.user}`} title={post.name}>{userNameHandler(post.name,post.feeling ? post.feeling.length > 0 : false)}</Link></span>
                                <label>{post.feeling && (<p> is feeling&nbsp;<span>{ post.feeling }</span></p>)}
                                </label>
                            </div>
                            <span className="date underline" title={post.date}>{sinceDate(post.date)} {post.location &&
                            (<p className="text-bold svg-icon">
                                <svg viewBox="0 0 512 512">
                                        <g>
                                        <path style={{fill:'var(--Primary-color)'}} d="M258.499,512c-5.186,0-10.008-2.68-12.745-7.091L102.869,274.652C85.289,246.26,76,213.534,76,180 C76,80.748,156.748,0,256,0s180,80.748,180,180c0,32.539-8.779,64.428-25.389,92.22L271.368,504.707 c-2.688,4.488-7.52,7.251-12.75,7.292C258.578,512,258.539,512,258.499,512z M256,30c-82.71,0-150,67.29-150,150 c0,27.95,7.734,55.214,22.368,78.846l129.905,209.34l126.594-211.368C398.689,233.688,406,207.121,406,180 C406,97.29,338.71,30,256,30z"/>
                                        <path style={{fill:'var(--Primary-color)'}} d="M256,270c-31.397,0-60.044-15.977-76.631-42.737C170.62,213.117,166,196.778,166,180 c0-49.626,40.374-90,90-90s90,40.374,90,90c0,16.284-4.371,32.209-12.639,46.055C316.913,253.574,287.994,270,256,270z M256,120 c-33.084,0-60,26.916-60,60c0,11.2,3.069,22.082,8.875,31.47C215.945,229.33,235.06,240,256,240 c21.337,0,40.629-10.965,51.607-29.331c5.49-9.193,8.393-19.8,8.393-30.669C316,146.916,289.084,120,256,120z"/>
                                        </g>
                                </svg>
                                <span>{post.location}</span>
                            </p>)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {post.text && 
            <div className="body">
                <p>{ post.text.length > 100 && readMore.type && post._id === readMore.postId ? (<span onClick={()=>handleDropDown(post._id, 'readMore')}>{textCheck(post.text)}</span>) : (<span onClick={()=>handleDropDown(post._id, 'readMore')}>{textCheck(post.text.slice(0, 100))}</span>)}{post.text.length > 100 && ((!readMore.type) || (post._id !== readMore.postId)) && (<span className="text-bold readMore" onClick={()=>handleDropDown(post._id, 'readMore')}> ...Read more</span>)}</p>
                {post.link &&
                    <div className="link">
                        <a target='_blank' rel='noreferrer' className='text-bold' href={`http://${post.link}`}>
                            <svg viewBox="0 0 24 24"><path d="M16.949 7.051c.39.389.391 1.022.001 1.413l-8.485 8.486c-.392.391-1.023.391-1.414 0-.39-.39-.39-1.021.001-1.412l8.485-8.488c.39-.39 1.024-.387 1.412.001zm-5.805 10.043c-.164.754-.541 1.486-1.146 2.088l-1.66 1.66c-1.555 1.559-3.986 1.663-5.413.235-1.429-1.428-1.323-3.857.234-5.413l1.661-1.663c.603-.601 1.334-.98 2.087-1.144l1.934-1.934c-1.817-.306-3.829.295-5.313 1.783l-1.662 1.661c-2.342 2.34-2.5 5.978-.354 8.123 2.145 2.146 5.783 1.985 8.123-.354l1.66-1.66c1.486-1.487 2.089-3.496 1.783-5.314l-1.934 1.932zm3.222-15.231l-1.66 1.66c-1.486 1.488-2.089 3.499-1.783 5.317l1.935-1.935c.162-.753.54-1.485 1.146-2.087l1.66-1.66c1.556-1.559 3.984-1.663 5.413-.234 1.429 1.427 1.324 3.857-.233 5.415l-1.66 1.66c-.602.603-1.334.981-2.089 1.145l-1.934 1.934c1.818.306 3.827-.295 5.317-1.783l1.658-1.662c2.34-2.339 2.498-5.976.354-8.121-2.145-2.146-5.78-1.987-8.124.351z"/></svg>
                            {post.link}
                        </a>
                    </div>
                }
            </div>}
            <div className="nmbrs">
                <div>
                    <span className='underline'>likes : {post.likes.length === 0 ? '' : post.likes.length}</span>
                    <span className='underline'>rises : {post.rises.length === 0?'':post.rises.length}</span>
                </div>
                <div>
                    <span className='underline'>{commentsLength} Comments</span>
                    <span className='underline'>10 Shares</span>
                </div>
            </div>
            <div style={{margin: "0"}} className="line"></div>
            <div className="footer">
                <div className="head">
                    {post.likes && 
                    <div onClick={()=>addLike(post._id)} className="like react svg-icon">
                        <svg id="like" className="liked" viewBox="0 0 412.735 412.735">
                            <g>
                                <g>
                                    <path fill={likedPost?'var(--Danger-color)':''} d={likedPost ? filledLike : unfilledLike} />
                                </g>
                            </g>
                        </svg>
                        <span className='sm-foricon'>Like</span>
                    </div>
                    }
                    <div onClick={()=>handleDropDown(post._id, 'commentSection')} className="comment react svg-icon">
                        <svg  viewBox="0 0 60 60">
                            <g>
                                <path d="M27.885,5.007C20.06,5.915,12.843,10.774,9.05,17.688c-0.266,0.484-0.088,1.092,0.396,1.358
                                    c0.153,0.083,0.318,0.123,0.48,0.123c0.354,0,0.696-0.188,0.878-0.519C14.29,12.294,20.923,7.828,28.115,6.993
                                    c0.549-0.063,0.941-0.56,0.878-1.108C28.93,5.337,28.443,4.941,27.885,5.007z"/>
                                <path d="M59.948,58.684L55.105,44.15C57.654,39.703,59,34.647,59,29.5C59,13.233,45.767,0,29.5,0S0,13.233,0,29.5
                                    S13.234,59,29.5,59c4.641,0,9.257-1.108,13.378-3.208l15.867,4.176C58.83,59.989,58.915,60,59,60c0.272,0,0.538-0.112,0.729-0.316
                                    C59.981,59.416,60.065,59.032,59.948,58.684z M43.015,53.759c-0.008-0.002-0.017-0.001-0.026-0.003
                                    c-0.005-0.001-0.008-0.004-0.012-0.005l-7.76-1.727c-0.53-0.115-1.072,0.22-1.193,0.759c-0.119,0.539,0.221,1.073,0.76,1.193
                                    l4.849,1.079C36.42,56.327,32.969,57,29.5,57C14.337,57,2,44.664,2,29.5S14.337,2,29.5,2S57,14.336,57,29.5
                                    c0,4.942-1.33,9.792-3.847,14.026c-0.148,0.25-0.182,0.551-0.089,0.827l4.402,13.209L43.015,53.759z"/>
                            </g>
                        </svg>
                        <span className='sm-foricon'>Comment</span>
                    </div>
                    {post.rises && 
                    <div onClick={()=>addRise(post._id)} className="rise react svg-icon">
                        <svg viewBox="0 0 512 512"><g><ellipse cx="373.232" cy="277.044" rx="9.998" ry="9.998" transform="matrix(.242 -.97 .97 .242 14.064 572.092)"/><path d="m510.987 146.112-35.384-107.939c-2.473-7.589-7.767-13.733-14.909-17.299-7.143-3.567-15.236-4.109-22.769-1.533l-109.627 37.254c-10.614 3.608-16.316 15.179-12.709 25.794l8.285 24.378c3.607 10.615 15.178 16.314 25.794 12.709l25.675-8.725-117.157 275.291c-.057.134-.068.137-.138.159-.137.043-.267.015-.295-.001-.007-.004-.04-.037-.089-.116l-103.006-166.184c-7.662-12.362-20.903-19.369-35.444-18.791-14.532.595-27.164 8.68-33.789 21.627l-83.182 162.545c-2.475 4.835-2.918 10.344-1.249 15.512s5.251 9.377 10.086 11.851l30.307 15.51c4.835 2.475 10.342 2.918 15.512 1.249 5.168-1.669 9.377-5.251 11.851-10.086l54.761-107.008c.057-.111.078-.153.25-.16.171-.01.196.032.262.139.028.045.056.09.085.135l104.985 163.539c6.156 9.588 16.163 16.231 27.467 17.879 11.185 1.63 22.917-1.487 31.594-8.781 4.697-3.948 8.395-9.002 10.856-14.616l65.014-148.284c2.222-5.068-.085-10.978-5.153-13.199-5.063-2.22-10.976.084-13.199 5.153l-65.014 148.285c-2.863 6.53-9.023 11.02-16.122 11.72-7.392.729-14.565-2.729-18.58-8.982l-104.95-163.488c-3.923-6.268-10.675-9.835-18.063-9.523-7.427.304-13.882 4.436-17.269 11.053l-54.762 107.008c-.021.04-.055.108-.171.146-.114.037-.184.002-.224-.018l-30.307-15.51c-.041-.021-.109-.056-.146-.172s-.002-.183.018-.224l83.182-162.545c3.289-6.426 9.558-10.439 16.771-10.734 7.207-.295 13.789 3.191 17.592 9.327l103.006 166.183c4.022 6.489 11.251 10.16 18.861 9.559 7.612-.593 14.186-5.331 17.143-12.338l125.92-295.885c1.548-3.636.813-7.842-1.875-10.739s-6.826-3.942-10.568-2.672l-46.894 15.936c-.155.052-.321-.031-.374-.183l-8.283-24.377c-.053-.154.029-.321.183-.373l109.644-37.26c2.433-.832 5.045-.659 7.349.493 2.304 1.151 4.013 3.133 4.815 5.597l35.39 107.956c.051.154-.033.321-.188.371l-24.465 8.02c-.156.049-.321-.034-.372-.188l-14.901-45.455c-1.294-3.947-4.888-6.686-9.038-6.886-4.152-.201-7.99 2.18-9.658 5.985l-51.497 117.456c-2.222 5.068.085 10.978 5.153 13.199 5.065 2.223 10.977-.083 13.199-5.153l40.968-93.442 6.734 20.539c3.494 10.653 14.998 16.479 25.655 12.987l24.465-8.02c10.654-3.493 16.48-15.001 12.988-25.655z"/></g></svg>
                        <span className='sm-foricon'>Rise</span>
                    </div>}
                </div>
                {!profilePosts && <div className="head">
                    <div className="share react svg-icon">
                        <svg viewBox="0 0 512.001 512.001">
                            <g>
                                <g>
                                    <path d="M404.99,344.077c-26.743,0-50.588,12.583-65.974,32.124l-154.093-88.964c3.888-9.662,6.049-20.198,6.049-31.236
                                        c0-11.037-2.162-21.573-6.049-31.236l154.093-88.964c15.387,19.54,39.231,32.124,65.974,32.124
                                        c46.297,0,83.962-37.666,83.962-83.962C488.952,37.666,451.288,0,404.99,0s-83.962,37.665-83.962,83.961
                                        c0,11.038,2.163,21.576,6.052,31.24l-154.091,88.964c-15.387-19.542-39.233-32.127-65.978-32.127
                                        c-46.297,0-83.962,37.666-83.962,83.962c0,46.296,37.665,83.962,83.962,83.962c26.745,0,50.591-12.585,65.978-32.127L327.08,396.8
                                        c-3.889,9.664-6.052,20.201-6.052,31.24c0,46.297,37.665,83.961,83.962,83.961s83.962-37.665,83.962-83.961
                                        C488.952,381.744,451.288,344.077,404.99,344.077z M404.99,23.808c33.169,0,60.155,26.985,60.155,60.153
                                        c0,33.169-26.985,60.155-60.155,60.155c-33.169,0-60.155-26.986-60.155-60.155C344.836,50.792,371.822,23.808,404.99,23.808z
                                        M107.011,316.155c-33.169,0-60.155-26.986-60.155-60.155c0-33.169,26.985-60.155,60.155-60.155
                                        c33.169,0,60.155,26.986,60.155,60.155C167.166,289.169,140.18,316.155,107.011,316.155z M404.99,488.192
                                        c-33.169,0-60.155-26.985-60.155-60.153c0-33.169,26.985-60.155,60.155-60.155c33.169,0,60.155,26.986,60.155,60.155
                                        C465.145,461.208,438.159,488.192,404.99,488.192z"/>
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M107.011,220.606c-19.516,0-35.394,15.877-35.394,35.394c0,6.573,5.329,11.904,11.904,11.904s11.904-5.331,11.904-11.904
                                        c0-6.389,5.197-11.586,11.586-11.586c6.574,0,11.904-5.331,11.904-11.904C118.915,225.936,113.585,220.606,107.011,220.606z"/>
                                </g>
                            </g>
                        </svg>
                        <span className='sm-foricon'>Share</span>
                    </div>
                </div>}
            </div>
            {showedComments &&<div style={{margin: "0"}} className="line"></div>}
            <div className={showedComments ? "comments show":'comments'}>
                <div className="comments-form">
                    <form onSubmit={e =>onSubmit(e)} className="box">
                        <div className="form-content ">
                            <div className="">
                                <div className="avatar form-item">
                                    <img src={user.avatar === "default"?defaultImg:user.avatar} alt="avatar" />
                                </div>
                            </div>
                            <div className="form-input form-item">
                                <TextareaAutosize name="text" value={text} onChange={e => onChange(e)} placeholder="We would like to hear from you..." />
                            </div>
                            <button type="submit form-item" className="submit">Publish</button>
                        </div>
                    </form>
                </div>
                {comments &&
                    comments.length > 0 ? comments.filter(cmnts => {
                        if(cmnts.postId === post._id){
                            return cmnts
                        }else{
                            return null
                        }
                    }).map(comment => (
                        <Comment key={comment._id} comment={comment} post_id={post._id} postOwner={post.user} />
                    )): (<><br/><p>No comments</p></>)
                }
            </div>
        </div>
    )
}

Post.propTypes = {
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    addRise: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, addRise, addComment, deletePost })(Post)