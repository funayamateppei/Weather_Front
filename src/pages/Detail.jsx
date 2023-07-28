import React, { useEffect, useState } from "react";
import styles from "../styles/detail.module.css";
import { useSearchParams } from "react-router-dom";
import defaultAxios from "../lib/axios";
import useSWR from "swr";
import LocationBackButton from "../components/LocationBackButton";
import WeekWeatherBox from "../components/WeekWeatherBox";

const Detail = () => {
  const [searchParams] = useSearchParams();
  const prefecture_code = searchParams.get("prefecture_code");
  const region = searchParams.get("region");

  const url = `regionWeather?prefecture_code=${prefecture_code}&region_name=${region}`;
  const fetcher = async (url) => {
    return await defaultAxios.get(url).then((response) => response.data);
  };
  const { data, mutate } = useSWR(url, fetcher);
  useEffect(() => {
    mutate();
  }, []);
  console.log(data);

  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  const date = currentDate.getDate();
  const day = currentDate.getDay();
  const weekday = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <div>
      <LocationBackButton
        route={`/result?prefecture_code=${prefecture_code}`}
      />

      <div className={styles.container}>
        <div className={styles.weatherDetailContainer}>
          {data ? (
            <>
              <h3>{data.Detail.area.name}</h3>
            </>
          ) : (
            <div className={styles.loadingText}>
              <h3>Loading...</h3>
            </div>
          )}
        </div>

        <div className={styles.weekWeather}>
          {data ? (
            <>
              <h3>{`${data.Week[0].area.name}の天気予報`}</h3>
              <p>{`本日${month}月${date}日(${weekday[day]})`}</p>
              <div className={styles.weekWeatherContainer}>
                <WeekWeatherBox
                  day={"日付"}
                  weather={"天気"}
                  pop={"降水確率(%)"}
                />
                {data.Week[0].weatherCodes.map((detail, index) => (
                  <WeekWeatherBox
                    key={index}
                    day={detail.date}
                    weather={detail.weather}
                    pop={`${detail.pop} %`}
                  >
                    <img
                      src={`https://www.jma.go.jp/bosai/forecast/img/${detail.image_code}`}
                      alt="icon"
                    />
                  </WeekWeatherBox>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.loadingText}>
              <h3>Loading...</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
