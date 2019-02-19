const INITIAL = "INITIAL";
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

const createWebResponse = (status, data, error) => ({ status, data, error });

export const webResponseInitial = () =>
  createWebResponse(INITIAL, undefined, undefined);

export const webResponseRequest = () =>
  createWebResponse(REQUEST, undefined, undefined);

export const webResponseSuccess = data =>
  createWebResponse(SUCCESS, data, undefined);

export const webResponseFailure = error =>
  createWebResponse(FAILURE, undefined, error);

export const createAction = (type, payload) => ({
  type,
  payload
});
