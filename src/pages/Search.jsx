import React from "react";
import styles from "../styles/search.module.css";
import defaultAxios from "../lib/axios";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { Link } from "react-router-dom";

import SVGButton from "../components/SVGButton";
import CategoryButton from "../components/CategoryButton";

const Search = () => {
  const [isOpenFirstCategory, setIsOpenFirstCategory] = useState(false);
  const [isOpenSecondCategory, setIsOpenSecondCategory] = useState(false);
  const [prefecture, setPrefecture] = useState("");
  const [region, setRegion] = useState("");

  // const url = "https://www.jma.go.jp/bosai/forecast/data/forecast/400000.json";
  const url = "prefectures";
  const fetcher = async (url) => {
    return await defaultAxios.get(url).then((response) => response.data);
  };
  const { data, mutate } = useSWR(url, fetcher);
  useEffect =
    (() => {
      mutate();
    },
    []);

  const firstCategories = [
    "北海道",
    "東北",
    "関東甲信",
    "北陸",
    "東海",
    "近畿",
    "中国",
    "四国",
    "九州",
    "沖縄",
  ];

  const [secondCategories, setSecondCategories] = useState([]);

  const firstCategoryOpen = () => {
    setIsOpenFirstCategory(true);
  };
  const firstCategoryClose = () => {
    setIsOpenFirstCategory(false);
  };

  const secondCategoryOpen = (e) => {
    setPrefecture(e.target.value);
    setIsOpenSecondCategory(true);
    const filteredSecondCategories = data.filter(
      (data) => data.group == e.target.value
    );
    setSecondCategories(filteredSecondCategories);
    console.log(secondCategories);
  };
  const secondCategoryClose = () => {
    setIsOpenSecondCategory(false);
  };

  const resultOpen = () => {};

  return (
    <div className={styles.container}>
      <h1>WeatherWise</h1>
      <p>地域を選択してください</p>
      <button onClick={firstCategoryOpen}>都道府県名</button>

      {/* ファーストカテゴリー */}
      <div
        className={
          isOpenFirstCategory
            ? `${styles.firstCategoryList} ${styles.slideShow}`
            : `${styles.firstCategoryList} ${styles.slideHidden}`
        }
      >
        <div className={styles.categoryHeader}>
          <div className={styles.backButton} onClick={firstCategoryClose}>
            <SVGButton
              width={"4rem"}
              d={"M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"}
            />
          </div>
          <div className={styles.categoryList}>
            {firstCategories
              ? firstCategories.map((category, index) => (
                  <CategoryButton
                    value={category}
                    text={category}
                    key={index}
                    handleClick={secondCategoryOpen}
                  />
                ))
              : null}
          </div>
        </div>
      </div>

      {/* セカンドカテゴリー */}
      <div
        className={
          isOpenSecondCategory
            ? `${styles.secondCategoryList} ${styles.slideShow}`
            : `${styles.secondCategoryList} ${styles.slideHidden}`
        }
      >
        <div className={styles.categoryHeader}>
          <div className={styles.backButton} onClick={secondCategoryClose}>
            <SVGButton
              width={"4rem"}
              d={"M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"}
            />
          </div>
          <div className={styles.categoryList}>
            {secondCategories
              ? secondCategories.map((category, index) => (
                  <Link
                    to={`/result?prefecture_code=${category.prefecture_code}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <CategoryButton
                      value={category.prefecture_code}
                      text={category.prefecture}
                      key={index}
                      handleClick={resultOpen}
                    />
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;