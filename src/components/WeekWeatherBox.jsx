import React from "react";
import styles from "../styles/components/WeekWeatherBox.module.css";

const WeekWeatherBox = ({ day, pop, weather, children }) => {
  return (
    <div className={styles.weatherContainer}>
      <div className={styles.dateBox}>{day}</div>
      <div className={styles.weatherBox}>
        {weather}
        {children}
      </div>
      <div className={styles.popBox}>{pop === " %" ? "- %" : pop}</div>
    </div>
  );
};

export default WeekWeatherBox;
