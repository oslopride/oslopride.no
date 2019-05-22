import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_VENUES = "REQUEST_VENUES";
const SUCCESS_VENUES = "SUCCESS_VENUES";
const FAILURE_VENUES = "FAILURE_VENUES";

export const venuesActions = {
  request: () => createAction(REQUEST_VENUES, webResponseRequest()),
  success: data => createAction(SUCCESS_VENUES, webResponseSuccess(data)),
  failure: error => createAction(FAILURE_VENUES, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const venuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_VENUES:
    case FAILURE_VENUES:
    case SUCCESS_VENUES:
      return action.payload;
    default:
      return state;
  }
};

export const getVenues = () => {
  const query = "*[_type == 'venue']";
  return sanity.fetch(query);
};

function* fetchVenues() {
  try {
    const response = yield call(getVenues);
    yield put(venuesActions.success(response));
  } catch (e) {
    yield put(venuesActions.failure(`${e}`));
  }
}

export function* venuesSaga() {
  yield takeLeading(REQUEST_VENUES, fetchVenues);
}
