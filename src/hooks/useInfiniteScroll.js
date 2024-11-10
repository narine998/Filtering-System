import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePage } from "../features/productSlice";

export const useInfiniteScroll = (loading, page, hasFilters, hasMore) => {
  const dispatch = useDispatch();

  useEffect(() => {
    let scrollTimeout;

    const throttledHandleScroll = () => {
      if (loading) return;
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (
          !hasFilters &&
          hasMore &&
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 300
        ) {
          dispatch(updatePage(page + 1));
        }
      }, 200);
    };

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [loading, page, hasFilters, hasMore]);
};
