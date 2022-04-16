import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import { getPosts, getComments } from '../../actions/post'
import Post from './Post'

const Posts = ({ getPosts, getComments, post:{ posts, comments, loading }, filter, auth:{ user } }) => {
    useEffect(() => {
        getPosts()
        getComments()
    }, [getPosts, getComments])
    return loading ? <Spinner /> :
        <div className="posts">
            <div className="header my-1">
                <p className="text-sm svg-icon text-bold">Posts&nbsp;&nbsp;
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
                </p>
                <div className="filters">
                    <button className="text-bold btn active">Opinions</button>
                    <button className="text-bold btn">Rooms</button>
                </div>
            </div>
            {filter ? (
            posts.filter(post=>{
                if(post.user === filter){
                    return post
                }else{
                    return null
                }
            }).map(post=>(
                <Post key={post._id} comments={comments} post={post} profilePosts={true} />
            ))):(
            posts.map(post => (
                <Post key={post._id} comments={comments} post={post} />
            )))}
        </div>
}
Posts.propTypes = {
    auth: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})
export default connect(mapStateToProps,{ getPosts, getComments })(Posts)
