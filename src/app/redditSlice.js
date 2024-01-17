import { createSlice, createSelector} from "@reduxjs/toolkit";
import { getPostComments, getSubredditPosts, getSubreddits } from "./redditFetch";

const initialState = {
  posts: [],
  searchTerm: '',
  subreddit: 'r/popular',
  subreddits: [],
  isLoadingPosts: false,
  isLoadingSubreddits: false,
  errorPosts: false,
  errorSubreddits: false,
} 

const redditSlice = createSlice({
  name: 'reddit',
  initialState,
  reducers: {
    hideComments(state, action){
      state.posts[action.payload].showingComments = false
    },

    startGetComments(state, action) {
      state.posts[action.payload].showingComments = !state.posts[action.payload].viewComments
      if(!state.posts[action.payload].showingComments){
        return;
      }
      state.posts[action.payload].isLoadingComments = true;
      state.posts[action.payload].errorComments = false;
    },
    getCommentsFailed(state, action) {
      state.posts[action.payload].isLoadingComments = false;
      state.posts[action.payload].errorComments = true;
    },
    getCommentsSuccess(state, action){
      state.posts[action.payload.index].isLoadingComments = false;
      state.posts[action.payload.index].errorComments = false;
      state.posts[action.payload.index].comments = action.payload.comments;
    },


    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    startGetPosts(state) {
      state.isLoadingPosts = true;
      state.errorPosts = false;
      state.posts= []
    },
    getPostsSuccess(state, action) {
      state.isLoadingPosts = false;
      state.posts = action.payload;
    },
    getPostsFailed(state, action) {
      state.isLoadingPosts = false;
      state.errorPosts = true;
      state.errorState = action.payload.toString()   
    },

    setSubreddit(state, action) {
      state.subreddit = action.payload;
      state.searchTerm = '';
    },

    startGetSubreddits(state) {
      state.isLoadingSubreddits = true;
      state.errorSubreddits = false;
    },
    getSubredditsSuccess(state, action) {
      state.isLoadingSubreddits = false;
      state.subreddits = action.payload;
      state.errorSubreddits = false
    },
    getSubredditsFailed(state, action) {
      state.isLoadingSubreddits = false;
      state.errorSubreddits = true;
    },
  }
})

export const {
  setPosts, 
  startGetPosts, 
  getPostsSuccess, 
  getPostsFailed, 
  setSearchTerm, 
  setSubreddit, 
  startGetSubreddits, 
  getSubredditsFailed, 
  getSubredditsSuccess,
  getCommentsFailed,
  getCommentsSuccess,
  startGetComments,
  hideComments
} = redditSlice.actions

export const fetchComments = (index, link) => async (dispatch) => {
  try{
    dispatch(startGetComments(index));
    const comments = await getPostComments(link);
    dispatch(getCommentsSuccess({index:index, comments: comments}))
    console.log(comments)
  }catch(error){
    dispatch(getCommentsFailed(index))
    console.log(error)
  }
}

export const fetchPosts = (subreddit) => async (dispatch) => {
    try {
      dispatch(startGetPosts());
      const posts = await getSubredditPosts(subreddit);
  
      // We are adding showingComments and comments as additional fields to handle showing them when the user wants to. We need to do this because we need to call another API endpoint to get the comments for each post.
      const postsWithMetadata = posts.map((post) => ({
        ...post,
        showingComments: false,
        comments: [],
        loadingComments: false,
        errorComments: false,
      }));
      dispatch(getPostsSuccess(postsWithMetadata));
    } catch (error) {

      dispatch(getPostsFailed(error));
    }
};

export const fetchSubreddits = () => async (dispatch) => {
    try {
        dispatch(startGetSubreddits());
        const subreddits = await getSubreddits();
        dispatch(getSubredditsSuccess(subreddits))
    } catch(error){
        dispatch(getSubredditsFailed())
    }
}

const selectPosts = (state) => state.reddit.posts;

const selectSearchTerm = (state) => state.reddit.searchTerm;

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
        
      if (searchTerm !== '') {
        return posts.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      //This filters the current posts recived rather than finding posts that match the search Term
  
      return posts;
    }
);

const redditReducer = redditSlice.reducer
export default redditReducer