import logError from "@/utils/sentry";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_BECOME_PARTNER_CONTENT = "REQUEST_BECOME_PARTNER_CONTENT";
const SUCCESS_BECOME_PARTNER_CONTENT = "SUCCESS_BECOME_PARTNER_CONTENT";
const FAILURE_BECOME_PARTNER_CONTENT = "FAILURE_BECOME_PARTNER_CONTENT";

export const becomePartnerActions = {
  request: () =>
    createAction(REQUEST_BECOME_PARTNER_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_BECOME_PARTNER_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_BECOME_PARTNER_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const becomePartnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BECOME_PARTNER_CONTENT:
    case FAILURE_BECOME_PARTNER_CONTENT:
    case SUCCESS_BECOME_PARTNER_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getBecomePartner = () =>
  sanity.getDocument("global-become-partner");

function* fetchBecomePartner() {
  try {
    const response = yield call(getBecomePartner);
    yield put(becomePartnerActions.success(response));
  } catch (e) {
    logError(e);
    yield put(becomePartnerActions.failure());
  }
}

export function* becomePartnerSaga() {
  yield takeLeading(REQUEST_BECOME_PARTNER_CONTENT, fetchBecomePartner);
}
