import { call, put, takeEvery } from "redux-saga/effects"


// Login Redux States
import {
  GET_BLOG_LIST,
  GET_BLOG,
  COMMENT_ON_BLOG,
  GET_BLOG_CATEGORIES
} from "./actionTypes"


import {
  getBlogListSuccess,
  getBlogListFailure,
  getBlogSuccess,
  getBlogFailure,
  commentOnBlogSuccess,
  commentOnBlogFailure,
  getBlogCategoriesFailure,
  getBlogCategoriesSuccess
} from "./actions"

//Include Both Helper File with needed methods
import { getBlog, getBlogCategories, getBlogList, postCommentOnBlog } from "../../../helpers/backend-helpers"

function* getBlogs() {
  try {
    const response = yield call(getBlogList);
    if (response) {
      yield put(getBlogListSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getBlogListFailure(error))
  }
}



function* getSingleBlog({ payload }) {
  try {

    const response = yield call(getBlog, payload);
    if (response) {
      yield put(getBlogSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getBlogFailure(error))
  }
}

function* addComment({ payload }) {
  try {

    const response = yield call(postCommentOnBlog, payload);
    if (response) {
      yield put(commentOnBlogSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(commentOnBlogFailure(error))
  }
}


function* getCategories() {
  try {

    const response = yield call(getBlogCategories);
    if (response) {
      yield put(getBlogCategoriesSuccess(response))
      return;
    }
    throw "Unknown response received from Server";

  } catch (error) {
    yield put(getBlogCategoriesFailure(error))
  }
}


function* blogSaga() {
  yield takeEvery(GET_BLOG_LIST, getBlogs)
  yield takeEvery(GET_BLOG, getSingleBlog)
  yield takeEvery(COMMENT_ON_BLOG, addComment)
  yield takeEvery(GET_BLOG_CATEGORIES, getCategories)
}

export default blogSaga
