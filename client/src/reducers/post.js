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
} from '../actions/types'

const initialState = {
    posts: [],
    post: null,
    comments: [],
    comment: null,
    loading: true,
    error: {}
}

const post = (state = initialState, action)=>{
    const {type, payload} = action
    switch(type){
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
        }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post=> post._id !== payload),
                loading: false
            }
        case UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {...post, likes: payload.likes} : post ),
                loading: false
        }
        case UPDATE_COMMENTS_LIKES:
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === payload.commentId ? {...comment, likes: payload.likes} : comment ),
                loading: false
        }
        case UPDATE_COMMENTS_DISLIKES:
            return {
                ...state,
                comments: state.comments.map(comment => comment._id === payload.commentId ? {...comment, dislikes: payload.dislikes} : comment ),
                loading: false
        }
        case UPDATE_RISES:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload.postId ? {...post, rises: payload.rises} : post ),
                loading: false
        }
        case ADD_COMMENT:
            return{
                ...state,
                comments: [payload, ...state.comments],
                loading: false
            }
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment=> comment._id !== payload),
                loading: false
            }
        case POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        default: return state
    }
}

export default post