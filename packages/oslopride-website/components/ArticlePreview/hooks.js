import { useEffect } from "react";

export const useFetchArticleIfNotPresent = (articlePresent, fetchArticle) =>
  useEffect(() => {
    if (!articlePresent) {
      fetchArticle();
    }
  }, []);
