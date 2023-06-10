import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {logout} from '../../actions/auth'
import { getRecentUsers, deleteAccount, acceptAccount } from '../../actions/auth'
import { addPost, getPosts, deletePost, addVaccine, rdvRequest, getrdvs, deleteRdv } from '../../actions/post'
import sinceDate from '../../utils/sinceDate'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import defaultImg from '../../assets/img/default.png'

const Dashboard = ({ match, logout, acceptAccount,rdvRequest,deleteRdv, addVaccine,getrdvs, getRecentUsers, deleteAccount, auth, addPost, getPosts, post:{posts,rdvs}, deletePost }) => {
    const [sidebar, setSidebar] = useState(false)
    const [sidebarElem, setSidebarElem] = useState(0)
    const [store, setStore] = useState({})

    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        recommandedAge: '',
        expDate: ''
    })  
    const [inject, setInject] = useState({
        vaccinetype: 'senovac'
    })
    const [rdv, setRdv] = useState({
        rdvDate: ''
    })
    const {rdvDate} = rdv
    const onChange = e => setRdv({ ...rdv, [e.target.name]: e.target.value.trim() })
    const {name,quantity,recommandedAge,expDate} = formData
    const onSubmit = e =>{
        e.preventDefault()
        addPost(formData)
    }
    const onRdv = e =>{
        e.preventDefault()
        rdvRequest({rdvDate})
    }
    const history = useHistory()
    const [navbarHeight, setNavbarHeight] = useState(0)
    useEffect(() => {
        let navbarRef = document.getElementById('mainNavbar')
        setNavbarHeight(navbarRef.clientHeight)
    })
    useEffect(() => {
        getRecentUsers()
        getrdvs()
        getPosts()
    }, [getRecentUsers,getPosts,acceptAccount,addVaccine,getrdvs,rdvRequest,deleteRdv,history])
    return auth.users === null || !posts ? 
        <div style={navbarHeight > 0 ?{'top':`calc(${navbarHeight}px + 20px)`,'opacity':'1'}:{'top':`80px)`,'opacity':'1'}} className="body-loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    :
    !(auth.user.accepted )?
        <div className='not-accepted'>
            Your account created successfully, Wait until admin approves your registration. <span className='btn btn-item' onClick={logout}>Logout</span>
        </div>:
    <>
            <div className="dash">
                <section id="sidebar" className={sidebar?'hide':''}>
                    <i className='bx bx-menu' onClick={()=>setSidebar(!sidebar)}></i>
                    <ul className="side-menu top">
                        <li onClick={()=>setSidebarElem(0)} className={sidebarElem === 0 ? "active" : ''}>
                            <Link to="/dashboard">
                                <i className='bx bxs-dashboard' ></i>
                                <span className="text">Dashboard</span>
                            </Link>
                        </li>
                        {auth.user.email === 'admin@vacci.com' &&<li onClick={()=>setSidebarElem(1)} className={sidebarElem === 1 ? "active" : ''}>
                            <Link to="/dashboard/store">
                                <i className='bx bxs-shopping-bag-alt' ></i>
                                <span className="text">My Store</span>
                            </Link>
                        </li>}
                        {auth.user.account_type !=='patient' &&<li onClick={()=>setSidebarElem(2)} className={sidebarElem === 2 ? "active" : ''}>
                            <Link to="/dashboard/analytics">
                                <i className='bx bxs-doughnut-chart' ></i>
                                <span className="text">Analytics</span>
                            </Link>
                        </li>}
                        {auth.user.account_type ==='stuff' &&<li onClick={()=>setSidebarElem(3)} className={sidebarElem === 3 ? "active" : ''}>
                            <Link to="/dashboard/appointments">
                                <i className='bx bxs-doughnut-chart' ></i>
                                <span className="text">Appointments</span>
                                {rdvs.length !== 0&&<span className='notif'>{rdvs.length}</span>}
                            </Link>
                        </li>}
                        <li onClick={()=>setSidebarElem(4)} className={sidebarElem === 4 ? "active" : ''}>
                            <Link to="/dashboard/message">
                                <i className='bx bxs-message-dots' ></i>
                                <span className="text">Message</span>
                            </Link>
                        </li>
                        <li onClick={()=>setSidebarElem(5)} className={sidebarElem === 5 ? "active" : ''}>
                            <Link to="/dashboard/group">
                                <i className='bx bxs-group' ></i>
                                <span className="text">Team</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="side-menu">
                        <li>
                            <Link to="/settings">
                                <i className='bx bxs-cog' ></i>
                                <span className="text">Settings</span>
                            </Link>
                        </li>
                        <li onClick={logout}>
                            <Link to="/" className="logout">
                                <i className='bx bxs-log-out-circle' ></i>
                                <span className="text">Logout</span>
                            </Link>
                        </li>
                    </ul>
                </section>
                <section id="content">
                    <main>
                        <div className="head-title">
                            <div className="left">
                                <h1>{!(match.params.new)?"Dashboard":match.params.new ==="store" ?"My Store":match.params.new ==="appointments"?"Appointments":match.params.new ==="analytics"?"Analytics":match.params.new ==="message"?"Messages":match.params.new ==="group"&&"Team"}</h1>
                                <ul className="breadcrumb">
                                    <li>
                                        <Link to="/dashboard">Dashboard</Link>
                                    </li>
                                    {(match.params.new)?<li><i className='bx bx-chevron-right' ></i></li>:<></>}
                                    <li>
                                        <Link className="active" to="/dashboard/store">{!(match.params.new)?"":match.params.new ==="store" ?"My Store":"Other links"}</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {match.params.new ==="store" && <>
                            <div className="table-data store-tb">
                                <div className="order">
                                    <div className="head">
                                        <h3>Add New Vaccine</h3>
                                        {/* <i className='bx bx-search' ></i> */}
                                        {/* <i className='bx bx-filter' ></i> */}
                                    </div>
                                    <form onSubmit={ e => onSubmit(e) }>
                                        <div className="row">
                                            <div className="col-4">
                                                <span>Vaccine Name</span>
                                                <input className='input-item' name='name' value={name} placeholder='Vaccine Name' onChange={e=>setFormData({ ...formData, [e.target.name]: e.target.value })} type="text" />
                                            </div>
                                            <div className="col-4">
                                                <span>Vaccine Quantity</span>
                                                <input className='input-item' name='quantity' value={quantity} placeholder='Vaccine Quantity' onChange={e=>setFormData({ ...formData, [e.target.name]: e.target.value })} type="number" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-4">
                                                <span>RecommandedAge</span>
                                                <input className='input-item' name='recommandedAge' value={recommandedAge} placeholder='Recommanded Age' onChange={e=>setFormData({ ...formData, [e.target.name]: e.target.value })} type="text" />
                                            </div>
                                            <div className="col-4">
                                                <span>Expiration Date</span>
                                                <input className='input-item' name='expDate' value={expDate} onChange={e=>setFormData({ ...formData, [e.target.name]: e.target.value })} type="date" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <button className='btn update-btn'>Create</button>
                                        </div>
                                    </form>
                                        <h3 className='mb-5'>All Vaccines</h3>
                                <form>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Vaccine Type</th>
                                                <th>Recommanded Age</th>
                                                <th>Quantity</th>
                                                <th>Acquisition Date</th>
                                                <th>Expiration Date</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts.map(vaccine=>(
                                                <tr id={vaccine.name} onLoad={(e)=>{setStore({...store, [e.target.id]: vaccine.quantity });console.log(store)}} key={vaccine._id} className={vaccine.quantity < 100 && vaccine.quantity >= 50 ? "background-orange":vaccine.quantity < 50 ? "background-red":"background-blue"}>
                                                    <td>
                                                        <p>{vaccine.name}</p>
                                                    </td>
                                                    <td>
                                                        <p>{vaccine.recommandedAge}</p>
                                                    </td>
                                                    <td><input name={vaccine.name} className='input-edit' type="number" value={vaccine.quantity} onChange={e=>setStore({ ...store, [e.target.name]: e.target.value })} /></td>
                                                    <td><Moment format="DD/MM/YYYY">{vaccine.date}</Moment></td>
                                                    <td><Moment format="DD/MM/YYYY">{vaccine.expDate}</Moment></td>
                                                    <td><i onClick={()=>deletePost(vaccine._id)} className='bx bx-trash'></i></td>
                                                </tr>
                                            ))}
                                            
                                        </tbody>
                                    </table>
                                </form>
                                </div>
                            </div>
                        </>}

                        {match.params.new ==="appointments" && <>
                            <div className="table-data store-tb">
                                <div className="order">
                                    <div className="head">
                                        <h3>Appointments</h3>
                                    </div>
                                    <form>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>patient</th>
                                                    <th>date</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rdvs && rdvs.map(rdv=>(
                                                    <tr key={rdv._id}>
                                                        <td>
                                                            <img src={defaultImg} alt='Avatar'/>
                                                            <p>{rdv.name}</p>
                                                        </td>
                                                        <td><Moment format="DD/MM/YYYY">{rdv.date}</Moment></td>
                                                        <td><i onClick={()=>{deleteRdv(rdv._id);history.go(0)}} className='bx bx-trash'></i></td>
                                                    </tr>
                                                ))}
                                                
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </>}


                        {!(match.params.new) &&
                        auth.user.email === 'admin@vacci.com' ?
                        <>
                            <ul className="box-info">
                                <li>
                                    <i className='bx bxs-calendar-check' ></i>
                                    <span className="text">
                                        <h3>1020</h3>
                                        <p>Were vaccinated</p>
                                    </span>
                                </li>
                                <li>
                                    <i className='bx bxs-group' ></i>
                                    <span className="text">
                                        <h3>{
                                                auth.users.filter(user => user.account_type ==='patient').length
                                            }
                                            <span>    |    </span>
                                            {
                                                auth.users.filter(user => user.account_type ==='stuff').length
                                            }</h3>
                                        <p>Patients    |    Stuff</p>
                                    </span>
                                </li>
                                <li>
                                    <i className='bx bx-package' ></i>
                                    <span className="text">
                                        <h3>2543</h3>
                                        <p>Vaccines in stock</p>
                                    </span>
                                </li>
                            </ul>


                            <div className="table-data">
                                <div className="order">
                                    <div className="head">
                                        <h3>Recently vaccinated</h3>
                                        {/* <i className='bx bx-search' ></i> */}
                                        {/* <i className='bx bx-filter' ></i> */}
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Patient</th>
                                                <th>Vaccinated Since</th>
                                                <th>Status</th>
                                                <th>Doses</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {auth.users.filter(element=>element.account_type==='patient').map(user=>(
                                                <tr key={user._id} id={user._id}>
                                                    <td>
                                                        <img src={defaultImg} alt='Avatar'/>
                                                        <p>{user.name}</p>
                                                    </td>
                                                    <td>{user.likes[0] ? sinceDate(user.likes[0].date) : 'Not yet'}</td>
                                                    <td><span className={user.likes.length === 0? 'status' : user.likes.length ===1? 'status pending' : user.likes.length ===2?'status process':'status completed'}>{user.likes.length === 0? 'Not yet' : user.likes.length ===1? 'Pending' : user.likes.length ===2?'Process':'Completed'}</span></td>
                                                    <td>{user.likes.length}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="todo">
                                    <div className="head">
                                        <h3>Waiting list</h3>
                                        <span className="orange-round rounded">Patients</span>
                                        <span className="blue-round rounded">Stuff</span>
                                    </div>
                                    <ul className="todo-list">
                                        {auth.users.filter(element=>element.email!=='admin@vacci.com').filter(el=>el.accepted === false).map(user=>(
                                            <li key={user._id} className={user.account_type === "patient"?"not-completed":"completed"}>
                                                <p>{user.name}</p>
                                                <i onClick={()=>{deleteAccount(user._id);history.go(0)}} className='bx bx-trash' ></i>
                                                <i onClick={()=>{acceptAccount(user._id);history.go(0)}} className='bx bxs-message-rounded-check' ></i>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </> : !(match.params.new) && auth.user.account_type === 'stuff'?
                        <>
                            <div className="table-data stufftb">
                                <div className="order">
                                    <div className="head">
                                        <h3>Recently vaccinated</h3>
                                        {/* <i className='bx bx-search' ></i> */}
                                        {/* <i className='bx bx-filter' ></i> */}
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Patient</th>
                                                <th>Vaccinated Since</th>
                                                <th>Status</th>
                                                <th>Doses</th>
                                                <th>Vaccine Type</th>
                                                <th>Inject</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {auth.users.filter(element=>element.account_type==='patient').filter(el=>el.accepted === true).map(user=>(
                                                <tr key={user._id} id={user._id}>
                                                    <td>
                                                        <img src={defaultImg} alt='Avatar'/>
                                                        <p>{user.name}</p>
                                                    </td>
                                                    <td>{user.likes[0] ? sinceDate(user.likes[0].date) : 'Not yet'}</td>
                                                    <td><span className={user.likes.length === 0? 'status' : user.likes.length ===1? 'status pending' : user.likes.length ===2?'status process':'status completed'}>{user.likes.length === 0? 'Not yet' : user.likes.length ===1? 'Pending' : user.likes.length ===2?'Process':'Completed'}</span></td>
                                                    <td>{user.likes.length}</td>
                                                    <td>
                                                        <select id="vaccinetype" className="input-item" name="vaccinetype" value={inject.vaccinetype} onChange={e => setInject({ ...inject, [e.target.name]: e.target.value.trim() })}>
                                                        {posts.map(vaccine=>
                                                            <option key={vaccine._id} value={vaccine.name}>{vaccine.name}</option>
                                                        )}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <i className="ha9n fas fa-sharp fa-syringe"onClick={()=>{addVaccine(user._id,inject);history.go(0)}}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="todo">
                                    <div className="head">
                                        <h3>Waiting list</h3>
                                    </div>
                                    <ul className="todo-list">
                                        {auth.users.filter(element=>element.account_type==='patient').filter(el=>el.accepted === false).map(user=>(
                                            <li key={user._id} className={user.account_type === "patient"?"not-completed":"completed"}>
                                                <p>{user.name}</p>
                                                <div>
                                                    <i onClick={()=>deleteAccount(user._id)} className='bx bx-trash red' ></i>
                                                    <i onClick={()=>acceptAccount(user._id)} className='bx bxs-message-rounded-check primary' ></i>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </>: auth.user.account_type === 'patient'&&
                        <>
                            <div className='rdv'>
                                <h3>Request for an appointment</h3>
                                <form onSubmit={ e => onRdv(e) }>
                                    <div className="row">
                                        <div className="col-4">
                                            <input id="rdvDate" className="input-item" type="date" name="rdvDate" value={rdvDate} onChange={e=>onChange(e)}  />
                                        </div>
                                        <div className="col-2">
                                            <button className='btn btn-primary svg-icon'>Request</button>
                                        </div>
                                    </div>
                                </form>
                                <div className="table-data stufftb">
                                <div className="order">
                                    <div className="head">
                                        <h3>Are Completed</h3>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Stuff</th>
                                                <th>Vaccine Type</th>
                                                <th>Since</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {auth.user.likes.map(vaccine=>(
                                                <tr key={vaccine._id} id={vaccine._id}>
                                                    <td>
                                                        <img src={defaultImg} alt='Avatar'/>
                                                        <p>{vaccine.stuffName}</p>
                                                    </td>
                                                    <td>{vaccine.vaccinetype}</td>
                                                    <td>{sinceDate(vaccine.date)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                        </>
                        }

                    </main>
                </section>
            </div>
        </>
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
    getRecentUsers: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    deleteRdv: PropTypes.func.isRequired,
    acceptAccount: PropTypes.func.isRequired,
    rdvRequest: PropTypes.func.isRequired,
    addPost: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    getrdvs: PropTypes.func.isRequired,
    addVaccine: PropTypes.func.isRequired,
    getPosts: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps,{ logout, getRecentUsers, getrdvs, deleteAccount,deleteRdv, addVaccine,rdvRequest, acceptAccount, addPost, getPosts, deletePost })(Dashboard)