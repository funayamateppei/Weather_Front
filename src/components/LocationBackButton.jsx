import React from "react";
import styles from "../styles/components/LocationBackButton.module.css";
import { Link } from "react-router-dom";
import SVGButton from "./SVGButton";

const LocationBackButton = ({ route }) => {
  return (
    <Link to={route}>
      <div className={styles.backButton}>
        <SVGButton
          width={"3rem"}
          d={"M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"}
        />
      </div>
    </Link>
  );
};

export default LocationBackButton;
