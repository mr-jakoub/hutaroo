import React,{ useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import defaultImg from '../../assets/img/default.png'
import Spinner from '../layout/Spinner'
import {setAlert} from '../../actions/alert'
import { getCurrentProfile, updateProfile, updateSecurityInfo } from '../../actions/profile'

const EditProfile = ({ match, getCurrentProfile, updateProfile, updateSecurityInfo, profile:{ user_profile, loading }, auth:{ user } }) => {
    let birth = user && user.birthdate ? user.birthdate.split('-') : ''
    let eduFrom = user_profile && user_profile.education.from ? user_profile.education.from.split('-'):''
    let eduTo = user_profile && user_profile.education.to ? user_profile.education.to.split('-'):''
    const [securityData, setSecurityData] = useState({
        secret_word: user.secret_word,
        current_password: '',
        new_password: '',
        repeat_password: ''
    })
    const [offFormData, setOffFormData] = useState({
        name: user && user.name,
        email: user && user.email,
        phone: user && user.phone,
        gender: user && user.gender,
        avatar: user && user.avatar,
        birthdate: user ? birth[0]+'-'+birth[1]+'-'+birth[2].split("")[0]+birth[2].split("")[1]:'2021-01-01',
        location: user_profile ? user_profile.location: 'Hutaro.',
        bio: user_profile ? user_profile.bio: 'Hutaro.',
        school: user_profile && user_profile.education ? user_profile.education.school: 'Hutaro.',
        degree: user_profile && user_profile.education ? user_profile.education.degree: 'Hutaro.',
        fieldofstudy: user_profile && user_profile.education ? user_profile.education.fieldofstudy: 'Hutaro.',
        average: user_profile && user_profile.education ? user_profile.education.average: 'Hutaro.',
        from: user_profile && user_profile.education.from ? eduFrom[0]+'-'+eduFrom[1]+'-'+eduFrom[2].split("")[0]+eduFrom[2].split("")[1]:'2021-01-01',
        to: user_profile && user_profile.education.to ? eduTo[0]+'-'+eduTo[1]+'-'+eduTo[2].split("")[0]+eduTo[2].split("")[1]:'2021-01-01'
    })
    const { avatar, name, email, phone, location, bio, birthdate, gender, school, degree, fieldofstudy, average, from, to } = offFormData
    const onChange = e => setOffFormData({...offFormData,[e.target.name]: e.target.value})
    const [imgView, setImgView] = useState(avatar)
    const [avatarFile, seAvatarFile] = useState(avatar)
    const handelFileChange = e => {
        setImgView(URL.createObjectURL(e.target.files[0]))
        seAvatarFile(e.target.files[0])
    }
    const onSubmitInfo = e =>{
        e.preventDefault()
        var formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('phone', phone)
        formData.append('location', location)
        formData.append('bio', bio)
        formData.append('birthdate', birthdate)
        formData.append('gender', gender)
        formData.append('school', school)
        formData.append('degree', degree)
        formData.append('fieldofstudy', fieldofstudy)
        formData.append('average', average)
        formData.append('from', from)
        formData.append('to', to)
        formData.append('avatar', avatarFile)
        if(avatarFile !== avatar){
            if(!avatarFile.type.includes('jpeg') && !avatarFile.type.includes('jpg') && !avatarFile.type.includes('png') && !avatarFile.type.includes('gif')){
                setAlert('Please include a valid image format "png, jpg, jpeg, gif "','danger')
            }else if(avatarFile.size > (1024 * 1024 * 2)){
                setAlert('The file is too large','danger')
            }else{
                setOffFormData({...offFormData, avatar: avatarFile.name})
                updateProfile(formData)
            }
        }else{
            updateProfile(formData)
        }
    }
    // Security
    const { secret_word, current_password, new_password, repeat_password } = securityData
    const onChangeSecurity = e => setSecurityData({...securityData,[e.target.name]: e.target.value.trim()})
    const onSubmitSecurity = e =>{
        e.preventDefault()
        if(new_password !== repeat_password) {
            setAlert('Passwords do not match', 'danger')
        }else{
            updateSecurityInfo({ secret_word, current_password, new_password })
        }
    }
    useEffect(() => {
        getCurrentProfile()
    },[getCurrentProfile])
    return loading && user_profile === null && (user === null) ? <Spinner /> :
        <div className="edit-profile">
            <div className="content">
                <div className="inner">
                    <div className="navigate">
                        <Link to="/setting" className={!match.params.kind ? "item active": "item"}>
                            <svg style={{width: '26px', height: '26px', marginRight: '2px'}} viewBox="0 0 513.323 513.323">
                                <g>
                                    <g>
                                        <path d="M256.661,257.323c-135.275,0-245.333,110.059-245.333,245.333c0,5.888,4.779,10.667,10.667,10.667
                                            s10.667-4.779,10.667-10.667c0-123.52,100.48-224,224-224s224,100.48,224,224c0,5.888,4.779,10.667,10.667,10.667
                                            c5.888,0,10.667-4.779,10.667-10.667C501.995,367.36,391.936,257.323,256.661,257.323z"/>
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path d="M256.661,0c-64.683,0-117.333,52.629-117.333,117.333s52.651,117.333,117.333,117.333s117.333-52.629,117.333-117.333
                                            S321.344,0,256.661,0z M256.661,213.333c-52.928,0-96-43.072-96-96s43.072-96,96-96c52.928,0,96,43.072,96,96
                                            S309.589,213.333,256.661,213.333z"/>
                                    </g>
                                </g>
                            </svg>
                            <span>User Info</span>
                        </Link>
                        <Link to="/setting/security" className={match.params.kind === "security" ? "item active": "item"}>
                            <svg style={{width: '26px', height: '26px', marginRight: '2px'}} viewBox="0 0 214.27 214.27">
                                <g>
                                    <path d="M196.926,55.171c-0.11-5.785-0.215-11.25-0.215-16.537c0-4.142-3.357-7.5-7.5-7.5c-32.075,0-56.496-9.218-76.852-29.01
                                        c-2.912-2.832-7.546-2.831-10.457,0c-20.354,19.792-44.771,29.01-76.844,29.01c-4.142,0-7.5,3.358-7.5,7.5
                                        c0,5.288-0.104,10.755-0.215,16.541c-1.028,53.836-2.436,127.567,87.331,158.682c0.796,0.276,1.626,0.414,2.456,0.414
                                        c0.83,0,1.661-0.138,2.456-0.414C199.36,182.741,197.954,109.008,196.926,55.171z M107.131,198.812
                                        c-76.987-27.967-75.823-89.232-74.79-143.351c0.062-3.248,0.122-6.396,0.164-9.482c30.04-1.268,54.062-10.371,74.626-28.285
                                        c20.566,17.914,44.592,27.018,74.634,28.285c0.042,3.085,0.102,6.231,0.164,9.477C182.961,109.577,184.124,170.844,107.131,198.812
                                        z"/>
                                    <path d="M132.958,81.082l-36.199,36.197l-15.447-15.447c-2.929-2.928-7.678-2.928-10.606,0c-2.929,2.93-2.929,7.678,0,10.607
                                        l20.75,20.75c1.464,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.303-2.196l41.501-41.5
                                        c2.93-2.929,2.93-7.678,0.001-10.606C140.636,78.154,135.887,78.153,132.958,81.082z"/>
                                </g>
                            </svg>
                            <span>Security</span>
                        </Link>
                        <Link to="/setting/saved-posts" className={match.params.kind === "saved-posts" ? "item active": "item"}>
                            <svg style={{width: '26px', height: '26px', marginBottom: '-2px'}} viewBox="0 0 25 25">
                                <path d="M18 2.5a.5.5 0 0 1 1 0V5h2.5a.5.5 0 0 1 0 1H19v2.5a.5.5 0 1 1-1 0V6h-2.5a.5.5 0 0 1 0-1H18V2.5zM7 7a1 1 0 0 1 1-1h3.5a.5.5 0 0 0 0-1H8a2 2 0 0 0-2 2v14a.5.5 0 0 0 .8.4l5.7-4.4 5.7 4.4a.5.5 0 0 0 .8-.4v-8.5a.5.5 0 0 0-1 0v7.48l-5.2-4a.5.5 0 0 0-.6 0l-5.2 4V7z" />
                            </svg>
                            <span>Saved</span>
                        </Link>
                    </div>
                    <div className="line"></div>
                    <div className="edits">
                        <div className={!match.params.kind ? "element active": "element"}>
                            <h3>Edit Profile</h3>
                            <p className="description">People on Hutaro will get to know you with the information below.</p>
                            <div className="my-2">
                                <form onSubmit={onSubmitInfo} className="row">
                                    <div className="col-12">
                                        <div className="avatar">
                                            <label htmlFor="avatar">
                                                <span className="change">
                                                    <svg viewBox="-15 -15 484.00019 484"><path d="m401.648438 18.234375c-24.394532-24.351563-63.898438-24.351563-88.292969 0l-22.101563 22.222656-235.269531 235.144531-.5.503907c-.121094.121093-.121094.25-.25.25-.25.375-.625.746093-.871094 1.121093 0 .125-.128906.125-.128906.25-.25.375-.371094.625-.625 1-.121094.125-.121094.246094-.246094.375-.125.375-.25.625-.378906 1 0 .121094-.121094.121094-.121094.25l-52.199219 156.96875c-1.53125 4.46875-.367187 9.417969 2.996094 12.734376 2.363282 2.332031 5.550782 3.636718 8.867188 3.625 1.355468-.023438 2.699218-.234376 3.996094-.625l156.847656-52.324219c.121094 0 .121094 0 .25-.121094.394531-.117187.773437-.285156 1.121094-.503906.097656-.011719.183593-.054688.253906-.121094.371094-.25.871094-.503906 1.246094-.753906.371093-.246094.75-.621094 1.125-.871094.125-.128906.246093-.128906.246093-.25.128907-.125.378907-.246094.503907-.5l257.371093-257.371094c24.351563-24.394531 24.351563-63.898437 0-88.289062zm-232.273438 353.148437-86.914062-86.910156 217.535156-217.535156 86.914062 86.910156zm-99.15625-63.808593 75.929688 75.925781-114.015626 37.960938zm347.664062-184.820313-13.238281 13.363282-86.917969-86.917969 13.367188-13.359375c14.621094-14.609375 38.320312-14.609375 52.945312 0l33.964844 33.964844c14.511719 14.6875 14.457032 38.332031-.121094 52.949218zm0 0"/></svg>
                                                </span>
                                            </label>
                                            <img src={imgView === "default" ? defaultImg: imgView} alt="avatar" />
                                            <input className="d-none" id="avatar" onChange={handelFileChange} type="file" />
                                        </div>
                                    </div>
                                    {user_profile && user && user_profile.education && <>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="full_name">Full name <span>*</span></label>
                                        <input id="full_name" className="input-item" type="text" name="name" value={!name || name === 'null' ? user.name : name} onChange={e=>onChange(e)} placeholder="Mohammed Youcef" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="email">Email Address <span>*</span></label>
                                        <input id="email" className="input-item" type="email" name="email" value={!email || email === 'null' ? user.email : email} onChange={e=>onChange(e)} placeholder="info@hutaro.com" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="phone">Phone Number <span>*</span></label>
                                        <input id="phone" className="input-item" type="tel" name="phone" value={!phone ? user.phone : phone} onChange={e=>onChange(e)} placeholder="(+213) 0123456789" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="location">Location</label>
                                        <input id="location" className="input-item" type="text" name="location" value={!location || location === 'Hutaro.' ? user_profile.location : location} onChange={e=>onChange(e)} placeholder="Algeria, Batna, Arris" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="birthdate">Date of birth</label>
                                        <input id="birthdate" className="input-item" type="date" name="birthdate" value={!birthdate ? '2021-01-01' : birthdate} onChange={e=>onChange(e)} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="gender">Gender</label>
                                        <select id="gender" className="input-item" name="gender" value={!gender ? 'Male':gender} onChange={e=>onChange(e)}>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="bio">Bio</label>
                                        <div>
                                            <textarea rows="4" id="bio" className="input-item" type="text" name="bio" value={!bio || bio === 'Hutaro.' ? user_profile.bio : bio} onChange={onChange} placeholder="Bio, a brief description about you."></textarea>
                                            <span className="description">Bio must be less than 30 words.</span>
                                        </div>
                                    </div>
                                    <h3>Education</h3>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="school-name">School Name <span>*</span></label>
                                        <input id="school-name" className="input-item" type="text" name="school" value={!school || school === 'Hutaro.' ? user_profile.education.school:school} onChange={e=>onChange(e)} placeholder="Usa National University" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="degree">Degree <span>*</span></label>
                                        <input id="degree" className="input-item" type="text" name="degree" value={!degree || degree === 'Hutaro.' ? user_profile.education.degree:degree} onChange={e=>onChange(e)} placeholder="Licence" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="fieldofstudy">Field Of Study <span>*</span></label>
                                        <input id="fieldofstudy" className="input-item" type="text" name="fieldofstudy" value={!fieldofstudy || fieldofstudy === 'Hutaro.' ? user_profile.education.fieldofstudy:fieldofstudy} onChange={e=>onChange(e)} placeholder="Computer Science" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="average">Average</label>
                                        <input id="average" className="input-item" type="text" name="average" value={!average || average === 'Hutaro.' ? user_profile.education.average:average} onChange={e=>onChange(e)} placeholder="16.32" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="from">From <span>*</span></label>
                                        <input id="from" className="input-item" type="date" name="from" value={!from ? '2021-01-01':from} onChange={e=>onChange(e)} />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="to">To <span>*</span></label>
                                        <input id="to" className="input-item" type="date" name="to" value={!to ? '2021-01-01':to} onChange={e=>onChange(e)} />
                                    </div>
                                    <div className="submit">
                                        <button className="btn btn-primary">Submit</button>
                                    </div>
                                    </>}
                                </form>
                            </div>
                        </div>
                        <div className={match.params.kind === "security" ? "element active": "element"}>
                            <h3>Security</h3>
                            <p className="description">The secret word is required to recover your account if you lost the current password.</p>
                            <div className="my-2">
                                <form onSubmit={e=>onSubmitSecurity(e)} className="row">
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="currentpass">Current Password <span>*</span></label>
                                        <input id="currentpass" className="input-item" type="password" name="current_password" value={current_password} onChange={e=>onChangeSecurity(e)} placeholder="******" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="newpass">New Password <span>*</span></label>
                                        <input id="newpass" className="input-item" type="password" name="new_password" value={new_password} onChange={e=>onChangeSecurity(e)} placeholder="******" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="repeatpass">Repeat Password <span>*</span></label>
                                        <input id="repeatpass" className="input-item" type="password" name="repeat_password" value={repeat_password} onChange={e=>onChangeSecurity(e)} placeholder="******" />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="required" htmlFor="secretword">Secret Word <span>*</span></label>
                                        <input id="secretword" className="input-item" type="text" name="secret_word" value={secret_word} onChange={e=>onChangeSecurity(e)} placeholder="Secret word" />
                                    </div>
                                    <div className="submit">
                                        <button className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={match.params.kind === "saved-posts" ? "element active": "element"}>
                            <h3>Saved Posts</h3>
                            <p className="description">All your saved posts by title attached.</p>
                            <div className="my-2">
                                <div className="saved-post">
                                    <div className="title">
                                        <h3>Web developement path</h3>
                                    </div>
                                    <div className="date">
                                        <p className="lead">03/09/2021</p>
                                    </div>
                                    <div className="links">
                                        <div className="delete buttons">
                                            <button target="_blank" href="www.hutaro.com">
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
                                            </button>
                                        </div>
                                        <div className="visit buttons">
                                            <a target="_blank" href="www.hutaro.com">
                                                <svg viewBox="0 0 512 512"><g id="XMLID_73_"><g id="XMLID_5_"><path id="XMLID_282_" d="m504.446 111.327c0-29.78-11.568-57.749-32.573-78.754-21.005-21.005-48.974-32.573-78.753-32.573-.002 0 .001 0 0 0-29.778 0-57.75 11.569-78.753 32.573l-34.745 34.744c-3.905 3.905-3.905 10.237 0 14.143 3.906 3.904 10.238 3.905 14.142 0l34.745-34.744c17.227-17.229 40.173-26.716 64.611-26.716s47.383 9.488 64.611 26.716 26.716 40.173 26.716 64.611-9.488 47.383-26.716 64.61l-95.75 95.75c.023-.939.035-1.88.035-2.823 0-14.792-2.857-29.136-8.304-42.403l77.271-77.272c10.101-10.101 15.664-23.547 15.664-37.863s-5.562-27.764-15.663-37.864c-20.878-20.878-54.85-20.878-75.728 0l-131.511 131.51c-20.878 20.879-20.878 54.85 0 75.729 10.439 10.438 24.152 15.658 37.864 15.658 3.336 0 6.672-.315 9.961-.933l-35.199 35.199c-14.849-4.242-28.376-12.179-39.374-23.177-17.228-17.228-26.715-40.173-26.715-64.611s9.488-47.384 26.715-64.611l33.143-33.143c3.905-3.905 3.906-10.237.001-14.143-3.906-3.903-10.237-3.904-14.142 0l-33.144 33.143c-11.845 11.846-20.688 25.907-26.149 41.257l-116.579 116.58c-21.005 21.005-32.574 48.974-32.574 78.754 0 29.779 11.568 57.748 32.573 78.753 21.006 21.005 48.975 32.573 78.754 32.573h.001c29.778 0 57.749-11.569 78.753-32.573l131.809-131.808c11.845-11.846 20.688-25.907 26.149-41.257l116.281-116.282c21.005-21.005 32.573-48.974 32.573-78.753zm-135.048-23.722c13.081-13.079 34.364-13.079 47.443 0 6.324 6.323 9.806 14.748 9.806 23.722s-3.482 17.397-9.806 23.721l-72.893 72.894c-4.166-6.357-9.009-12.334-14.505-17.83-10.832-10.831-23.682-19.224-37.768-24.783zm-131.51 178.954c-6.23-6.229-9.485-14.319-9.781-22.498 13.149-11.984 33.597-11.624 46.304 1.083 6.23 6.23 9.486 14.321 9.781 22.5-6.179 5.634-14.136 8.721-22.582 8.721-8.975-.001-17.399-3.483-23.722-9.806zm-17.265 79.815-78.021 78.021c-6.323 6.323-14.748 9.806-23.722 9.806s-17.398-3.482-23.721-9.806c-6.324-6.323-9.806-14.748-9.806-23.722s3.482-17.398 9.806-23.721l73.191-73.191c4.166 6.357 9.009 12.334 14.505 17.83 10.832 10.831 23.683 19.224 37.768 24.783zm94.677-12.897-131.808 131.807c-17.228 17.229-40.174 26.716-64.612 26.716s-47.383-9.488-64.611-26.716-26.715-40.173-26.715-64.61c0-24.438 9.488-47.384 26.716-64.611l96.048-96.048c-.023.939-.035 1.88-.035 2.823 0 14.792 2.857 29.136 8.304 42.403l-77.569 77.57c-10.101 10.101-15.664 23.547-15.664 37.863s5.563 27.764 15.663 37.864c10.44 10.438 24.152 15.658 37.864 15.658s27.425-5.22 37.864-15.658l131.809-131.808c20.878-20.879 20.878-54.85 0-75.728-12.979-12.979-31.017-17.884-47.825-14.726l35.199-35.199c14.849 4.242 28.376 12.179 39.374 23.177 17.227 17.227 26.715 40.173 26.715 64.611-.001 24.438-9.489 47.384-26.717 64.612z"/><path id="XMLID_286_" d="m254.89 116.189c2.63 0 5.21-1.069 7.07-2.93 1.86-1.86 2.93-4.441 2.93-7.07 0-2.63-1.07-5.21-2.93-7.069-1.86-1.86-4.44-2.931-7.07-2.931s-5.21 1.07-7.07 2.931c-1.86 1.859-2.93 4.439-2.93 7.069s1.07 5.21 2.93 7.07c1.86 1.861 4.44 2.93 7.07 2.93z"/></g></g></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="saved-post">
                                    <div className="title">
                                        <h3>Web developement path</h3>
                                    </div>
                                    <div className="date">
                                        <p className="lead">03/09/2021</p>
                                    </div>
                                    <div className="links">
                                        <div className="delete buttons">
                                            <button target="_blank" href="www.hutaro.com">
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
                                            </button>
                                        </div>
                                        <div className="visit buttons">
                                            <a target="_blank" href="www.hutaro.com">
                                                <svg viewBox="0 0 512 512"><g id="XMLID_73_"><g id="XMLID_5_"><path id="XMLID_282_" d="m504.446 111.327c0-29.78-11.568-57.749-32.573-78.754-21.005-21.005-48.974-32.573-78.753-32.573-.002 0 .001 0 0 0-29.778 0-57.75 11.569-78.753 32.573l-34.745 34.744c-3.905 3.905-3.905 10.237 0 14.143 3.906 3.904 10.238 3.905 14.142 0l34.745-34.744c17.227-17.229 40.173-26.716 64.611-26.716s47.383 9.488 64.611 26.716 26.716 40.173 26.716 64.611-9.488 47.383-26.716 64.61l-95.75 95.75c.023-.939.035-1.88.035-2.823 0-14.792-2.857-29.136-8.304-42.403l77.271-77.272c10.101-10.101 15.664-23.547 15.664-37.863s-5.562-27.764-15.663-37.864c-20.878-20.878-54.85-20.878-75.728 0l-131.511 131.51c-20.878 20.879-20.878 54.85 0 75.729 10.439 10.438 24.152 15.658 37.864 15.658 3.336 0 6.672-.315 9.961-.933l-35.199 35.199c-14.849-4.242-28.376-12.179-39.374-23.177-17.228-17.228-26.715-40.173-26.715-64.611s9.488-47.384 26.715-64.611l33.143-33.143c3.905-3.905 3.906-10.237.001-14.143-3.906-3.903-10.237-3.904-14.142 0l-33.144 33.143c-11.845 11.846-20.688 25.907-26.149 41.257l-116.579 116.58c-21.005 21.005-32.574 48.974-32.574 78.754 0 29.779 11.568 57.748 32.573 78.753 21.006 21.005 48.975 32.573 78.754 32.573h.001c29.778 0 57.749-11.569 78.753-32.573l131.809-131.808c11.845-11.846 20.688-25.907 26.149-41.257l116.281-116.282c21.005-21.005 32.573-48.974 32.573-78.753zm-135.048-23.722c13.081-13.079 34.364-13.079 47.443 0 6.324 6.323 9.806 14.748 9.806 23.722s-3.482 17.397-9.806 23.721l-72.893 72.894c-4.166-6.357-9.009-12.334-14.505-17.83-10.832-10.831-23.682-19.224-37.768-24.783zm-131.51 178.954c-6.23-6.229-9.485-14.319-9.781-22.498 13.149-11.984 33.597-11.624 46.304 1.083 6.23 6.23 9.486 14.321 9.781 22.5-6.179 5.634-14.136 8.721-22.582 8.721-8.975-.001-17.399-3.483-23.722-9.806zm-17.265 79.815-78.021 78.021c-6.323 6.323-14.748 9.806-23.722 9.806s-17.398-3.482-23.721-9.806c-6.324-6.323-9.806-14.748-9.806-23.722s3.482-17.398 9.806-23.721l73.191-73.191c4.166 6.357 9.009 12.334 14.505 17.83 10.832 10.831 23.683 19.224 37.768 24.783zm94.677-12.897-131.808 131.807c-17.228 17.229-40.174 26.716-64.612 26.716s-47.383-9.488-64.611-26.716-26.715-40.173-26.715-64.61c0-24.438 9.488-47.384 26.716-64.611l96.048-96.048c-.023.939-.035 1.88-.035 2.823 0 14.792 2.857 29.136 8.304 42.403l-77.569 77.57c-10.101 10.101-15.664 23.547-15.664 37.863s5.563 27.764 15.663 37.864c10.44 10.438 24.152 15.658 37.864 15.658s27.425-5.22 37.864-15.658l131.809-131.808c20.878-20.879 20.878-54.85 0-75.728-12.979-12.979-31.017-17.884-47.825-14.726l35.199-35.199c14.849 4.242 28.376 12.179 39.374 23.177 17.227 17.227 26.715 40.173 26.715 64.611-.001 24.438-9.489 47.384-26.717 64.612z"/><path id="XMLID_286_" d="m254.89 116.189c2.63 0 5.21-1.069 7.07-2.93 1.86-1.86 2.93-4.441 2.93-7.07 0-2.63-1.07-5.21-2.93-7.069-1.86-1.86-4.44-2.931-7.07-2.931s-5.21 1.07-7.07 2.931c-1.86 1.859-2.93 4.439-2.93 7.069s1.07 5.21 2.93 7.07c1.86 1.861 4.44 2.93 7.07 2.93z"/></g></g></svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}

EditProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    updateSecurityInfo: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps,{ updateProfile, updateSecurityInfo, getCurrentProfile })(EditProfile)
