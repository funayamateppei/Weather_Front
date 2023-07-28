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

  const popsTime = [
    "00~06",
    "06~12",
    "12~18",
    "18~24",
    "00~06",
    "06~12",
    "12~18",
    "18~24",
  ];

  return (
    <div>
      <LocationBackButton
        route={`/result?prefecture_code=${prefecture_code}`}
      />

      <div className={styles.container}>
        <div className={styles.weatherDetailContainer}>
          {data ? (
            <>
              <h2>{data.Detail.area.name}</h2>

              <div className={styles.detailContainer}>
                {/* 日付 */}
                <div className={styles.dateBox}>
                  <div className={styles.tableRow}>日付</div>
                  {data.Detail.weatherCodes
                    .slice(0, 2)
                    .map((weather, index) => (
                      <div key={index} className={styles.date}>
                        {weather.date}
                      </div>
                    ))}
                </div>

                {/* 天気 */}
                <div className={styles.weatherContainer}>
                  <div
                    className={`${styles.tableRow} ${styles.weatherTableRow}`}
                  >
                    天気
                  </div>
                  {data.Detail.weatherCodes
                    .slice(0, 2)
                    .map((weather, index) => (
                      <div key={index} className={styles.weatherBox}>
                        {weather.weather}
                        <img
                          src={`https://www.jma.go.jp/bosai/forecast/img/${weather.image_code}`}
                          alt="icon"
                        />
                      </div>
                    ))}
                </div>

                {/* 風 */}
                {data.Detail.waves ? (
                  <div className={styles.windBox}>
                    <div className={styles.tableRow}>風</div>
                    {data.Detail.waves.slice(0, 2).map((wave, index) => (
                      <div className={styles.wind} key={index}>
                        {wave}
                      </div>
                    ))}
                  </div>
                ) : null}

                {/* 波 */}
                <div className={styles.waveBox}>
                  <div className={styles.tableRow}>波</div>
                  {data.Detail.winds.slice(0, 2).map((wind, index) => (
                    <div className={styles.wave} key={index}>
                      {wind}
                    </div>
                  ))}
                </div>

                {/* 降水確率 */}
                <div className={styles.popsContainer}>
                  <div className={`${styles.tableRow} ${styles.popsTableRow}`}>
                    降水確率(%)
                  </div>
                  <div className={styles.popsBox}>
                    <div className={styles.pops}>
                      {popsTime.map((time, index) => (
                        <div key={index}>{time}</div>
                      ))}
                    </div>
                    <div className={styles.pops}>
                      {data.Detail.pops.map((pop, index) => (
                        <div key={index}>{pop}%</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
              <h2>{`${data.Week[0].area.name}の天気予報`}</h2>
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
