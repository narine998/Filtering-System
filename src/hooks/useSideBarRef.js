import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../features/appSlice";

export const useSideBarRef = (ref) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(closeMenu());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
