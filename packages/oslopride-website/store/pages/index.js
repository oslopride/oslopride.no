import { call, put, takeEvery } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_PAGE_CONTENT = "REQUEST_PAGE_CONTENT";
const SUCCESS_PAGE_CONTENT = "SUCCESS_PAGE_CONTENT";
const FAILURE_PAGE_CONTENT = "FAILURE_PAGE_CONTENT";

export const pageActions = {
  request: slug =>
    createAction(REQUEST_PAGE_CONTENT, webResponseRequest({ slug })),
  success: data => createAction(SUCCESS_PAGE_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_PAGE_CONTENT, webResponseFailure(error))
};

const initialState = {};

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PAGE_CONTENT:
      return {
        ...state,
        [action.payload.data.slug]: {
          status: action.payload.status
        }
      };
    case SUCCESS_PAGE_CONTENT:
      return {
        ...state,
        [action.payload.data.slug.current]: {
          ...action.payload
        }
      };
    case FAILURE_PAGE_CONTENT:
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

export const getPage = slug => {
  const query = `*[_type == 'page' && slug.current == $slug]{
    title,
    body,
    slug,
    seo,
    _createdAt,
    _updatedAt,
    articles[]->
  }`;
  const params = { slug };
  return sanity.fetch(query, params);
};

function* fetchPage(action) {
  const {
    payload: {
      data: { slug }
    }
  } = action;
  try {
    const response = yield call(getPage, slug);
    if (response.length > 0) {
      yield put(pageActions.success(response[0]));
    } else {
      yield put(pageActions.failure({ slug, message: "Article not found" }));
    }
  } catch (e) {
    yield put(pageActions.failure({ slug, message: `${e}` }));
  }
}

export function* pageSaga() {
  yield takeEvery(REQUEST_PAGE_CONTENT, fetchPage);
}
