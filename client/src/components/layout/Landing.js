<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {getRecentUsers} from '../../actions/auth'
import defaultImg from '../../assets/img/default.png'

const Landing = ({ auth:{ isAuthenticated, users }, getRecentUsers }) => {
    const [active, setActive] = useState(0)
    useEffect(() => {
        getRecentUsers()
    }, [getRecentUsers])
    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return <div className="landing">
                <section className="sec-100vh home">
                    <div className="circles">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="wel sides">
                        <div className="inner">
                            <span className="pen">💉Easy-to-use</span>
                            <h1>With <a href="/">Vacci.</a><br/> Manage Your Vaccinations in flexibility</h1>
                            <p>A solution for the entire management <br/> of your vaccination center</p>
                            <a href="/register" className="btn">Let's get started</a>
                        </div>
                    </div>
                    <div className="pic sides">
                        <div className="inner">
                            <div className="our-family blured-background blr-bw">
                                <div className="prsns">
                                    <div className="person">
                                        <img src="/assets/1.jpeg" alt="1"/>
                                    </div>
                                    <div className="person">
                                        <img src="/assets/2.jpeg" alt="2"/>
                                    </div>
                                    <div className="person">
                                        <img src="/assets/3.jpeg" alt="3"/>
                                    </div>
                                </div>
                                <div className="txt">
                                    <span>30k +</span>
                                    <p>Users</p>
                                </div>
                            </div>
                            <div className="comment blured-background blr-bw">
                                <p><q> The best managment system ever </q></p>
                                <div className="user">
                                    <div className="avatar">
                                        <img src="/assets/1.jpeg" alt="comment"/>
                                    </div>
                                    <span>James Elijah</span>
                                </div>
                            </div>
                            <div className="box-sm box"></div>
                            <div className="box-lg box">
                                <span></span>
                                <span></span>
                                <div className="image">
                                    <img src="/assets/nurse.png" alt="main-picture"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="sec-100vh second-sec">
                    <div className="vaccin">
                        <img src="/assets/Sinovac.png" alt="Sinovac"/>
                    </div>
                    <div className="vaccin">
                        <img src="/assets/AstraZeneca.png" alt="AstraZeneca"/>
                    </div>
                    <div className="vaccin">
                        <img src="/assets/Pfizer.png" alt="Pfizer"/>
                    </div>
                    <div className="vaccin">
                        <img src="/assets/moderna.png" alt="moderna"/>
                    </div>
                    <div className="vaccin">
                        <img src="/assets/janssen.png" alt="janssen"/>
                    </div>
                </section>
                <section className="sec-100vh pricing">
                    <div className="shapes XSR2">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="title">
                        <h1>Our Pricing Table</h1>
                        <span className="h-line"></span>
                    </div>
                    <p className="desc">Read the advantages of each offer and choose <br/> the one that best suits your business.</p>
                    <div className="cards">
                        <div onClick={()=>setActive(0)} className={active === 0 ? 'card active' : 'card'}>
                            <div className="head">
                                <h2>Free Trial</h2>
                            </div>
                            <p className="info">Supports 10 Users For One Week</p>
                            <ul>
                                <li className="supported"><span>✅</span>Space For 10 Users</li>
                                <li className="supported not"><span>❌</span>New Updates</li>
                                <li className="supported not"><span>❌</span>Dark Mode</li>
                            </ul>
                            <span className="more">Read More {'>'}</span>
                        </div>
                        <div onClick={()=>setActive(1)} className={active === 1 ? 'card active' : 'card'}>
                            <div className="head">
                                <h2>Standard Plan</h2>
                                <span className="price blured-background blr-bw">30$ / month</span>
                            </div>
                            <p className="info">Supports More Than 200 Users</p>
                            <ul>
                                <li className="supported"><span>✅</span>Space For More Than 200 Users</li>
                                <li className="supported"><span>✅</span>New Updates</li>
                                <li className="supported"><span>✅</span>Dark Mode</li>
                            </ul>
                            <span className="more">Read More {'>'}</span>
                        </div>
                        <div onClick={()=>setActive(2)} className={active === 2 ? 'card active' : 'card'}>
                            <div className="head">
                                <h2>Premium Plan</h2>
                                <span className="price blured-background blr-bw">99$ / month</span>
                            </div>
                            <p className="info">Unlimited Users Space</p>
                            <ul>
                                <li className="supported"><span>✅</span>Unlimited Users Space</li>
                                <li className="supported"><span>✅</span>New Updates</li>
                                <li className="supported"><span>✅</span>Dark Mode</li>
                            </ul>
                            <span className="more">Read More {'>'}</span>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <section className="sec-100vh contact">
                        <div className="title text-center">
                            <h1>Contact Us</h1>
                            <span className="h-line"></span>
                        </div>
                        <div className="row d-flex justify-content-between">
                            <div className="col-md-5 my-3">
                                <p className="text-xs text-bold ">Say hi to the team</p>
                                <form>
                                    <label htmlFor="fullname">Full Name</label>
                                    <input id='fullname' className="input-item" placeholder="Full Name" type="text" maxLength="30" name="full_name" />
                                    <label htmlFor="email">Email Address</label>
                                    <input id='email' className="input-item" placeholder="Email Address" type="email" maxLength="30" name="email" />
                                    <label htmlFor="message">Message</label>
                                    <textarea id='message' className="input-item text-xs" rows="5" placeholder="Message" maxLength="150" type="text" name="email"></textarea>
                                    <p className="lead my">All fields are required please fill alll of them.</p>
                                    <div className="d-flex justify-content-end my-3">
                                        <button type="submit" className="btn btn-dark text-bold btn-glob align-self-end">Send</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5 my-3">
                                <p className="text-xs text-bold">Feel free contact us if you need some help, consultation or you have some other questions.</p>
                                <div className="row">
                                    <div className="col-md-6 info">
                                        <p className="text-xs text-bold">Opening hours</p><br/>
                                        <p className="lead">Sanday - Thursday<br/>9am - 5pm<br/>Weekend<br/>Closed</p>
                                    </div>
                                    <div className="col-md-6 info">
                                        <p className="text-xs text-bold">Address</p><br/>
                                        <p className="lead"><a className="lead svg-icon" rel="noreferrer" target="_blank" href="https://goo.gl/maps/rANCuafvi8sJRaTU8">
                                            <svg viewBox="0 0 128 128"><path d="m80.229 82.863c.231-.376.462-.745.693-1.128 10.389-17.2 15.617-32.246 15.542-44.715a32.464 32.464 0 0 0 -64.927-.011c-.076 12.48 5.153 27.528 15.542 44.726.231.383.462.752.693 1.128-21.872 2.703-36.372 10.52-36.372 19.801 0 11.652 23.1 20.779 52.6 20.779s52.6-9.127 52.6-20.779c0-9.281-14.5-17.098-36.371-19.801zm-45.192-45.843a28.964 28.964 0 1 1 57.927.011c.15 24.858-23.09 55.517-28.964 62.869-5.874-7.352-29.115-38.012-28.963-62.88zm28.963 82.923c-29.371 0-49.1-8.935-49.1-17.279 0-7.4 14.629-14.285 34.934-16.518a185.3 185.3 0 0 0 12.833 17.654 1.748 1.748 0 0 0 2.666 0 185.3 185.3 0 0 0 12.834-17.654c20.3 2.233 34.934 9.114 34.934 16.518-.001 8.344-19.73 17.279-49.101 17.279z"/><path d="m49.692 109.807c-7.766-.994-14-2.744-17.548-4.925a1.75 1.75 0 1 0 -1.833 2.981c3.963 2.436 10.689 4.36 18.937 5.415a1.7 1.7 0 0 0 .224.014 1.75 1.75 0 0 0 .22-3.485z"/><path d="m66.939 110.643c-2.439.056-4.979.043-7.458-.048a1.75 1.75 0 1 0 -.129 3.5c1.538.056 3.1.085 4.648.085q1.527 0 3.021-.036a1.75 1.75 0 0 0 1.709-1.79 1.73 1.73 0 0 0 -1.791-1.711z"/><path d="m78.777 37.02a14.778 14.778 0 1 0 -14.777 14.78 14.795 14.795 0 0 0 14.777-14.78zm-26.055 0a11.278 11.278 0 1 1 11.278 11.28 11.29 11.29 0 0 1 -11.278-11.28z"/></svg>
                                            &nbsp;Algeria, Batna, Arris
                                        </a><br/>BP N238 MEZZOUDJI AMOR ARRIS</p>
                                    </div>
                                    <div className="col-md-6 info">
                                        <p className="text-xs text-bold">Support</p><br/>
                                        <p>
                                            <a className="lead svg-icon" href="mailto:help@Vacci.com">
                                                <svg viewBox="0 0 511.974 511.974">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M511.872,195.725c-0.053-0.588-0.17-1.169-0.35-1.732c-0.117-0.503-0.28-0.994-0.486-1.468
                                                                    c-0.239-0.463-0.525-0.901-0.853-1.306c-0.329-0.481-0.71-0.924-1.135-1.323c-0.137-0.119-0.196-0.282-0.341-0.401
                                                                    l-82.065-63.735V59.704c0-14.138-11.462-25.6-25.6-25.6h-92.476L271.539,5.355c-9.147-7.134-21.974-7.134-31.121,0
                                                                    l-37.035,28.749h-92.476c-14.138,0-25.6,11.461-25.6,25.6v66.057L3.268,189.496c-0.145,0.12-0.205,0.282-0.341,0.401
                                                                    c-0.425,0.398-0.806,0.842-1.135,1.323c-0.328,0.405-0.614,0.842-0.853,1.306c-0.207,0.473-0.369,0.965-0.486,1.468
                                                                    c-0.178,0.555-0.295,1.127-0.35,1.707c0,0.179-0.102,0.333-0.102,0.512V486.37c0.012,5.428,1.768,10.708,5.009,15.061
                                                                    c0.051,0.077,0.06,0.171,0.119,0.239c0.06,0.068,0.188,0.145,0.273,0.239c4.794,6.308,12.25,10.027,20.173,10.061h460.8
                                                                    c7.954-0.024,15.441-3.761,20.241-10.103c0.068-0.085,0.171-0.111,0.23-0.196c0.06-0.085,0.068-0.162,0.12-0.239
                                                                    c3.241-4.354,4.997-9.634,5.009-15.061V196.237C511.974,196.058,511.881,195.904,511.872,195.725z M250.854,18.82
                                                                    c2.98-2.368,7.2-2.368,10.18,0l19.686,15.283h-49.493L250.854,18.82z M27.725,494.904l223.13-173.321
                                                                    c2.982-2.364,7.199-2.364,10.18,0l223.189,173.321H27.725z M494.908,481.6L271.539,308.117c-9.149-7.128-21.972-7.128-31.121,0
                                                                    L17.041,481.6V209.233L156.877,317.82c3.726,2.889,9.088,2.211,11.977-1.515c2.889-3.726,2.211-9.088-1.515-11.977
                                                                    L25.276,194.018l60.032-46.652v65.937c0,4.713,3.821,8.533,8.533,8.533c4.713,0,8.533-3.821,8.533-8.533v-153.6
                                                                    c0-4.713,3.82-8.533,8.533-8.533h290.133c4.713,0,8.533,3.82,8.533,8.533v153.6c0,4.713,3.82,8.533,8.533,8.533
                                                                    s8.533-3.821,8.533-8.533v-65.937l60.032,46.652l-142.31,110.507c-2.448,1.855-3.711,4.883-3.305,7.928s2.417,5.637,5.266,6.786
                                                                    c2.849,1.149,6.096,0.679,8.501-1.232l140.083-108.774V481.6z"/>
                                                                <path d="M358.374,204.77v-34.133c0-56.554-45.846-102.4-102.4-102.4c-56.554,0-102.4,45.846-102.4,102.4
                                                                    s45.846,102.4,102.4,102.4c4.713,0,8.533-3.82,8.533-8.533s-3.82-8.533-8.533-8.533c-47.128,0-85.333-38.205-85.333-85.333
                                                                    s38.205-85.333,85.333-85.333s85.333,38.205,85.333,85.333v34.133c0,9.426-7.641,17.067-17.067,17.067
                                                                    s-17.067-7.641-17.067-17.067v-34.133c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.82-8.533,8.533
                                                                    c0,18.851-15.282,34.133-34.133,34.133c-18.851,0-34.133-15.282-34.133-34.133s15.282-34.133,34.133-34.133
                                                                    c4.713,0,8.533-3.82,8.533-8.533s-3.82-8.533-8.533-8.533c-22.915-0.051-43.074,15.13-49.354,37.168
                                                                    c-6.28,22.038,2.847,45.565,22.347,57.601c19.5,12.036,44.622,9.65,61.507-5.843c1.858,18.046,17.543,31.464,35.659,30.505
                                                                    C344.25,237.91,358.431,222.912,358.374,204.77z"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            &nbsp;help@Vacci.com</a><br/>
                                            <a className="lead svg-icon" href="tel:+213657960928">
                                                <svg viewBox="0 0 482.6 482.6">
                                                    <g>
                                                        <path d="M98.339,320.8c47.6,56.9,104.9,101.7,170.3,133.4c24.9,11.8,58.2,25.8,95.3,28.2c2.3,0.1,4.5,0.2,6.8,0.2
                                                            c24.9,0,44.9-8.6,61.2-26.3c0.1-0.1,0.3-0.3,0.4-0.5c5.8-7,12.4-13.3,19.3-20c4.7-4.5,9.5-9.2,14.1-14
                                                            c21.3-22.2,21.3-50.4-0.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2c-12.8,0-25.1,5.6-35.6,16.1l-35.8,35.8
                                                            c-3.3-1.9-6.7-3.6-9.9-5.2c-4-2-7.7-3.9-11-6c-32.6-20.7-62.2-47.7-90.5-82.4c-14.3-18.1-23.9-33.3-30.6-48.8
                                                            c9.4-8.5,18.2-17.4,26.7-26.1c3-3.1,6.1-6.2,9.2-9.3c10.8-10.8,16.6-23.3,16.6-36s-5.7-25.2-16.6-36l-29.8-29.8
                                                            c-3.5-3.5-6.8-6.9-10.2-10.4c-6.6-6.8-13.5-13.8-20.3-20.1c-10.3-10.1-22.4-15.4-35.2-15.4c-12.7,0-24.9,5.3-35.6,15.5l-37.4,37.4
                                                            c-13.6,13.6-21.3,30.1-22.9,49.2c-1.9,23.9,2.5,49.3,13.9,80C32.739,229.6,59.139,273.7,98.339,320.8z M25.739,104.2
                                                            c1.2-13.3,6.3-24.4,15.9-34l37.2-37.2c5.8-5.6,12.2-8.5,18.4-8.5c6.1,0,12.3,2.9,18,8.7c6.7,6.2,13,12.7,19.8,19.6
                                                            c3.4,3.5,6.9,7,10.4,10.6l29.8,29.8c6.2,6.2,9.4,12.5,9.4,18.7s-3.2,12.5-9.4,18.7c-3.1,3.1-6.2,6.3-9.3,9.4
                                                            c-9.3,9.4-18,18.3-27.6,26.8c-0.2,0.2-0.3,0.3-0.5,0.5c-8.3,8.3-7,16.2-5,22.2c0.1,0.3,0.2,0.5,0.3,0.8
                                                            c7.7,18.5,18.4,36.1,35.1,57.1c30,37,61.6,65.7,96.4,87.8c4.3,2.8,8.9,5,13.2,7.2c4,2,7.7,3.9,11,6c0.4,0.2,0.7,0.4,1.1,0.6
                                                            c3.3,1.7,6.5,2.5,9.7,2.5c8,0,13.2-5.1,14.9-6.8l37.4-37.4c5.8-5.8,12.1-8.9,18.3-8.9c7.6,0,13.8,4.7,17.7,8.9l60.3,60.2
                                                            c12,12,11.9,25-0.3,37.7c-4.2,4.5-8.6,8.8-13.3,13.3c-7,6.8-14.3,13.8-20.9,21.7c-11.5,12.4-25.2,18.2-42.9,18.2
                                                            c-1.7,0-3.5-0.1-5.2-0.2c-32.8-2.1-63.3-14.9-86.2-25.8c-62.2-30.1-116.8-72.8-162.1-127c-37.3-44.9-62.4-86.7-79-131.5
                                                            C28.039,146.4,24.139,124.3,25.739,104.2z"/>
                                                    </g>
                                                </svg>
                                            &nbsp;+213 657960928</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className='footer'>
                        <div className="row">
                            <div className="col-md-3">
                                <h1 className="text-md"><Link className="logo" to="/">Vacci.</Link></h1>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-md-3 links">
                                <p className="text-xxs text-bold"><Link to="security.html">Security</Link></p>
                            </div>
                            <div className="col-md-3 links">
                                <p className="text-xxs text-bold"><Link to="help.html">Help Centrer</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="privacy.html">Privacy Policy</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="contact.html">Contact</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="terms.html">Terms & Conditions</Link></p>
                            </div>
                            <div className="col-md-3 links">
                                <p className="text-xxs text-bold"><Link to="customers.html">Customers</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="about.html">About</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="careers.html">Careers</Link></p>
                            </div>
                        </div>
                        <div className="row social">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com" className="col-1">
                                <svg viewBox="0 0 155.139 155.139">
                                    <g>
                                        <path fill="white" d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184
                                            c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452
                                            v20.341H37.29v27.585h23.814v70.761H89.584z"/>
                                    </g>
                                </svg>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com" className="col-1">
                                <svg viewBox="0 0 512 512.00006">
                                    <path fill="white" d="m261.039062 512c-1.695312 0-3.390624 0-5.097656-.007812-40.132812.097656-77.214844-.921876-113.277344-3.117188-33.0625-2.011719-63.242187-13.4375-87.28125-33.039062-23.195312-18.914063-39.035156-44.488282-47.078124-76.003907-7-27.4375-7.371094-54.371093-7.726563-80.421875-.257813-18.691406-.5234375-40.839844-.578125-63.363281.0546875-22.617187.320312-44.765625.578125-63.457031.355469-26.046875.726563-52.980469 7.726563-80.421875 8.042968-31.515625 23.882812-57.089844 47.078124-76.003907 24.039063-19.601562 54.21875-31.027343 87.285157-33.039062 36.0625-2.191406 73.152343-3.2148438 113.371093-3.1171875 40.144532-.0859375 77.214844.9257815 113.277344 3.1171875 33.0625 2.011719 63.242188 13.4375 87.28125 33.039062 23.199219 18.914063 39.035156 44.488282 47.078125 76.003907 7 27.4375 7.371094 54.375 7.726563 80.421875.257812 18.691406.527344 40.839844.578125 63.363281-.050781 22.617187-.320313 44.765625-.578125 63.457031-.148438 11.046875-9.273438 19.875-20.269532 19.726563-11.046874-.152344-19.875-9.230469-19.726562-20.273438.253906-18.582031.523438-40.585937.574219-62.910156-.050781-22.230469-.320313-44.234375-.574219-62.816406-.324219-23.714844-.660156-48.238281-6.488281-71.078125-5.878907-23.039063-17.183594-41.507813-33.597657-54.894532-17.753906-14.480468-39.433593-22.59375-64.433593-24.113281-35.214844-2.140625-71.464844-3.128906-110.847657-3.046875-39.476562-.09375-75.730468.90625-110.945312 3.046875-25 1.519531-46.675781 9.632813-64.433594 24.109375-16.414062 13.386719-27.71875 31.855469-33.597656 54.898438-5.828125 22.839844-6.164062 47.363281-6.488281 71.078125-.253907 18.582031-.519531 40.585937-.574219 62.910156.054688 22.230469.320312 44.234375.574219 62.816406.324219 23.714844.660156 48.238281 6.488281 71.078125 5.878906 23.039063 17.183594 41.507813 33.597656 54.894532 17.757813 14.480468 39.433594 22.59375 64.433594 24.113281 35.214844 2.140625 71.476562 3.140625 110.851562 3.042969 39.480469.09375 75.726563-.902344 110.941407-3.042969 25-1.519531 46.675781-9.632813 64.433593-24.113281 11.824219-9.644532 21.0625-22.019532 27.457032-36.785157 4.390625-10.132812 16.164062-14.792969 26.300781-10.402343 10.136719 4.390624 14.792969 16.164062 10.40625 26.300781-8.964844 20.699219-22.046875 38.15625-38.886719 51.886719-24.039062 19.605468-54.21875 31.027343-87.28125 33.039062-34.535156 2.101562-70.011718 3.125-108.277344 3.125zm118.949219-256c0-68.925781-56.074219-125-125-125-68.921875 0-125 56.074219-125 125s56.078125 125 125 125c68.925781 0 125-56.074219 125-125zm-40 0c0 46.867188-38.128906 85-85 85-46.867187 0-85-38.132812-85-85s38.132813-85 85-85c46.871094 0 85 38.132812 85 85zm54-165c-16.566406 0-30 13.429688-30 30s13.433594 30 30 30c16.570313 0 30-13.429688 30-30s-13.429687-30-30-30zm0 0"/>
                                </svg>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com" className="col-1">
                                <svg viewBox="0 0 512 512.00006">
                                    <g>
                                        <g>
                                            <path fill="white" d="M459,0H51C22.95,0,0,22.95,0,51v408c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V51C510,22.95,487.05,0,459,0z
                                                M153,433.5H76.5V204H153V433.5z M114.75,160.65c-25.5,0-45.9-20.4-45.9-45.9s20.4-45.9,45.9-45.9s45.9,20.4,45.9,45.9
                                                S140.25,160.65,114.75,160.65z M433.5,433.5H357V298.35c0-20.399-17.85-38.25-38.25-38.25s-38.25,17.851-38.25,38.25V433.5H204
                                                V204h76.5v30.6c12.75-20.4,40.8-35.7,63.75-35.7c48.45,0,89.25,40.8,89.25,89.25V433.5z"/>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.github.com" className="col-1">
                                <svg viewBox="0 0 512 512.00006">
                                    <g>
                                        <path fill="var(--White-color)" d="M427.501,200.695c1.776-11.238,2.884-23.56,3.163-37.377c-0.107-59.246-28.468-80.21-33.925-90.038
                                            c8.037-44.89-1.331-65.309-5.688-72.299c-16.07-5.704-55.91,14.722-77.678,29.101c-35.491-10.389-110.494-9.375-138.621,2.689
                                            C122.856-4.389,95.408,1.277,95.408,1.277s-17.745,31.82-4.691,78.371c-17.075,21.759-29.802,37.143-29.802,77.949
                                            c0,9.773,0.607,19.008,1.637,27.893c14.705,77.318,75.97,110.674,136.15,116.426c-9.056,6.881-19.928,19.903-21.432,34.992
                                            c-11.379,7.357-34.268,9.789-52.067,4.193c-24.939-7.88-34.486-57.266-71.833-50.221c-8.081,1.512-6.475,6.842,0.523,11.386
                                            c11.378,7.38,22.094,16.554,30.354,36.185c6.344,15.072,19.687,41.982,61.873,41.982c16.747,0,28.477-1.979,28.477-1.979
                                            s0.319,38.406,0.319,53.385c0,17.238-23.264,22.078-23.264,30.348c0,3.289,7.7,3.601,13.888,3.601
                                            c12.229,0,37.673-10.186,37.673-28.103c0-14.237,0.227-62.081,0.227-70.46c0-18.307,9.811-24.136,9.811-24.136
                                            s1.201,97.727-2.361,110.829c-4.177,15.408-11.744,13.219-11.744,20.076c0,10.233,30.589,2.502,40.735-19.897
                                            c7.849-17.495,4.334-113.331,4.334-113.331l8.183-0.178c0,0,0.094,43.892-0.188,63.944c-0.295,20.769-2.438,47.025,9.898,59.417
                                            c8.097,8.15,32.903,22.451,32.903,9.382c0-7.574-17.371-13.833-17.371-34.353V344.45c10.553,0,12.734,31.072,12.734,31.072
                                            l3.804,57.727c0,0-2.526,21.065,22.756,29.856c8.925,3.126,28.018,3.976,28.913-1.271c0.897-5.26-22.99-13.038-23.217-29.342
                                            c-0.123-9.93,0.445-15.742,0.445-58.934c0-43.168-5.799-59.137-26.007-71.863C355.669,295.681,416.536,269.51,427.501,200.695z"/>
                                    </g>
                                </svg>
                            </a>
                        </div>
                        <div className="text-center">
                            <p className="text-xxs text-bold">© 2021 <a href="/">Vacci</a>, All rights reserved.</p>
                        </div>
                    </footer>
                </div>
        </div>
}
Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    getRecentUsers: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{ getRecentUsers })(Landing)
=======
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {getRecentUsers} from '../../actions/auth'
import defaultImg from '../../assets/img/default.png'

const Landing = ({ auth:{ isAuthenticated, users }, getRecentUsers }) => {
    useEffect(() => {
        getRecentUsers()
    }, [getRecentUsers])
    // Redirect if logged in
    if(isAuthenticated){
        return <Redirect to="/dashboard" />
    }
    return (
        <>
            <div className="landing">
                <div className="container">
                    <section className="home">
                        <div className="shapes XSR1">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="col-md-7 welcome">
                            <p className="text-md"><span className="text-primary">Student</span> or <span className="text-primary">Teacher</span>, share your opinions and tips.</p>
                            <p className="lead my-4">Hutaroo will connect the teacher and his students, giving the opportunity to share new ideas.</p>
                            <div className="button">
                                <Link className="text-xs svg-icon" to="/register">Let's get started&nbsp;&nbsp;
                                    <svg viewBox="0 0 512 512">
                                        <g>
                                            <g>
                                                <path d="M508.875,248.458l-160-160c-4.167-4.167-10.917-4.167-15.083,0c-4.167,4.167-4.167,10.917,0,15.083l141.792,141.792
                                                    H10.667C4.771,245.333,0,250.104,0,256s4.771,10.667,10.667,10.667h464.917L333.792,408.458c-4.167,4.167-4.167,10.917,0,15.083
                                                    c2.083,2.083,4.813,3.125,7.542,3.125c2.729,0,5.458-1.042,7.542-3.125l160-160C513.042,259.375,513.042,252.625,508.875,248.458z
                                                    "/>
                                            </g>
                                        </g>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-5 right-sec">
                            <div className="new-users">
                                <div className="border">
                                    <span>
                                        <img src={!users || users[0].avatar === "default" ? defaultImg : users[0].avatar} alt="user" />
                                    </span>
                                    <span>
                                        <img src={!users || users[0].avatar === "default" ? defaultImg : users[0].avatar} alt="user" />
                                    </span>
                                    <span>
                                        <img src={!users || users[0].avatar === "default" ? defaultImg : users[0].avatar} alt="user" />
                                    </span>
                                    <span>
                                        <img src={!users || users[0].avatar === "default" ? defaultImg : users[0].avatar} alt="user" />
                                    </span>
                                </div>
                                <div className="title lead">
                                    Recent users.
                                    <span>
                                        <img src={!users || users[0].avatar === "default" ? defaultImg : users[0].avatar} alt="user" />
                                    </span>
                                </div>
                                <div className="outer">
                                    <span>
                                        <img src={!users || users[0].avatar === "default" ? defaultImg : users[0].avatar} alt="user" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="services">
                        <div className="shapes XSR2">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <h1 className="text-md SEC-title">Services<span></span></h1>
                        <div className="row">
                            <div className="col-md-8 cards">
                                <div className="row">
                                    <div className="col-sm-6 card">
                                        <div className="text-center">
                                            <p className="text-primary text-sm svg-icon">
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
                                                </svg>&nbsp;
                                                Share
                                            </p>
                                            <p className="lead my-2">Hutaroo. provides an opportunity to present and discuss various ideas.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 card">
                                        <div className="text-center">
                                            <p className="text-primary text-sm svg-icon">
                                                <svg viewBox="0 0 512.001 512.001">
                                                    <g>
                                                        <g>
                                                            <path d="M437.1,233.45c14.8-10.4,24.6-27.7,24.6-47.2c0-31.9-25.8-57.7-57.7-57.7c-31.9,0-57.7,25.8-57.7,57.7
                                                                c0,19.5,9.7,36.8,24.6,47.2c-12.7,4.4-24.3,11.2-34.1,20c-13.5-11.5-29.4-20.3-46.8-25.5c21.1-12.8,35.3-36.1,35.3-62.6
                                                                c0-40.4-32.7-73.1-73.1-73.1c-40.4,0-73.1,32.8-73.1,73.1c0,26.5,14.1,49.8,35.3,62.6c-17.2,5.2-32.9,13.9-46.3,25.2
                                                                c-9.8-8.6-21.2-15.3-33.7-19.6c14.8-10.4,24.6-27.7,24.6-47.2c0-31.9-25.8-57.7-57.7-57.7s-57.7,25.8-57.7,57.7
                                                                c0,19.5,9.7,36.8,24.6,47.2C28.5,247.25,0,284.95,0,329.25v6.6c0,0.2,0.2,0.4,0.4,0.4h122.3c-0.7,5.5-1.1,11.2-1.1,16.9v6.8
                                                                c0,29.4,23.8,53.2,53.2,53.2h155c29.4,0,53.2-23.8,53.2-53.2v-6.8c0-5.7-0.4-11.4-1.1-16.9H505c0.2,0,0.4-0.2,0.4-0.4v-6.6
                                                                C505.2,284.85,476.8,247.15,437.1,233.45z M362.3,186.15c0-23,18.7-41.7,41.7-41.7s41.7,18.7,41.7,41.7
                                                                c0,22.7-18.3,41.2-40.9,41.7c-0.3,0-0.5,0-0.8,0s-0.5,0-0.8,0C380.5,227.45,362.3,208.95,362.3,186.15z M194.9,165.35
                                                                c0-31.5,25.6-57.1,57.1-57.1s57.1,25.6,57.1,57.1c0,30.4-23.9,55.3-53.8,57c-1.1,0-2.2,0-3.3,0c-1.1,0-2.2,0-3.3,0
                                                                C218.8,220.65,194.9,195.75,194.9,165.35z M59.3,186.15c0-23,18.7-41.7,41.7-41.7s41.7,18.7,41.7,41.7c0,22.7-18.3,41.2-40.9,41.7
                                                                c-0.3,0-0.5,0-0.8,0s-0.5,0-0.8,0C77.6,227.45,59.3,208.95,59.3,186.15z M125.5,320.15H16.2c4.5-42.6,40.5-76,84.2-76.3
                                                                c0.2,0,0.4,0,0.6,0s0.4,0,0.6,0c20.8,0.1,39.8,7.8,54.5,20.3C141.7,279.75,131,298.95,125.5,320.15z M366.8,359.95
                                                                c0,20.5-16.7,37.2-37.2,37.2h-155c-20.5,0-37.2-16.7-37.2-37.2v-6.8c0-62.1,49.6-112.9,111.3-114.7c1.1,0.1,2.3,0.1,3.4,0.1
                                                                s2.3,0,3.4-0.1c61.7,1.8,111.3,52.6,111.3,114.7V359.95z M378.7,320.15c-5.5-21.1-16-40-30.3-55.6c14.8-12.8,34-20.5,55-20.7
                                                                c0.2,0,0.4,0,0.6,0s0.4,0,0.6,0c43.7,0.3,79.7,33.7,84.2,76.3H378.7z"/>
                                                        </g>
                                                    </g>
                                                    <g>
                                                        <g>
                                                            <path d="M107.011,220.606c-19.516,0-35.394,15.877-35.394,35.394c0,6.573,5.329,11.904,11.904,11.904s11.904-5.331,11.904-11.904
                                                                c0-6.389,5.197-11.586,11.586-11.586c6.574,0,11.904-5.331,11.904-11.904C118.915,225.936,113.585,220.606,107.011,220.606z"/>
                                                        </g>
                                                    </g>
                                                </svg>&nbsp;
                                                Rooms
                                            </p>
                                            <p className="lead my-2">Teachers can build rooms and bring students together to share lessons.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-1 sperate hide-sm"></div>
                            <div className="col-md-3 join text-center">
                                <p className="text-sm">Join us now</p>
                                <p className="lead">We are more than <br/><span className="text-primary">{users && users.length}</span></p>
                            </div>
                        </div>
                    </section>
                    <section className="testimonial">
                        <h1 className="text-md SEC-title">Testimonial<span></span></h1>
                        <div className="row cards d-flex justify-content-between">
                            <div className="col-lg-6 card">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="avatar">
                                            <img src={defaultImg} alt="avatar" />
                                        </div>
                                        <p className="lead my-2 text-center text-bold">John</p>
                                    </div>
                                    <div className="col-9">
                                        <div className="col-12 svg-icon">
                                            <svg viewBox="0 0 64 64">
                                                <g id="Quotemarks-right">
                                                    <path fill="var(--Primary-color)" d="M14.1933422,9.4116497c-7.8260994,0-14.1922989,6.3662004-14.1922989,14.1924
                                                        c0,7.5498009,5.9247999,13.7420998,13.3690996,14.169899c0.1288996,1.3916016,0.0321999,5.1797028-3.5977001,10.4491997
                                                        C9.4980431,48.6206512,9.547843,49.1567497,9.888648,49.497551c1.4853945,1.4853973,2.4033947,2.4208984,3.0458946,3.0751991
                                                        c0.8408995,0.8554993,1.2247,1.2461014,1.7861996,1.7559013c0.1904001,0.1727982,0.4306002,0.259697,0.6719055,0.259697
                                                        c0.2342949,0,0.4676943-0.0819969,0.6561956-0.2450981c6.3251991-5.5038986,13.3515987-16.8759995,12.3349991-30.8115005
                                                        C27.7881413,15.3501501,21.820343,9.4116497,14.1933422,9.4116497z M15.4023428,52.2221489
                                                        c-0.2723999-0.2684975-0.5830002-0.5848999-1.0410004-1.0508003c-0.5565996-0.5672989-1.3203001-1.3446999-2.4784994-2.5067978
                                                        c4.4053001-6.7881012,3.5731993-11.6230011,3.2089996-12.3164024c-0.1729002-0.3290977-0.5274-0.5507965-0.8985004-0.5507965
                                                        c-6.7225995,0-12.1922989-5.4697018-12.1922989-12.1933022c0-6.7227001,5.4696999-12.1924,12.1922989-12.1924
                                                        c6.5489006,0,11.6777992,5.1582012,12.1963062,12.2646008C27.5322418,39.3501511,18.2168427,49.5268517,15.4023428,52.2221489z"/>
                                                    <path fill="var(--Primary-color)" d="M63.9004402,23.5317497v-0.0009995C63.302742,15.3501501,57.3340416,9.4116497,49.7090416,9.4116497
                                                        c-7.8261986,0-14.1933937,6.3662004-14.1933937,14.1924c0,7.5498009,5.9257927,13.7420998,13.3710938,14.169899
                                                        c0.1289062,1.3906021,0.0312004,5.1767006-3.5996017,10.4491997c-0.2743988,0.3975029-0.2245979,0.9336014,0.1162033,1.2744026
                                                        c1.4794998,1.4794998,2.3955002,2.4130974,3.0380974,3.0663986c0.8446999,0.8613014,1.2304993,1.2538986,1.7949028,1.7656021
                                                        c0.1903992,0.1718979,0.4315987,0.2587967,0.6718979,0.2587967c0.2344055,0,0.4678001-0.0819969,0.6562004-0.2460976
                                                        C57.8896484,48.8383484,64.9160385,37.4663506,63.9004402,23.5317497z M50.917942,52.2221489
                                                        c-0.2743988-0.2705002-0.5877991-0.5887985-1.0498009-1.0594978c-0.5565987-0.5665016-1.3172989-1.3418007-2.4706993-2.4981003
                                                        c4.4053001-6.7891006,3.5742989-11.6230011,3.2109985-12.3164024c-0.1728973-0.3280983-0.5282974-0.5507965-0.8993988-0.5507965
                                                        c-6.7237015,0-12.1933937-5.4697018-12.1933937-12.1933022c0-6.7227001,5.4696922-12.1924,12.1933937-12.1924
                                                        c6.5477982,0,11.6777,5.1582012,12.1972008,12.2656002v-0.0009995
                                                        C63.0478401,39.3481483,53.7324409,49.5268517,50.917942,52.2221489z"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="col-12 opinion">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis optio aut laboriosam, deserunt voluptates odio ducimus minima ea corrupti unde dolore esse sunt eligendi consequatur. Aut architecto dolores voluptatum aliquid.
                                        </div><br/>
                                        <div className="col-12 d-flex flex-column">
                                            <p className="university">Professor at Canada National University</p>
                                            <div className="stars svg-icon">
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 card">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="avatar">
                                            <img src={defaultImg} alt="avatar" />
                                        </div>
                                        <p className="lead my-2 text-center text-bold">Marten</p>
                                    </div>
                                    <div className="col-9">
                                        <div className="col-12 svg-icon">
                                            <svg viewBox="0 0 64 64">
                                                <g id="Quotemarks-right">
                                                    <path fill="var(--Primary-color)" d="M14.1933422,9.4116497c-7.8260994,0-14.1922989,6.3662004-14.1922989,14.1924
                                                        c0,7.5498009,5.9247999,13.7420998,13.3690996,14.169899c0.1288996,1.3916016,0.0321999,5.1797028-3.5977001,10.4491997
                                                        C9.4980431,48.6206512,9.547843,49.1567497,9.888648,49.497551c1.4853945,1.4853973,2.4033947,2.4208984,3.0458946,3.0751991
                                                        c0.8408995,0.8554993,1.2247,1.2461014,1.7861996,1.7559013c0.1904001,0.1727982,0.4306002,0.259697,0.6719055,0.259697
                                                        c0.2342949,0,0.4676943-0.0819969,0.6561956-0.2450981c6.3251991-5.5038986,13.3515987-16.8759995,12.3349991-30.8115005
                                                        C27.7881413,15.3501501,21.820343,9.4116497,14.1933422,9.4116497z M15.4023428,52.2221489
                                                        c-0.2723999-0.2684975-0.5830002-0.5848999-1.0410004-1.0508003c-0.5565996-0.5672989-1.3203001-1.3446999-2.4784994-2.5067978
                                                        c4.4053001-6.7881012,3.5731993-11.6230011,3.2089996-12.3164024c-0.1729002-0.3290977-0.5274-0.5507965-0.8985004-0.5507965
                                                        c-6.7225995,0-12.1922989-5.4697018-12.1922989-12.1933022c0-6.7227001,5.4696999-12.1924,12.1922989-12.1924
                                                        c6.5489006,0,11.6777992,5.1582012,12.1963062,12.2646008C27.5322418,39.3501511,18.2168427,49.5268517,15.4023428,52.2221489z"/>
                                                    <path fill="var(--Primary-color)" d="M63.9004402,23.5317497v-0.0009995C63.302742,15.3501501,57.3340416,9.4116497,49.7090416,9.4116497
                                                        c-7.8261986,0-14.1933937,6.3662004-14.1933937,14.1924c0,7.5498009,5.9257927,13.7420998,13.3710938,14.169899
                                                        c0.1289062,1.3906021,0.0312004,5.1767006-3.5996017,10.4491997c-0.2743988,0.3975029-0.2245979,0.9336014,0.1162033,1.2744026
                                                        c1.4794998,1.4794998,2.3955002,2.4130974,3.0380974,3.0663986c0.8446999,0.8613014,1.2304993,1.2538986,1.7949028,1.7656021
                                                        c0.1903992,0.1718979,0.4315987,0.2587967,0.6718979,0.2587967c0.2344055,0,0.4678001-0.0819969,0.6562004-0.2460976
                                                        C57.8896484,48.8383484,64.9160385,37.4663506,63.9004402,23.5317497z M50.917942,52.2221489
                                                        c-0.2743988-0.2705002-0.5877991-0.5887985-1.0498009-1.0594978c-0.5565987-0.5665016-1.3172989-1.3418007-2.4706993-2.4981003
                                                        c4.4053001-6.7891006,3.5742989-11.6230011,3.2109985-12.3164024c-0.1728973-0.3280983-0.5282974-0.5507965-0.8993988-0.5507965
                                                        c-6.7237015,0-12.1933937-5.4697018-12.1933937-12.1933022c0-6.7227001,5.4696922-12.1924,12.1933937-12.1924
                                                        c6.5477982,0,11.6777,5.1582012,12.1972008,12.2656002v-0.0009995
                                                        C63.0478401,39.3481483,53.7324409,49.5268517,50.917942,52.2221489z"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="col-12 opinion">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis optio aut laboriosam, deserunt voluptates odio ducimus minima ea corrupti unde dolore esse sunt eligendi consequatur. Aut architecto dolores voluptatum aliquid.
                                        </div><br/>
                                        <div className="col-12 d-flex flex-column">
                                            <p className="university">Professor at Seoul National University</p>
                                            <div className="stars svg-icon">
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 card">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="avatar">
                                            <img src={defaultImg} alt="avatar" />
                                        </div>
                                        <p className="lead my-2 text-center text-bold">Yaakoub</p>
                                    </div>
                                    <div className="col-9">
                                        <div className="col-12 svg-icon">
                                            <svg viewBox="0 0 64 64">
                                                <g id="Quotemarks-right">
                                                    <path fill="var(--Primary-color)" d="M14.1933422,9.4116497c-7.8260994,0-14.1922989,6.3662004-14.1922989,14.1924
                                                        c0,7.5498009,5.9247999,13.7420998,13.3690996,14.169899c0.1288996,1.3916016,0.0321999,5.1797028-3.5977001,10.4491997
                                                        C9.4980431,48.6206512,9.547843,49.1567497,9.888648,49.497551c1.4853945,1.4853973,2.4033947,2.4208984,3.0458946,3.0751991
                                                        c0.8408995,0.8554993,1.2247,1.2461014,1.7861996,1.7559013c0.1904001,0.1727982,0.4306002,0.259697,0.6719055,0.259697
                                                        c0.2342949,0,0.4676943-0.0819969,0.6561956-0.2450981c6.3251991-5.5038986,13.3515987-16.8759995,12.3349991-30.8115005
                                                        C27.7881413,15.3501501,21.820343,9.4116497,14.1933422,9.4116497z M15.4023428,52.2221489
                                                        c-0.2723999-0.2684975-0.5830002-0.5848999-1.0410004-1.0508003c-0.5565996-0.5672989-1.3203001-1.3446999-2.4784994-2.5067978
                                                        c4.4053001-6.7881012,3.5731993-11.6230011,3.2089996-12.3164024c-0.1729002-0.3290977-0.5274-0.5507965-0.8985004-0.5507965
                                                        c-6.7225995,0-12.1922989-5.4697018-12.1922989-12.1933022c0-6.7227001,5.4696999-12.1924,12.1922989-12.1924
                                                        c6.5489006,0,11.6777992,5.1582012,12.1963062,12.2646008C27.5322418,39.3501511,18.2168427,49.5268517,15.4023428,52.2221489z"/>
                                                    <path fill="var(--Primary-color)" d="M63.9004402,23.5317497v-0.0009995C63.302742,15.3501501,57.3340416,9.4116497,49.7090416,9.4116497
                                                        c-7.8261986,0-14.1933937,6.3662004-14.1933937,14.1924c0,7.5498009,5.9257927,13.7420998,13.3710938,14.169899
                                                        c0.1289062,1.3906021,0.0312004,5.1767006-3.5996017,10.4491997c-0.2743988,0.3975029-0.2245979,0.9336014,0.1162033,1.2744026
                                                        c1.4794998,1.4794998,2.3955002,2.4130974,3.0380974,3.0663986c0.8446999,0.8613014,1.2304993,1.2538986,1.7949028,1.7656021
                                                        c0.1903992,0.1718979,0.4315987,0.2587967,0.6718979,0.2587967c0.2344055,0,0.4678001-0.0819969,0.6562004-0.2460976
                                                        C57.8896484,48.8383484,64.9160385,37.4663506,63.9004402,23.5317497z M50.917942,52.2221489
                                                        c-0.2743988-0.2705002-0.5877991-0.5887985-1.0498009-1.0594978c-0.5565987-0.5665016-1.3172989-1.3418007-2.4706993-2.4981003
                                                        c4.4053001-6.7891006,3.5742989-11.6230011,3.2109985-12.3164024c-0.1728973-0.3280983-0.5282974-0.5507965-0.8993988-0.5507965
                                                        c-6.7237015,0-12.1933937-5.4697018-12.1933937-12.1933022c0-6.7227001,5.4696922-12.1924,12.1933937-12.1924
                                                        c6.5477982,0,11.6777,5.1582012,12.1972008,12.2656002v-0.0009995
                                                        C63.0478401,39.3481483,53.7324409,49.5268517,50.917942,52.2221489z"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="col-12 opinion">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis optio aut laboriosam, deserunt voluptates odio ducimus minima ea corrupti unde dolore esse sunt eligendi consequatur. Aut architecto dolores voluptatum aliquid.
                                        </div><br/>
                                        <div className="col-12 d-flex flex-column">
                                            <p className="university">Student at Batna 2 University</p>
                                            <div className="stars svg-icon">
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path fill="var(--Dark-color)" d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 card">
                                <div className="row">
                                    <div className="col-3">
                                        <div className="avatar">
                                            <img src={defaultImg} alt="avatar" />
                                        </div>
                                        <p className="lead my-2 text-center text-bold">Matteo</p>
                                    </div>
                                    <div className="col-9">
                                        <div className="col-12 svg-icon">
                                            <svg viewBox="0 0 64 64">
                                                <g id="Quotemarks-right">
                                                    <path fill="var(--Primary-color)" d="M14.1933422,9.4116497c-7.8260994,0-14.1922989,6.3662004-14.1922989,14.1924
                                                        c0,7.5498009,5.9247999,13.7420998,13.3690996,14.169899c0.1288996,1.3916016,0.0321999,5.1797028-3.5977001,10.4491997
                                                        C9.4980431,48.6206512,9.547843,49.1567497,9.888648,49.497551c1.4853945,1.4853973,2.4033947,2.4208984,3.0458946,3.0751991
                                                        c0.8408995,0.8554993,1.2247,1.2461014,1.7861996,1.7559013c0.1904001,0.1727982,0.4306002,0.259697,0.6719055,0.259697
                                                        c0.2342949,0,0.4676943-0.0819969,0.6561956-0.2450981c6.3251991-5.5038986,13.3515987-16.8759995,12.3349991-30.8115005
                                                        C27.7881413,15.3501501,21.820343,9.4116497,14.1933422,9.4116497z M15.4023428,52.2221489
                                                        c-0.2723999-0.2684975-0.5830002-0.5848999-1.0410004-1.0508003c-0.5565996-0.5672989-1.3203001-1.3446999-2.4784994-2.5067978
                                                        c4.4053001-6.7881012,3.5731993-11.6230011,3.2089996-12.3164024c-0.1729002-0.3290977-0.5274-0.5507965-0.8985004-0.5507965
                                                        c-6.7225995,0-12.1922989-5.4697018-12.1922989-12.1933022c0-6.7227001,5.4696999-12.1924,12.1922989-12.1924
                                                        c6.5489006,0,11.6777992,5.1582012,12.1963062,12.2646008C27.5322418,39.3501511,18.2168427,49.5268517,15.4023428,52.2221489z"/>
                                                    <path fill="var(--Primary-color)" d="M63.9004402,23.5317497v-0.0009995C63.302742,15.3501501,57.3340416,9.4116497,49.7090416,9.4116497
                                                        c-7.8261986,0-14.1933937,6.3662004-14.1933937,14.1924c0,7.5498009,5.9257927,13.7420998,13.3710938,14.169899
                                                        c0.1289062,1.3906021,0.0312004,5.1767006-3.5996017,10.4491997c-0.2743988,0.3975029-0.2245979,0.9336014,0.1162033,1.2744026
                                                        c1.4794998,1.4794998,2.3955002,2.4130974,3.0380974,3.0663986c0.8446999,0.8613014,1.2304993,1.2538986,1.7949028,1.7656021
                                                        c0.1903992,0.1718979,0.4315987,0.2587967,0.6718979,0.2587967c0.2344055,0,0.4678001-0.0819969,0.6562004-0.2460976
                                                        C57.8896484,48.8383484,64.9160385,37.4663506,63.9004402,23.5317497z M50.917942,52.2221489
                                                        c-0.2743988-0.2705002-0.5877991-0.5887985-1.0498009-1.0594978c-0.5565987-0.5665016-1.3172989-1.3418007-2.4706993-2.4981003
                                                        c4.4053001-6.7891006,3.5742989-11.6230011,3.2109985-12.3164024c-0.1728973-0.3280983-0.5282974-0.5507965-0.8993988-0.5507965
                                                        c-6.7237015,0-12.1933937-5.4697018-12.1933937-12.1933022c0-6.7227001,5.4696922-12.1924,12.1933937-12.1924
                                                        c6.5477982,0,11.6777,5.1582012,12.1972008,12.2656002v-0.0009995
                                                        C63.0478401,39.3481483,53.7324409,49.5268517,50.917942,52.2221489z"/>
                                                </g>
                                            </svg>
                                        </div>
                                        <div className="col-12 opinion">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis optio aut laboriosam, deserunt voluptates odio ducimus minima ea corrupti unde dolore esse sunt eligendi consequatur. Aut architecto dolores voluptatum aliquid.
                                        </div><br/>
                                        <div className="col-12 d-flex flex-column">
                                            <p className="university">Student at Usa National University</p>
                                            <div className="stars svg-icon">
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                                <svg viewBox="0 0 49.94 49.94">
                                                    <path d="M48.856,22.731c0.983-0.958,1.33-2.364,0.906-3.671c-0.425-1.307-1.532-2.24-2.892-2.438l-12.092-1.757
                                                        c-0.515-0.075-0.96-0.398-1.19-0.865L28.182,3.043c-0.607-1.231-1.839-1.996-3.212-1.996c-1.372,0-2.604,0.765-3.211,1.996
                                                        L16.352,14c-0.23,0.467-0.676,0.79-1.191,0.865L3.069,16.623C1.71,16.82,0.603,17.753,0.178,19.06
                                                        c-0.424,1.307-0.077,2.713,0.906,3.671l8.749,8.528c0.373,0.364,0.544,0.888,0.456,1.4L8.224,44.702
                                                        c-0.232,1.353,0.313,2.694,1.424,3.502c1.11,0.809,2.555,0.914,3.772,0.273l10.814-5.686c0.461-0.242,1.011-0.242,1.472,0
                                                        l10.815,5.686c0.528,0.278,1.1,0.415,1.669,0.415c0.739,0,1.475-0.231,2.103-0.688c1.111-0.808,1.656-2.149,1.424-3.502
                                                        L39.651,32.66c-0.088-0.513,0.083-1.036,0.456-1.4L48.856,22.731z M37.681,32.998l2.065,12.042c0.104,0.606-0.131,1.185-0.629,1.547
                                                        c-0.499,0.361-1.12,0.405-1.665,0.121l-10.815-5.687c-0.521-0.273-1.095-0.411-1.667-0.411s-1.145,0.138-1.667,0.412l-10.813,5.686
                                                        c-0.547,0.284-1.168,0.24-1.666-0.121c-0.498-0.362-0.732-0.94-0.629-1.547l2.065-12.042c0.199-1.162-0.186-2.348-1.03-3.17
                                                        L2.48,21.299c-0.441-0.43-0.591-1.036-0.4-1.621c0.19-0.586,0.667-0.988,1.276-1.077l12.091-1.757
                                                        c1.167-0.169,2.176-0.901,2.697-1.959l5.407-10.957c0.272-0.552,0.803-0.881,1.418-0.881c0.616,0,1.146,0.329,1.419,0.881
                                                        l5.407,10.957c0.521,1.058,1.529,1.79,2.696,1.959l12.092,1.757c0.609,0.089,1.086,0.491,1.276,1.077
                                                        c0.19,0.585,0.041,1.191-0.4,1.621l-8.749,8.528C37.866,30.65,37.481,31.835,37.681,32.998z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="contact">
                        <h1 className="text-md SEC-title">Contact us<span></span></h1>
                        <div className="row d-flex justify-content-between">
                            <div className="col-md-5 my-3">
                                <p className="text-xs text-bold">Say hi to the team</p>
                                <form>
                                    <label htmlFor="fullname">Full Name</label>
                                    <input id='fullname' className="input-item" placeholder="Full Name" type="text" maxLength="30" name="full_name" />
                                    <label htmlFor="email">Email Address</label>
                                    <input id='email' className="input-item" placeholder="Email Address" type="email" maxLength="30" name="email" />
                                    <label htmlFor="message">Message</label>
                                    <textarea id='message' className="input-item text-xs" rows="5" placeholder="Message" maxLength="150" type="text" name="email"></textarea>
                                    <p className="lead my">All fields are required please fill alll of them.</p>
                                    <div className="d-flex justify-content-end my-3">
                                        <button type="submit" className="btn btn-dark text-bold btn-glob align-self-end">Send</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5 my-3">
                                <p className="text-xs text-bold">Feel free contact us if you need some help, consultation or you have some other questions.</p>
                                <div className="row">
                                    <div className="col-md-6 info">
                                        <p className="text-xs text-bold">Opening hours</p><br/>
                                        <p className="lead">Sanday - Thursday<br/>9am - 5pm<br/>Weekend<br/>Closed</p>
                                    </div>
                                    <div className="col-md-6 info">
                                        <p className="text-xs text-bold">Address</p><br/>
                                        <p className="lead"><a className="lead svg-icon" rel="noreferrer" target="_blank" href="https://goo.gl/maps/rANCuafvi8sJRaTU8">
                                            <svg height="512" viewBox="0 0 128 128" width="512" xmlns="http://www.w3.org/2000/svg"><g><path d="m80.229 82.863c.231-.376.462-.745.693-1.128 10.389-17.2 15.617-32.246 15.542-44.715a32.464 32.464 0 0 0 -64.927-.011c-.076 12.48 5.153 27.528 15.542 44.726.231.383.462.752.693 1.128-21.872 2.703-36.372 10.52-36.372 19.801 0 11.652 23.1 20.779 52.6 20.779s52.6-9.127 52.6-20.779c0-9.281-14.5-17.098-36.371-19.801zm-45.192-45.843a28.964 28.964 0 1 1 57.927.011c.15 24.858-23.09 55.517-28.964 62.869-5.874-7.352-29.115-38.012-28.963-62.88zm28.963 82.923c-29.371 0-49.1-8.935-49.1-17.279 0-7.4 14.629-14.285 34.934-16.518a185.3 185.3 0 0 0 12.833 17.654 1.748 1.748 0 0 0 2.666 0 185.3 185.3 0 0 0 12.834-17.654c20.3 2.233 34.934 9.114 34.934 16.518-.001 8.344-19.73 17.279-49.101 17.279z"/><path d="m49.692 109.807c-7.766-.994-14-2.744-17.548-4.925a1.75 1.75 0 1 0 -1.833 2.981c3.963 2.436 10.689 4.36 18.937 5.415a1.7 1.7 0 0 0 .224.014 1.75 1.75 0 0 0 .22-3.485z"/><path d="m66.939 110.643c-2.439.056-4.979.043-7.458-.048a1.75 1.75 0 1 0 -.129 3.5c1.538.056 3.1.085 4.648.085q1.527 0 3.021-.036a1.75 1.75 0 0 0 1.709-1.79 1.73 1.73 0 0 0 -1.791-1.711z"/><path d="m78.777 37.02a14.778 14.778 0 1 0 -14.777 14.78 14.795 14.795 0 0 0 14.777-14.78zm-26.055 0a11.278 11.278 0 1 1 11.278 11.28 11.29 11.29 0 0 1 -11.278-11.28z"/></g></svg>
                                            &nbsp;Algeria, Batna, Arris
                                        </a><br/>BP N238 MEZZOUDJI AMOR ARRIS</p>
                                    </div>
                                    <div className="col-md-6 info">
                                        <p className="text-xs text-bold">Support</p><br/>
                                        <p>
                                            <a className="lead svg-icon" href="mailto:help@Hutaroo.com">
                                                <svg viewBox="0 0 511.974 511.974">
                                                    <g>
                                                        <g>
                                                            <g>
                                                                <path d="M511.872,195.725c-0.053-0.588-0.17-1.169-0.35-1.732c-0.117-0.503-0.28-0.994-0.486-1.468
                                                                    c-0.239-0.463-0.525-0.901-0.853-1.306c-0.329-0.481-0.71-0.924-1.135-1.323c-0.137-0.119-0.196-0.282-0.341-0.401
                                                                    l-82.065-63.735V59.704c0-14.138-11.462-25.6-25.6-25.6h-92.476L271.539,5.355c-9.147-7.134-21.974-7.134-31.121,0
                                                                    l-37.035,28.749h-92.476c-14.138,0-25.6,11.461-25.6,25.6v66.057L3.268,189.496c-0.145,0.12-0.205,0.282-0.341,0.401
                                                                    c-0.425,0.398-0.806,0.842-1.135,1.323c-0.328,0.405-0.614,0.842-0.853,1.306c-0.207,0.473-0.369,0.965-0.486,1.468
                                                                    c-0.178,0.555-0.295,1.127-0.35,1.707c0,0.179-0.102,0.333-0.102,0.512V486.37c0.012,5.428,1.768,10.708,5.009,15.061
                                                                    c0.051,0.077,0.06,0.171,0.119,0.239c0.06,0.068,0.188,0.145,0.273,0.239c4.794,6.308,12.25,10.027,20.173,10.061h460.8
                                                                    c7.954-0.024,15.441-3.761,20.241-10.103c0.068-0.085,0.171-0.111,0.23-0.196c0.06-0.085,0.068-0.162,0.12-0.239
                                                                    c3.241-4.354,4.997-9.634,5.009-15.061V196.237C511.974,196.058,511.881,195.904,511.872,195.725z M250.854,18.82
                                                                    c2.98-2.368,7.2-2.368,10.18,0l19.686,15.283h-49.493L250.854,18.82z M27.725,494.904l223.13-173.321
                                                                    c2.982-2.364,7.199-2.364,10.18,0l223.189,173.321H27.725z M494.908,481.6L271.539,308.117c-9.149-7.128-21.972-7.128-31.121,0
                                                                    L17.041,481.6V209.233L156.877,317.82c3.726,2.889,9.088,2.211,11.977-1.515c2.889-3.726,2.211-9.088-1.515-11.977
                                                                    L25.276,194.018l60.032-46.652v65.937c0,4.713,3.821,8.533,8.533,8.533c4.713,0,8.533-3.821,8.533-8.533v-153.6
                                                                    c0-4.713,3.82-8.533,8.533-8.533h290.133c4.713,0,8.533,3.82,8.533,8.533v153.6c0,4.713,3.82,8.533,8.533,8.533
                                                                    s8.533-3.821,8.533-8.533v-65.937l60.032,46.652l-142.31,110.507c-2.448,1.855-3.711,4.883-3.305,7.928s2.417,5.637,5.266,6.786
                                                                    c2.849,1.149,6.096,0.679,8.501-1.232l140.083-108.774V481.6z"/>
                                                                <path d="M358.374,204.77v-34.133c0-56.554-45.846-102.4-102.4-102.4c-56.554,0-102.4,45.846-102.4,102.4
                                                                    s45.846,102.4,102.4,102.4c4.713,0,8.533-3.82,8.533-8.533s-3.82-8.533-8.533-8.533c-47.128,0-85.333-38.205-85.333-85.333
                                                                    s38.205-85.333,85.333-85.333s85.333,38.205,85.333,85.333v34.133c0,9.426-7.641,17.067-17.067,17.067
                                                                    s-17.067-7.641-17.067-17.067v-34.133c0-4.713-3.82-8.533-8.533-8.533s-8.533,3.82-8.533,8.533
                                                                    c0,18.851-15.282,34.133-34.133,34.133c-18.851,0-34.133-15.282-34.133-34.133s15.282-34.133,34.133-34.133
                                                                    c4.713,0,8.533-3.82,8.533-8.533s-3.82-8.533-8.533-8.533c-22.915-0.051-43.074,15.13-49.354,37.168
                                                                    c-6.28,22.038,2.847,45.565,22.347,57.601c19.5,12.036,44.622,9.65,61.507-5.843c1.858,18.046,17.543,31.464,35.659,30.505
                                                                    C344.25,237.91,358.431,222.912,358.374,204.77z"/>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            &nbsp;help@Hutaroo.com</a><br/>
                                            <a className="lead svg-icon" href="tel:+213657960928">
                                                <svg viewBox="0 0 482.6 482.6">
                                                    <g>
                                                        <path d="M98.339,320.8c47.6,56.9,104.9,101.7,170.3,133.4c24.9,11.8,58.2,25.8,95.3,28.2c2.3,0.1,4.5,0.2,6.8,0.2
                                                            c24.9,0,44.9-8.6,61.2-26.3c0.1-0.1,0.3-0.3,0.4-0.5c5.8-7,12.4-13.3,19.3-20c4.7-4.5,9.5-9.2,14.1-14
                                                            c21.3-22.2,21.3-50.4-0.2-71.9l-60.1-60.1c-10.2-10.6-22.4-16.2-35.2-16.2c-12.8,0-25.1,5.6-35.6,16.1l-35.8,35.8
                                                            c-3.3-1.9-6.7-3.6-9.9-5.2c-4-2-7.7-3.9-11-6c-32.6-20.7-62.2-47.7-90.5-82.4c-14.3-18.1-23.9-33.3-30.6-48.8
                                                            c9.4-8.5,18.2-17.4,26.7-26.1c3-3.1,6.1-6.2,9.2-9.3c10.8-10.8,16.6-23.3,16.6-36s-5.7-25.2-16.6-36l-29.8-29.8
                                                            c-3.5-3.5-6.8-6.9-10.2-10.4c-6.6-6.8-13.5-13.8-20.3-20.1c-10.3-10.1-22.4-15.4-35.2-15.4c-12.7,0-24.9,5.3-35.6,15.5l-37.4,37.4
                                                            c-13.6,13.6-21.3,30.1-22.9,49.2c-1.9,23.9,2.5,49.3,13.9,80C32.739,229.6,59.139,273.7,98.339,320.8z M25.739,104.2
                                                            c1.2-13.3,6.3-24.4,15.9-34l37.2-37.2c5.8-5.6,12.2-8.5,18.4-8.5c6.1,0,12.3,2.9,18,8.7c6.7,6.2,13,12.7,19.8,19.6
                                                            c3.4,3.5,6.9,7,10.4,10.6l29.8,29.8c6.2,6.2,9.4,12.5,9.4,18.7s-3.2,12.5-9.4,18.7c-3.1,3.1-6.2,6.3-9.3,9.4
                                                            c-9.3,9.4-18,18.3-27.6,26.8c-0.2,0.2-0.3,0.3-0.5,0.5c-8.3,8.3-7,16.2-5,22.2c0.1,0.3,0.2,0.5,0.3,0.8
                                                            c7.7,18.5,18.4,36.1,35.1,57.1c30,37,61.6,65.7,96.4,87.8c4.3,2.8,8.9,5,13.2,7.2c4,2,7.7,3.9,11,6c0.4,0.2,0.7,0.4,1.1,0.6
                                                            c3.3,1.7,6.5,2.5,9.7,2.5c8,0,13.2-5.1,14.9-6.8l37.4-37.4c5.8-5.8,12.1-8.9,18.3-8.9c7.6,0,13.8,4.7,17.7,8.9l60.3,60.2
                                                            c12,12,11.9,25-0.3,37.7c-4.2,4.5-8.6,8.8-13.3,13.3c-7,6.8-14.3,13.8-20.9,21.7c-11.5,12.4-25.2,18.2-42.9,18.2
                                                            c-1.7,0-3.5-0.1-5.2-0.2c-32.8-2.1-63.3-14.9-86.2-25.8c-62.2-30.1-116.8-72.8-162.1-127c-37.3-44.9-62.4-86.7-79-131.5
                                                            C28.039,146.4,24.139,124.3,25.739,104.2z"/>
                                                    </g>
                                                </svg>
                                            &nbsp;+213 657960928</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <div className="row">
                            <div className="col-md-3">
                                <h1 className="text-md"><Link className="logo" to="/">Hutaroo.</Link></h1>
                            </div>
                        </div>
                        <div className="row justify-content-end">
                            <div className="col-md-3 links">
                                <p className="text-xxs text-bold svg-icon SVG-container"><span id="language">English</span>&nbsp;
                                    <svg viewBox="0 0 330 330">
                                        <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
                                            c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                                            s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"/>
                                    </svg>
                                    <span className="languages">
                                        <Link className="lead" to="/ar">&nbsp;العربية</Link>
                                        <Link className="lead" to="/en">&nbsp;English</Link>
                                        <Link className="lead" to="/fr">&nbsp;Francais</Link>
                                    </span>
                                </p><br/>
                                <p className="text-xxs text-bold"><Link to="security.html">Security</Link></p>
                            </div>
                            <div className="col-md-3 links">
                                <p className="text-xxs text-bold"><Link to="help.html">Help Centrer</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="privacy.html">Privacy Policy</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="contact.html">Contact</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="terms.html">Terms & Conditions</Link></p>
                            </div>
                            <div className="col-md-3 links">
                                <p className="text-xxs text-bold"><Link to="customers.html">Customers</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="about.html">About</Link></p><br/>
                                <p className="text-xxs text-bold"><Link to="careers.html">Careers</Link></p>
                            </div>
                        </div>
                        <div className="row social">
                            <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com" className="col-1">
                                <svg viewBox="0 0 155.139 155.139">
                                    <g>
                                        <path fill="white" d="M89.584,155.139V84.378h23.742l3.562-27.585H89.584V39.184
                                            c0-7.984,2.208-13.425,13.67-13.425l14.595-0.006V1.08C115.325,0.752,106.661,0,96.577,0C75.52,0,61.104,12.853,61.104,36.452
                                            v20.341H37.29v27.585h23.814v70.761H89.584z"/>
                                    </g>
                                </svg>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com" className="col-1">
                                <svg viewBox="0 0 512 512.00006">
                                    <path fill="white" d="m261.039062 512c-1.695312 0-3.390624 0-5.097656-.007812-40.132812.097656-77.214844-.921876-113.277344-3.117188-33.0625-2.011719-63.242187-13.4375-87.28125-33.039062-23.195312-18.914063-39.035156-44.488282-47.078124-76.003907-7-27.4375-7.371094-54.371093-7.726563-80.421875-.257813-18.691406-.5234375-40.839844-.578125-63.363281.0546875-22.617187.320312-44.765625.578125-63.457031.355469-26.046875.726563-52.980469 7.726563-80.421875 8.042968-31.515625 23.882812-57.089844 47.078124-76.003907 24.039063-19.601562 54.21875-31.027343 87.285157-33.039062 36.0625-2.191406 73.152343-3.2148438 113.371093-3.1171875 40.144532-.0859375 77.214844.9257815 113.277344 3.1171875 33.0625 2.011719 63.242188 13.4375 87.28125 33.039062 23.199219 18.914063 39.035156 44.488282 47.078125 76.003907 7 27.4375 7.371094 54.375 7.726563 80.421875.257812 18.691406.527344 40.839844.578125 63.363281-.050781 22.617187-.320313 44.765625-.578125 63.457031-.148438 11.046875-9.273438 19.875-20.269532 19.726563-11.046874-.152344-19.875-9.230469-19.726562-20.273438.253906-18.582031.523438-40.585937.574219-62.910156-.050781-22.230469-.320313-44.234375-.574219-62.816406-.324219-23.714844-.660156-48.238281-6.488281-71.078125-5.878907-23.039063-17.183594-41.507813-33.597657-54.894532-17.753906-14.480468-39.433593-22.59375-64.433593-24.113281-35.214844-2.140625-71.464844-3.128906-110.847657-3.046875-39.476562-.09375-75.730468.90625-110.945312 3.046875-25 1.519531-46.675781 9.632813-64.433594 24.109375-16.414062 13.386719-27.71875 31.855469-33.597656 54.898438-5.828125 22.839844-6.164062 47.363281-6.488281 71.078125-.253907 18.582031-.519531 40.585937-.574219 62.910156.054688 22.230469.320312 44.234375.574219 62.816406.324219 23.714844.660156 48.238281 6.488281 71.078125 5.878906 23.039063 17.183594 41.507813 33.597656 54.894532 17.757813 14.480468 39.433594 22.59375 64.433594 24.113281 35.214844 2.140625 71.476562 3.140625 110.851562 3.042969 39.480469.09375 75.726563-.902344 110.941407-3.042969 25-1.519531 46.675781-9.632813 64.433593-24.113281 11.824219-9.644532 21.0625-22.019532 27.457032-36.785157 4.390625-10.132812 16.164062-14.792969 26.300781-10.402343 10.136719 4.390624 14.792969 16.164062 10.40625 26.300781-8.964844 20.699219-22.046875 38.15625-38.886719 51.886719-24.039062 19.605468-54.21875 31.027343-87.28125 33.039062-34.535156 2.101562-70.011718 3.125-108.277344 3.125zm118.949219-256c0-68.925781-56.074219-125-125-125-68.921875 0-125 56.074219-125 125s56.078125 125 125 125c68.925781 0 125-56.074219 125-125zm-40 0c0 46.867188-38.128906 85-85 85-46.867187 0-85-38.132812-85-85s38.132813-85 85-85c46.871094 0 85 38.132812 85 85zm54-165c-16.566406 0-30 13.429688-30 30s13.433594 30 30 30c16.570313 0 30-13.429688 30-30s-13.429687-30-30-30zm0 0"/>
                                </svg>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com" className="col-1">
                                <svg viewBox="0 0 512 512.00006">
                                    <g>
                                        <g>
                                            <path fill="white" d="M459,0H51C22.95,0,0,22.95,0,51v408c0,28.05,22.95,51,51,51h408c28.05,0,51-22.95,51-51V51C510,22.95,487.05,0,459,0z
                                                M153,433.5H76.5V204H153V433.5z M114.75,160.65c-25.5,0-45.9-20.4-45.9-45.9s20.4-45.9,45.9-45.9s45.9,20.4,45.9,45.9
                                                S140.25,160.65,114.75,160.65z M433.5,433.5H357V298.35c0-20.399-17.85-38.25-38.25-38.25s-38.25,17.851-38.25,38.25V433.5H204
                                                V204h76.5v30.6c12.75-20.4,40.8-35.7,63.75-35.7c48.45,0,89.25,40.8,89.25,89.25V433.5z"/>
                                        </g>
                                    </g>
                                </svg>
                            </a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.github.com" className="col-1">
                                <svg viewBox="0 0 512 512.00006">
                                    <g>
                                        <path fill="var(--White-color)" d="M427.501,200.695c1.776-11.238,2.884-23.56,3.163-37.377c-0.107-59.246-28.468-80.21-33.925-90.038
                                            c8.037-44.89-1.331-65.309-5.688-72.299c-16.07-5.704-55.91,14.722-77.678,29.101c-35.491-10.389-110.494-9.375-138.621,2.689
                                            C122.856-4.389,95.408,1.277,95.408,1.277s-17.745,31.82-4.691,78.371c-17.075,21.759-29.802,37.143-29.802,77.949
                                            c0,9.773,0.607,19.008,1.637,27.893c14.705,77.318,75.97,110.674,136.15,116.426c-9.056,6.881-19.928,19.903-21.432,34.992
                                            c-11.379,7.357-34.268,9.789-52.067,4.193c-24.939-7.88-34.486-57.266-71.833-50.221c-8.081,1.512-6.475,6.842,0.523,11.386
                                            c11.378,7.38,22.094,16.554,30.354,36.185c6.344,15.072,19.687,41.982,61.873,41.982c16.747,0,28.477-1.979,28.477-1.979
                                            s0.319,38.406,0.319,53.385c0,17.238-23.264,22.078-23.264,30.348c0,3.289,7.7,3.601,13.888,3.601
                                            c12.229,0,37.673-10.186,37.673-28.103c0-14.237,0.227-62.081,0.227-70.46c0-18.307,9.811-24.136,9.811-24.136
                                            s1.201,97.727-2.361,110.829c-4.177,15.408-11.744,13.219-11.744,20.076c0,10.233,30.589,2.502,40.735-19.897
                                            c7.849-17.495,4.334-113.331,4.334-113.331l8.183-0.178c0,0,0.094,43.892-0.188,63.944c-0.295,20.769-2.438,47.025,9.898,59.417
                                            c8.097,8.15,32.903,22.451,32.903,9.382c0-7.574-17.371-13.833-17.371-34.353V344.45c10.553,0,12.734,31.072,12.734,31.072
                                            l3.804,57.727c0,0-2.526,21.065,22.756,29.856c8.925,3.126,28.018,3.976,28.913-1.271c0.897-5.26-22.99-13.038-23.217-29.342
                                            c-0.123-9.93,0.445-15.742,0.445-58.934c0-43.168-5.799-59.137-26.007-71.863C355.669,295.681,416.536,269.51,427.501,200.695z"/>
                                    </g>
                                </svg>
                            </a>
                        </div>
                        <div className="text-center">
                            <p className="text-xxs text-bold">© 2021 <a href="/">Hutaroo</a>, All rights reserved.</p>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    getRecentUsers: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps,{ getRecentUsers })(Landing)
>>>>>>> b67e24a3929c7e439e1e96708c69243c94545298
