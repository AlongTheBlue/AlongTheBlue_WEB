import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Blues from "../components/Blues";
import PageHeader from "../components/PageHeader";
import { getPlacesByCategory } from "../utils/data.js";
import { useNavigate } from "react-router-dom";

const AlongBlues = ({user}) => {
  const [blueList, setBlueList] = useState([]);
  const [jejuBlues, setJejuBlues] = useState([]);
  const [seogwipoBlues, setSeogwipoBlues] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user)
    if (!user) {
      alert("로그인을 먼저 해주세요")
      navigate("/my");
      return;  // 이후의 코드를 실행하지 않도록 return
    }

    const fetchData = async () => {
      try {
        // getPlacesByCategory 함수에 "바다" 카테고리를 전달하여 blue 데이터를 가져옴
        const data = await getPlacesByCategory("바다");

        // 콘솔에 받은 전체 데이터를 출력
        console.log("전체 데이터:", data);

        setBlueList(data.data); // 전체 데이터를 설정

        // jeju와 seogwipo로 데이터 필터링
        const jejuData = data.filter((blue) => blue.city === "jeju");
        const seogwipoData = data.filter((blue) => blue.city === "seogwipo");

        // 필터링된 데이터 콘솔에 출력
        console.log("제주 데이터:", jejuData);
        console.log("서귀포 데이터:", seogwipoData);

        setJejuBlues(jejuData);
        setSeogwipoBlues(seogwipoData);
      } catch (error) {
        console.error("에러 발생:", error);
        setError("데이터를 불러오는 중 문제가 발생했습니다.");
      }
    };

    fetchData();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }
  // 바다 선택 후 이동
  const handleBlueSelect = (selectedBlue) => {
    navigate(`/along/blues/plan/${selectedBlue.id}`, { state: { selectedBlue: selectedBlue } });
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="page-container">
      <PageHeader title={"바당따라"} />
      <Blues
        jejuBlues={jejuBlues}
        seogwipoBlues={seogwipoBlues}
        onSelect={handleBlueSelect}
      />
      <Footer />
    </div>
  );
};

export default AlongBlues;
