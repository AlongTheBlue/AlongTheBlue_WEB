import axios from "axios";

export const getCategory = (category) => {

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

    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    // categoryMapping에 없는 경우 기본값 "all"을 할당
    const englishCategory = categoryMapping[category] ?? "all";

    // URL 경로에 카테고리 삽입
    const response = await axios.get(
      `${API_BASE_URL}/search/${englishCategory}/list`
    );

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getPlaceByCategoryAndId = async (category, id) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    // URL 경로에 카테고리 삽입
    const response = await axios.get(
      `${API_BASE_URL}/search/${category}/${id}`
    );

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};


export const getPlacesByKeywordAndCategory = async (keyword, category) => {
  try {
    // 카테고리 맵핑
    const categoryMapping = {
      // 전체: "all",
      관광: "tourData",
      숙박: "accommodation",
      음식: "restaurant",
      카페: "cafe"
      // 바다: "blue",
    };

    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    // categoryMapping에 없는 경우 기본값 "all"을 할당
    const englishCategory = categoryMapping[category] ?? "all";

    // URL 경로에 카테고리 삽입
    const response = await axios.get(
      `${API_BASE_URL}/search/${englishCategory}`, { params: { keyword: keyword } }
    );

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getHomePlacesByCategory = async (category) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";
    const response = await axios.get(
      `${API_BASE_URL}/${category}/home/list`
    );
    console.log(category)

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getPlaceDetailByCategoryAndId = async (category, id) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    const url = `${API_BASE_URL}/${category}/detail/${id}`
    const response = await axios.get(url);

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getDetailHashtags = async (category, id) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    const url = `${API_BASE_URL}/${category}/hashtags/${id}`
    const response = await axios.get(url);

    return response.data.data;
  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getImgByWeatherCondition= (weatherCondition) => {
  const weatherMapping = {
    맑음: "/images/weather/sunny.svg",
    구름많음: "/images/weather/cloudy.svg",
    흐림: "/images/weather/cloud.svg",
    비: "/images/weather/rain.svg",
    눈: "/images/weather/snow.svg",
  };
  return weatherMapping[weatherCondition] ?? null;
}

export const getRecommendBlues = async () => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    const url = `${API_BASE_URL}/blue/recommend`
    const response = await axios.get(url);

    return response.data.data;

  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getItemListByCategory = async (category, page) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    const url = `${API_BASE_URL}/${category}/detail/all`
    const response = await axios.get(
      url, 
      { params: {
          page: page,
          size: 10
      }});

    return response.data.data;

  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getHomeTourCourses = async () => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    const url = `${API_BASE_URL}/course/home/list`
    const response = await axios.get(url);

    return response.data.data;

  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getDetailTourCourse = async (id) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";

    const url = `${API_BASE_URL}/course/detail/${id}`
    console.log(url)
    const response = await axios.get(url);

    return response.data.data;

  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};

export const getItemListByKeywordAndCategory = async (category, keyword, page) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_BE_ENDPOINT+"/api";
    console.log(category, keyword)
    const response = await axios.get(
      `${API_BASE_URL}/search/${category}`, 
        { params: { 
            keyword: keyword, 
            page: page,
            size: 10 } 
        }
    );

    return response.data.data;

  } catch (error) {
    console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
    return []; // 에러 발생 시 빈 배열 반환
  }
};