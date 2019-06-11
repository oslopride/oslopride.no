import logError from "@/utils/sentry";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_ARTICLE_CONTENT = "REQUEST_ARTICLE_CONTENT";
const SUCCESS_ARTICLE_CONTENT = "SUCCESS_ARTICLE_CONTENT";
const FAILURE_ARTICLE_CONTENT = "FAILURE_ARTICLE_CONTENT";

export const articleActions = {
  request: slug =>
    createAction(REQUEST_ARTICLE_CONTENT, webResponseRequest({ slug })),
  success: data =>
    createAction(SUCCESS_ARTICLE_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_ARTICLE_CONTENT, webResponseFailure(error))
};

const initialState = {};

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ARTICLE_CONTENT:
      return {
        ...state,
        [action.payload.data.slug]: {
          status: action.payload.status
        }
      };
    case SUCCESS_ARTICLE_CONTENT:
      return {
        ...state,
        [action.payload.data.slug.current]: {
          ...action.payload
        }
      };
    case FAILURE_ARTICLE_CONTENT:
      return {
        ...state,
        [action.payload.error.slug]: {
          status: action.payload.status
        }
      };
    default:
      return state;
  }
};

export const getArticle = slug => {
  const query = "*[_type == 'article' && slug.current == $slug]";
  const params = { slug };
  return sanity.fetch(query, params);
};

function* fetchArticle(action) {
  const {
    payload: {
      data: { slug }
    }
  } = action;
  try {
    const response = yield call(getArticle, slug);
    if (response.length > 0) {
      yield put(articleActions.success(response[0]));
    } else {
      yield put(articleActions.failure({ slug, message: "Article not found" }));
    }
  } catch (e) {
    logError(e);
    yield put(articleActions.failure({ slug, message: "Unknown Error" }));
  }
}

export function* articleSaga() {
  yield takeEvery(REQUEST_ARTICLE_CONTENT, fetchArticle);
}
