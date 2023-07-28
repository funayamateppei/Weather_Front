import React, { useEffect } from "react";
import styles from "../styles/result.module.css";
import defaultAxios from "../lib/axios";
import { useSearchParams } from "react-router-dom";
import useSWR from "swr";
import { Link } from "react-router-dom";
import LocationBackButton from "../components/LocationBackButton";
import SVGButton from "../components/SVGButton";

const Result = () => {
  const [searchParams] = useSearchParams();
  const prefecture_code = searchParams.get("prefecture_code");

  const url = `regions?prefecture_code=${prefecture_code}`;
  const fetcher = async (url) => {
    return await defaultAxios.get(url).then((response) => response.data);
  };
  const { data, mutate } = useSWR(url, fetcher);
  useEffect(() => {
    mutate();
  }, []);
  // console.log(data);

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const day = currentDate.getDay();
  const weekday = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div className={styles.container}>
      <LocationBackButton route={"/"} />

      <div className={styles.weatherContainer}>
        <h2>{data ? data.prefecture : null}</h2>
        <p>{`本日${month}月${date}日(${weekday[day]})`}</p>
        {data
          ? data.regions.map((regionData, index) => (
              <div key={index} className={styles.regionContainer}>
                <h3>{regionData.region}</h3>
                <div className={styles.regionDetailBox}>
                  <div className={styles.regionWeather}>
                    <img
                      src={`https://www.jma.go.jp/bosai/forecast/img/${regionData.weather.image_code}`}
                      alt="icon"
                    />
                    <p>{regionData.weather.weather}</p>
                  </div>
                  <Link
                    to={`/detail?prefecture_code=${prefecture_code}&region=${regionData.region}`} // 福岡地方で外部APIを走らせてデータ取得 DBにはデータ入れない
                    style={{ display: "inline-block", marginRight: "1rem" }}
                  >
                    <button>詳細を見る</button>
                  </Link>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Result;
