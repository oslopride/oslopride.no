import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_EVENTS = "REQUEST_EVENTS";
const SUCCESS_EVENTS = "SUCCESS_EVENTS";
const FAILURE_EVENTS = "FAILURE_EVENTS";

export const eventsActions = {
  request: () => createAction(REQUEST_EVENTS, webResponseRequest()),
  success: data => createAction(SUCCESS_EVENTS, webResponseSuccess(data)),
  failure: error => createAction(FAILURE_EVENTS, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EVENTS:
    case FAILURE_EVENTS:
    case SUCCESS_EVENTS:
      return action.payload;
    default:
      return state;
  }
};

export const getEvents = () => {
  const query = "*[_type == 'event' && editorialState == 'published']";
  return sanity.fetch(query);
};

function* fetchEvents() {
  try {
    const response = yield call(getEvents);
    yield put(eventsActions.success(response));
  } catch (e) {
    yield put(eventsActions.failure(`${e}`));
  }
}

export function* eventsSaga() {
  yield takeLeading(REQUEST_EVENTS, fetchEvents);
}
