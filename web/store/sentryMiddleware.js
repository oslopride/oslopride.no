import * as Sentry from "@sentry/node";

const noop = () => {};
const filter = () => true;
const getType = action => action.type;
const identity = x => x;

/*
  Based on 
  https://github.com/captbaritone/raven-for-redux/blob/fbe0f54355701a261362838d11f27bc155097b88/index.js#L21
  https://github.com/captbaritone/raven-for-redux/issues/93#issuecomment-435854873
*/

function createSentryMiddleware(options = {}) {
  const {
    actionTransformer = identity,
    stateTransformer = identity,
    breadcrumbCategory = "redux-action",
    breadcrumbDataFromAction = noop,
    breadcrumbMessageFromAction = getType,
    filterBreadcrumbActions = filter
  } = options;

  let lastAction;

  return store => {
    Sentry.addGlobalEventProcessor(event => {
      const state = store.getState();
      return {
        ...event,
        extra: {
          ...event.extra,
          state: stateTransformer(state),
          lastAction: lastAction && actionTransformer(lastAction)
        }
      };
    });

    return next => action => {
      if (filterBreadcrumbActions(action)) {
        Sentry.addBreadcrumb({
          category: breadcrumbCategory,
          data: breadcrumbDataFromAction(action),
          message: breadcrumbMessageFromAction(action)
        });
      }

      lastAction = action;
      return next(action);
    };
  };
}

export default createSentryMiddleware;
