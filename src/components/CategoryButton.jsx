import React from "react";
import styles from "../styles/components/CategoryButton.module.css";
import SVGButton from "./SVGButton";

const CategoryButton = ({ value, text, index, handleClick }) => {
  return (
    <button
      value={value}
      key={index}
      onClick={handleClick}
      className={styles.categoryButton}
    >
      {text}
      <SVGButton width={"3rem"} d={"M8.25 4.5l7.5 7.5-7.5 7.5"} />
    </button>
  );
};

export default CategoryButton;
