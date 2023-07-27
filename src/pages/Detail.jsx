import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import defaultAxios from "../lib/axios";
import useSWR from "swr";
import LocationBackButton from "../components/LocationBackButton";

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

  return (
    <div>
      <LocationBackButton
        route={`/result?prefecture_code=${prefecture_code}`}
      />
    </div>
  );
};

export default Detail;
