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
