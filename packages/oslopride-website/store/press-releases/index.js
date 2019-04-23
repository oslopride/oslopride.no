import { all, call, put, takeLeading } from "redux-saga/effects";
import { articleActions } from "../articles";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_PRESS_RELEASES_CONTENT = "REQUEST_PRESS_RELEASES_CONTENT";
const SUCCESS_PRESS_RELEASES_CONTENT = "SUCCESS_PRESS_RELEASES_CONTENT";
const FAILURE_PRESS_RELEASES_CONTENT = "FAILURE_PRESS_RELEASES_CONTENT";

export const pressReleasesActions = {
  request: () =>
    createAction(REQUEST_PRESS_RELEASES_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_PRESS_RELEASES_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_PRESS_RELEASES_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const pressReleasesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRESS_RELEASES_CONTENT:
    case FAILURE_PRESS_RELEASES_CONTENT:
    case SUCCESS_PRESS_RELEASES_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getPressReleases = () => {
  const query = "*[_type == 'article' && pressrelease == true]";
  return sanity.fetch(query);
};

function* fetchPressReleases() {
  try {
    const response = yield call(getPressReleases);
    yield all(response.map(article => put(articleActions.success(article))));
    yield put(pressReleasesActions.success(response));
  } catch (e) {
    yield put(pressReleasesActions.failure({ message: `${e}` }));
  }
}

export function* pressReleasesSaga() {
  yield takeLeading(REQUEST_PRESS_RELEASES_CONTENT, fetchPressReleases);
}
