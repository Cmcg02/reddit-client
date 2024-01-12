import { createSlice, createSelector} from "@reduxjs/toolkit";
import { getSubredditPosts, getSubreddits } from "./redditFetch";

const initialState = {
    posts: [],
    searchTerm: '',
    subreddit: 'r/popular'
} 

const redditSlice = createSlice({
    name: 'reddit',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
          },
          startGetPosts(state) {
            state.isLoading = true;
            state.error = false;
          },
          getPostsSuccess(state, action) {
            state.isLoading = false;
            state.posts = action.payload;
          },
          getPostsFailed(state) {
            state.isLoading = false;
            state.error = true;
          },
          setSearchTerm(state, action) {
            state.searchTerm = action.payload;
          },
          setSubreddit(state, action) {
            state.subreddit = action.payload;
            state.searchTerm = '';
          },
    }
})

export const {
    setPosts, startGetPosts, getPostsSuccess, getPostsFailed, setSearchTerm, setSubreddit, 
} = redditSlice.actions

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
      dispatch(getPostsFailed());
    }
  };

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
  
      return posts;
    }
  );

const redditReducer = redditSlice.reducer
export default redditReducer