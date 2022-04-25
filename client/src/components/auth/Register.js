import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [visiblePass, setVisiblePass] = useState(false)
    const [visiblePass2, setVisiblePass2] = useState(false)
    const [formData, setFormData] = useState({
        account_type: '',
        name: '',
        email: '',
        password: '',
        repeatpass: '',
        phone: '',
        birthdate: '',
        gender: 'Male',
        agreements: false
    })
    const { account_type, name, email, password, repeatpass, phone, birthdate, gender, agreements } = formData
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value.trim() })
    const onSubmit = e =>{
        e.preventDefault()
        if(password !== repeatpass){
            setAlert('Passwords do not match', 'danger')
        }else if(!agreements){
            setAlert('Terms must be approved', 'danger')
        }else if(name.length > 30){
            setAlert('Please enter a valid full name', 'danger')
        }else{
            register({ account_type, name, email, password, gender, birthdate, phone })
        }
    }
    // Redirect if logged in
    if(isAuthenticated) return <Redirect to="/dashboard" />
    return (
        <div className="register">
            <div className="content">
                <div className="box">
                    <p className='form-title'>Sign up</p>
                    <form onSubmit={ e => onSubmit(e) }>
                        <p className="my-2 text-bold lead">Select type of account</p>
                        <div className="acc-type">
                            <div className="item student">
                                <input id="student" type="radio" name="account_type" onChange={()=> setFormData({ ...formData, account_type: 'Student'}) } />
                                <label className="svg-icon blured-background" htmlFor="student">
                                    <svg viewBox="0 0 511.989 511.989"><g><path d="m470.994 330c0-24.146-17.205-44.348-40-48.994v-54.006c0-4.92-2.412-9.526-6.456-12.329s-9.206-3.445-13.811-1.716l-28.629 10.736c-18.8-19.545-41.652-34.266-66.694-43.303 24.608-18.234 40.59-47.478 40.59-80.388 0-55.141-44.859-100-100-100s-100 44.859-100 100c0 32.91 15.982 62.154 40.59 80.388-25.043 9.038-47.894 23.759-66.694 43.303l-28.629-10.736c-4.606-1.729-9.768-1.087-13.811 1.716-4.044 2.803-6.456 7.409-6.456 12.329v54.006c-22.795 4.646-40 24.847-40 48.994s17.205 44.348 40 48.994v58.006c0 6.253 3.879 11.85 9.733 14.045l160 60c3.374 1.258 7.159 1.258 10.533 0l160-60c5.854-2.195 9.733-7.792 9.733-14.045v-58.006c22.796-4.646 40.001-24.848 40.001-48.994zm-285-230c0-38.598 31.402-70 70-70s70 31.402 70 70-31.402 70-70 70-70-31.402-70-70zm70 100c35.143 0 68.709 12.701 94.899 35.393l-94.899 35.587-94.899-35.587c26.191-22.692 59.757-35.393 94.899-35.393zm-185 130c0-11.028 8.972-20 20-20h10v40h-10c-11.028 0-20-8.972-20-20zm40 49.497c11.397-2.323 20-12.424 20-24.497v-50c0-12.073-8.603-22.174-20-24.497v-31.858l130 48.75v177.961l-130-48.75zm160 95.858v-177.96l130-48.75v31.858c-11.397 2.323-20 12.424-20 24.497v50c0 12.073 8.603 22.174 20 24.497v47.108zm150-125.355h-10v-40h10c11.028 0 20 8.972 20 20s-8.971 20-20 20z"/></g></svg>
                                    Student
                                </label>
                            </div>
                            <div className="item teacher">
                                <input id="teacher" type="radio" name="account_type" onChange={()=> setFormData({ ...formData, account_type: 'Teacher'}) } />
                                <label className="svg-icon blured-background" htmlFor="teacher">
                                    <svg viewBox="0 0 512 512">
                                        <g>
                                            <g>
                                                <path d="M466,242.581c0-168.832,0.472-158.076-1.102-161.96c3.369-8.323-1.27-17.612-9.777-20.043l-210-60
                                                    c-2.693-0.77-5.548-0.77-8.241,0l-210,60C20.439,62.417,16,68.303,16,75.001s4.439,12.583,10.879,14.423L106,112.029
                                                    c0,0.679,0,1.306,0,1.891c0,5.083,0,6.755,0,6.727c0,8.27,0,25.579,0,59.353c0,58.278,30.068,108.896,73.87,133.718l-8.275,16.55
                                                    c-40.483,2.316-78.308,19.564-107.364,49.156C33.129,411.1,16,452.855,16,497.001c0,8.284,6.716,15,15,15h420
                                                    c8.284,0,15-6.716,15-15c0-44.145-17.129-85.9-48.231-117.575c-29.054-29.59-66.879-46.827-107.359-49.146l-8.281-16.561
                                                    C345.932,288.897,376,238.279,376,180.001c0-3.699,0-66.967,0-67.971l60-17.143v147.694c-17.459,6.192-30,22.865-30,42.42v30
                                                    c0,8.284,6.716,15,15,15h60c8.284,0,15-6.716,15-15v-30C496,265.446,483.459,248.772,466,242.581z M226,482.001H46.804
                                                    c7.103-65.907,60.46-117.899,126.328-121.761L226,439.543V482.001z M198.309,343.923l9.286-18.573
                                                    c10.687,3.034,21.879,4.651,33.405,4.651s22.717-1.617,33.404-4.65l9.286,18.572L241,407.959L198.309,343.923z M308.868,360.241
                                                    c65.868,3.86,119.225,55.853,126.328,121.76H256v-42.458L308.868,360.241z M241,300.001c-50.888,0-93.431-41.589-102.988-96.587
                                                    c31.678,14.133,67.086,21.587,102.988,21.587c35.9,0,71.308-7.453,102.987-21.584C334.43,258.413,291.887,300.001,241,300.001z
                                                    M345.672,163.069c-0.872,4.334-3.441,7.986-7.037,9.752c-29.533,14.51-63.294,22.179-97.635,22.179
                                                    c-34.344,0-68.106-7.671-97.637-22.183c-4.892-2.403-7.363-7.967-7.363-13.031V120.6c108.861,31.103,101.999,29.4,105,29.4
                                                    c3,0-3.883,1.71,105-29.4C346,163.657,346.119,160.868,345.672,163.069z M241,119.401l-155.399-44.4L241,30.6l155.399,44.4
                                                    L241,119.401z M466,300.001h-30v-15c0-8.271,6.729-15,15-15s15,6.729,15,15V300.001z"/>
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M361,420.001h-30c-8.284,0-15,6.716-15,15s6.716,15,15,15h30c8.284,0,15-6.716,15-15S369.284,420.001,361,420.001z"/>
                                            </g>
                                        </g>
                                    </svg>
                                    Teacher
                                </label>
                            </div>
                        </div>
                        <p className="my-3 text-bold lead">General information</p>
                        <div className="row fields">
                            <div className="col-lg-6">
                                <label className="required" htmlFor="full_name">Full name <span>*</span></label>
                                <input id="full_name" className={name.length > 30?"input-item unvalid":name.length > 0 ? "input-item valid":"input-item"} type="text" name="name" value={name} onChange={e => onChange(e)} placeholder="Mohammed Youcef" />
                            </div>
                            <div className="col-lg-6">
                                <label className="required" htmlFor="email">Email Address <span>*</span></label>
                                <input id="email" className={email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) ?"input-item valid":email.length === 0?"input-item":"input-item unvalid"} type="email" name="email" value={email} onChange={e => onChange(e)} placeholder="info@hutaro.com" />
                            </div>
                            <div className="col-lg-6">
                                <label className="required" htmlFor="pass">Password <span>*</span></label>
                                <div className="pass">
                                    <input id="pass" className={password.length >= 6?"input-item valid":password.length === 0?"input-item":"input-item unvalid"} type={visiblePass?'text':'password'} name="password" value={password} onChange={e => onChange(e)} placeholder="password" />
                                    <span id="visible-pass" className="svg-icon visible" onClick={()=> setVisiblePass(!visiblePass)}>
                                        <svg viewBox="0 0 512.001 512.001">
                                            <g>
                                                <g>
                                                    <path d="M510.096,249.937c-4.032-5.867-100.928-143.275-254.101-143.275C124.56,106.662,7.44,243.281,2.512,249.105
                                                        c-3.349,3.968-3.349,9.792,0,13.781C7.44,268.71,124.56,405.329,255.995,405.329S504.549,268.71,509.477,262.886
                                                        C512.571,259.217,512.848,253.905,510.096,249.937z M255.995,383.996c-105.365,0-205.547-100.48-230.997-128
                                                        c25.408-27.541,125.483-128,230.997-128c123.285,0,210.304,100.331,231.552,127.424
                                                        C463.013,282.065,362.256,383.996,255.995,383.996z"/>
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <path d="M255.995,170.662c-47.061,0-85.333,38.272-85.333,85.333s38.272,85.333,85.333,85.333s85.333-38.272,85.333-85.333
                                                        S303.056,170.662,255.995,170.662z M255.995,319.996c-35.285,0-64-28.715-64-64s28.715-64,64-64s64,28.715,64,64
                                                        S291.28,319.996,255.995,319.996z"/>
                                                </g>
                                            </g>
                                            {visiblePass ? '' : (
                                                <g>
                                                    <g>
                                                        <path d="M444.865,67.128c-4.16-4.16-10.923-4.16-15.083,0L67.116,429.795c-4.16,4.16-4.16,10.923,0,15.083
                                                            c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.115L444.865,82.211
                                                            C449.025,78.051,449.025,71.288,444.865,67.128z"/>
                                                    </g>
                                                </g>
                                            ) }
                                        </svg>
                                    </span>
                                </div>
                                <p className="lead desc">password must be at least 6 characters</p>
                            </div>
                            <div className="col-lg-6">
                                <label className="required" htmlFor="repeatpass">Repeat Password <span>*</span></label>
                                <div className="pass">
                                    <input id="repeatpass" className={repeatpass.length >= 6 && password === repeatpass ?"input-item valid":repeatpass.length === 0?"input-item":"input-item unvalid"} type={visiblePass2?'text':'password'} name="repeatpass" value={repeatpass} onChange={e => onChange(e)} placeholder="Repeat password" />
                                    <span id="visible-pass" className="svg-icon visible" onClick={()=> setVisiblePass2(!visiblePass2)}>
                                        <svg viewBox="0 0 512.001 512.001">
                                            <g>
                                                <g>
                                                    <path d="M510.096,249.937c-4.032-5.867-100.928-143.275-254.101-143.275C124.56,106.662,7.44,243.281,2.512,249.105
                                                    c-3.349,3.968-3.349,9.792,0,13.781C7.44,268.71,124.56,405.329,255.995,405.329S504.549,268.71,509.477,262.886
                                                    C512.571,259.217,512.848,253.905,510.096,249.937z M255.995,383.996c-105.365,0-205.547-100.48-230.997-128
                                                    c25.408-27.541,125.483-128,230.997-128c123.285,0,210.304,100.331,231.552,127.424
                                                    C463.013,282.065,362.256,383.996,255.995,383.996z"/>
                                                </g>
                                            </g>
                                            <g>
                                                <g>
                                                    <path d="M255.995,170.662c-47.061,0-85.333,38.272-85.333,85.333s38.272,85.333,85.333,85.333s85.333-38.272,85.333-85.333
                                                    S303.056,170.662,255.995,170.662z M255.995,319.996c-35.285,0-64-28.715-64-64s28.715-64,64-64s64,28.715,64,64
                                                    S291.28,319.996,255.995,319.996z"/>
                                                    </g>
                                                </g>
                                            {visiblePass2 ? '' : (
                                            <g>
                                                <g>
                                                    <path d="M444.865,67.128c-4.16-4.16-10.923-4.16-15.083,0L67.116,429.795c-4.16,4.16-4.16,10.923,0,15.083
                                                    c2.091,2.069,4.821,3.115,7.552,3.115c2.731,0,5.461-1.045,7.531-3.115L444.865,82.211
                                                    C449.025,78.051,449.025,71.288,444.865,67.128z"/>
                                                    </g>
                                            </g>
                                            )}
                                        </svg>
                                    </span>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="required" htmlFor="mobile">Phone Number</label>
                                <input id="mobile" className="input-item" type="tel" name="phone" value={phone} onChange={e => onChange(e)} placeholder="(+213) 0123456789" />
                            </div>
                            <div className="col-lg-6">
                                <label className="required" htmlFor="birthdate">Date of birth</label>
                                <input id="birthdate" className="input-item" type="date" name="birthdate" value={birthdate} onChange={e=>onChange(e)} />
                            </div>
                            <div className="col-12">
                                <label className="required" htmlFor="gender">Gender</label>
                                <select id="gender" className="input-item" name="gender" value={gender} onChange={e => onChange(e)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div className="terms">
                                <input id="check" type="checkbox" name="current" checked={agreements} value={agreements} onChange={e=> setFormData({...formData, agreements: !agreements}) } />
                                <label htmlFor="check">
                                    <span className="check">
                                        <svg viewBox="0 0 512 512">
                                            <g>
                                                <g>
                                                    <path d="M504.502,75.496c-9.997-9.998-26.205-9.998-36.204,0L161.594,382.203L43.702,264.311c-9.997-9.998-26.205-9.997-36.204,0
                                                        c-9.998,9.997-9.998,26.205,0,36.203l135.994,135.992c9.994,9.997,26.214,9.99,36.204,0L504.502,111.7
                                                        C514.5,101.703,514.499,85.494,504.502,75.496z"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                    <p className="required" htmlFor="terms">I agree to the<Link to="/terms">Terms</Link>,<Link to="/privacy">Privacy Policy</Link>and<Link to="/fees">Fees</Link></p>
                                </label>
                            </div>
                            <div className="col-12 footer">
                                <div className="link">
                                    <p className="link">One of us ? <Link to="/login">Sign In</Link></p>
                                </div>
                                <div className="submit">
                                    <button className="btn btn-primary svg-icon">Sign up</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
