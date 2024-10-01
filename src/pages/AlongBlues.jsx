import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Blues from "../components/Blues";
import PageHeader from "../components/PageHeader";
import axios from "axios";
const API_BASE_URL = "https://alongtheblue.site/api";
const getBlueData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blue/list`);
    return response.data;
  } catch (error) {
    console.error("API 요청 중 오류가 발생했습니다:", error);
    throw error;
  }
};

const BlueList = () => {
  const [blueList, setBlueList] = useState([]);
  const [jejuBlues, setJejuBlues] = useState([]);
  const [seogwipoBlues, setSeogwipoBlues] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlueData();
        setBlueList(data.data); // 전체 데이터 설정

        // jeju와 seogwipo로 데이터 필터링
        const jejuData = data.data.filter((blue) => blue.city === "jeju");
        const seogwipoData = data.data.filter(
          (blue) => blue.city === "seogwipo"
        );

        setJejuBlues(jejuData);
        setSeogwipoBlues(seogwipoData);
      } catch (error) {
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="page-container">
      <PageHeader title={"바당따라"} />
      {/* 필터링된 jeju와 seogwipo 데이터를 각각 넘겨줌 */}
      <Blues jejuBlues={jejuBlues} seogwipoBlues={seogwipoBlues} />
      <Footer />
    </div>
  );
};

export default BlueList;
