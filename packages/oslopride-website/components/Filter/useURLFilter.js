import Router from "next/router";
import { useMemo } from "react";

const toArray = val =>
  val === undefined ? [] : Array.isArray(val) ? val : [val];

export default (objects, query) =>
  useMemo(() => {
    let filteredObjects = objects;
    Object.keys(query).forEach(key => {
      const filters = toArray(query[key]);
      filteredObjects =
        filters.length === 0
          ? objects // Return all objects if no filtes are applied
          : objects.filter(obj => filters.includes(obj[key]));
    });
    return filteredObjects;
  }, [objects, query]);

export const addFilter = (key, value) => {
  const prevFilterList = toArray(Router.query[key]);
  const newFilterList = prevFilterList.includes(value)
    ? prevFilterList
    : [...prevFilterList, value];
  Router.replace({
    pathname: Router.route,
    query: {
      ...Router.query,
      [key]: newFilterList.length === 1 ? newFilterList[0] : newFilterList
    }
  });
};

export const setFilter = (key, value) => {
  Router.replace({
    pathname: Router.route,
    query: { ...Router.query, [key]: value }
  });
};

export const removeFilter = (key, value) => {
  const prevFilterList = toArray(Router.query[key]);
  const newFilterList = prevFilterList.filter(v => v !== value);
  Router.replace({
    pathname: Router.route,
    query: {
      ...Router.query,
      [key]: newFilterList.length === 1 ? newFilterList[0] : newFilterList
    }
  });
};

export const resetFilter = key => {
  Router.replace({
    pathname: Router.route,
    query: Object.keys(Router.query).reduce((query, k) => {
      if (k !== key) {
        query[k] = Router.query[k];
      }
      return query;
    }, {})
  });
};
