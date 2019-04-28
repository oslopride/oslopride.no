const INITIAL = "INITIAL";
const REQUEST = "REQUEST";
const SUCCESS = "SUCCESS";
const FAILURE = "FAILURE";

const createWebResponse = (status, data, error) => ({ status, data, error });

export const webResponseInitial = () =>
  createWebResponse(INITIAL, undefined, undefined);

export const webResponseRequest = data =>
  createWebResponse(REQUEST, data, undefined);

export const webResponseSuccess = data =>
  createWebResponse(SUCCESS, data, undefined);

export const webResponseFailure = error =>
  createWebResponse(FAILURE, undefined, error);

export const createAction = (type, payload) => ({
  type,
  payload
});

export const mapWebResponse = (response, mapFunction) =>
  response.status === SUCCESS
    ? webResponseSuccess(mapFunction(response.data))
    : response;

export const foldWebResponse = (
  response,
  { initial, request, success, failure }
) => {
  switch (response.status) {
    case INITIAL:
      return initial();
    case REQUEST:
      return request(response.data);
    case SUCCESS:
      return success(response.data);
    case FAILURE:
      return failure(response.error);
    default:
      return undefined;
  }
};
