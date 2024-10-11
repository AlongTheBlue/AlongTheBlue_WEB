import axios from "axios";

export const getCategory = (category) => {
  console.log(category)

  const categoryMapping = {
    전체: "all",
    관광: "tourData",
    숙박: "accommodation",
    음식: "restaurant",
    카페: "cafe",
    바다: "blue",
  };
  return categoryMapping[category] ?? "all";
}

export const getKrCategory = (category) => {
  console.log(category)

  const categoryMapping = {
    all: "전체",
    tourData: "관광",
    accommodation: "숙박",
    restaurant: "음식",
    cafe: "카페",
    tour: "바다",
  };
  return categoryMapping[category] ?? "전체";
}

export const getPlacesByCategory = async (category) => {
  try {
    // 카테고리 맵핑
    const categoryMapping = {
      전체: "all",
      관광: "tourData",
      숙박: "accommodation",
      음식: "restaurant",
      카페: "cafe",
      바다: "blue",
    };

    const API_BASE_URL = "https://alongtheblue.site/api";

    // categoryMapping에 없는 경우 기본값 "all"을 할당
    const englishCategory = categoryMapping[category] ?? "all";

    // URL 경로에 카테고리 삽입
    const response = await axios.get(
      `${API_BASE_URL}/search/${englishCategory}/list`
    );

    console.log(`Requesting category: ${englishCategory}`); // 카테고리 로그

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getHomePlacesByCategory = async (category) => {
  try {
    // const API_BASE_URL = "https://alongtheblue.site/api";
    const API_BASE_URL = "http://localhost:8080/api";

    const response = await axios.get(
      `${API_BASE_URL}/${category}/home/list`
    );

    console.log(`Requesting category: ${category}`); // 카테고리 로그

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};
