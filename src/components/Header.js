import React from "react";
import TuneIcon from "@mui/icons-material/Tune";
import styles from "./styles/Header.module.scss";
import logo from "../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { inputChange, selectSearchText } from "../features/searchSlice";
import { toggleMenu } from "../features/appSlice";

const Header = () => {
  const searchText = useSelector(selectSearchText);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(inputChange(e.target.value));
  };

  return (
    <header className={styles.head}>
      <div className={styles.logo}>
        <img alt="logo" src={logo} />
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Type to search..."
          value={searchText}
          onChange={handleInputChange}
        />
      </form>
      <button className={styles.menu} onClick={() => dispatch(toggleMenu())}>
        <span>Apply Filters</span>
        <TuneIcon fontSize="large" />
      </button>
    </header>
  );
};

export default Header;
