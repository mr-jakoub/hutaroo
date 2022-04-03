import axios from 'axios'
import { 
    GET_POSTS,
    GET_COMMENTS,
    POST_ERROR,
    ADD_POST,
    DELETE_POST,
    UPDATE_LIKES,
    UPDATE_COMMENTS_LIKES,
    UPDATE_COMMENTS_DISLIKES,
    UPDATE_RISES,
    ADD_COMMENT,
    REMOVE_COMMENT
}from './types'
import { setAlert } from './alert'

// Get posts
export const getPosts = () => async dispatch =>{
    try {
        const res = await axios.get('/api/posts')
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add post
export const addPost = formData => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/posts', formData, config)
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
        dispatch(setAlert('Post Created Successfully','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete post
export const deletePost = id => async dispatch =>{
    try {
        await axios.delete(`/api/posts/${id}`)
        dispatch({
            type: DELETE_POST,
            payload: id
        })
        dispatch(setAlert('Post Rmoved Successfully','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add like
export const addLike = postId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/like/${postId}`)
        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add rise
export const addRise = postId => async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/rise/${postId}`)
        dispatch({
            type: UPDATE_RISES,
            payload: {postId, rises: res.data}
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Get comments
export const getComments = () => async dispatch =>{
    try {
        const res = await axios.get('/api/comments')
        dispatch({
            type: GET_COMMENTS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add comment
export const addComment = (postId, formData) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/comments/${postId}`, formData, config)
        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })
        dispatch(setAlert('Comment Added Successfully','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Like a comment
export const addCommentLike = commentId => async dispatch =>{
    try {
        const res = await axios.put(`/api/comments/like/${commentId}`)
        dispatch({
            type: UPDATE_COMMENTS_LIKES,
            payload: {commentId, likes: res.data}
        })
        dispatch(getComments())
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Dislike a comment
export const addCommentDislike = commentId => async dispatch =>{
    try {
        const res = await axios.put(`/api/comments/dislike/${commentId}`)
        dispatch({
            type: UPDATE_COMMENTS_DISLIKES,
            payload: {commentId, dislikes: res.data}
        })
        dispatch(getComments())
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Delete comment
export const deleteComment = commentId => async dispatch =>{
    try {
        await axios.delete(`/api/comments/${commentId}`)
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })
        dispatch(setAlert('Comment Removed Successfully','success'))
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}