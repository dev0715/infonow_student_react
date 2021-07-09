



import {

  GET_BLOG_LIST,
  GET_BLOG_LIST_SUCCESS,
  GET_BLOG_LIST_FAILURE,
  GET_BLOG,
  GET_BLOG_SUCCESS,
  GET_BLOG_FAILURE,
  COMMENT_ON_BLOG,
  COMMENT_ON_BLOG_FAILURE,
  COMMENT_ON_BLOG_SUCCESS,
  GET_BLOG_CATEGORIES,
  GET_BLOG_CATEGORIES_SUCCESS,
  GET_BLOG_CATEGORIES_FAILURE,

} from './actionTypes'

const initialState = {
  blogList: [],
  blogListError: null,
  blogListLoading: false,
  selectedBlog: {},
  selectedBlogError: null,
  selectedBlogLoading: false,
  commentProcessing: false,
  blogCategories: [],
  blogCategoriesLoading: false,
  blogCategoriesError: null,

}



const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BLOG_LIST:
      return { ...state, blogListLoading: true }

    case GET_BLOG_LIST_SUCCESS:
      return { ...state, blogList: action.payload, blogListError: null, blogListLoading: false }

    case GET_BLOG_LIST_FAILURE:
      return { ...state, blogList: [], blogListError: action.payload, blogListLoading: false }

    case GET_BLOG:
      return { ...state, selectedBlogLoading: true }

    case GET_BLOG_SUCCESS:
      return { ...state, selectedBlog: action.payload, selectedBlogError: null, selectedBlogLoading: false }

    case GET_BLOG_FAILURE:
      return { ...state, selectedBlog: {}, selectedBlogError: action.payload, selectedBlogLoading: false }

    case COMMENT_ON_BLOG:
      return { ...state, commentProcessing: true }

    case COMMENT_ON_BLOG_SUCCESS:
      state.selectedBlog.comments.push(action.payload)
      return { ...state, commentProcessing: false }

    case COMMENT_ON_BLOG_FAILURE:
      return { ...state, commentProcessing: false, commentError: action.payload }

    case GET_BLOG_CATEGORIES:
      return { ...state, blogCategoriesLoading: true }

    case GET_BLOG_CATEGORIES_SUCCESS:
      return { ...state, blogCategories: action.payload, blogCategoriesLoading: false }

    case GET_BLOG_CATEGORIES_FAILURE:
      return { ...state, blogCategories: [], blogCategoriesLoading: false, blogCategoriesError: action.payload }


    default:
      return state
  }
}

export default blogReducer
