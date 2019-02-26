import { call, put, takeLeading } from "redux-saga/effects";
import sanity from "../sanity";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";

const REQUEST_CONTACT_CONTENT = "REQUEST_CONTACT_CONTENT";
const SUCCESS_CONTACT_CONTENT = "SUCCESS_CONTACT_CONTENT";
const FAILURE_CONTACT_CONTENT = "FAILURE_CONTACT_CONTENT";

export const contactActions = {
  request: () => createAction(REQUEST_CONTACT_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_CONTACT_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_CONTACT_CONTENT, webResponseFailure(error))
};


const initialState = webResponseInitial();

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CONTACT_CONTENT:
    case FAILURE_CONTACT_CONTENT:
    case SUCCESS_CONTACT_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getContact = () => sanity.getDocument("global-contact");

function* fetchContact() {
  try {
    const response = yield call(getContact);
    yield put(contactActions.success(response));
  } catch (e) {
    yield put(contactActions.failure(`${e}`));
  }
}

export function* contactSaga() {
  yield takeLeading(REQUEST_CONTACT_CONTENT, fetchContact);
}
