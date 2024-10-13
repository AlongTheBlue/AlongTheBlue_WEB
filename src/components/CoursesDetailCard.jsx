import "../styles/Page.css";
import CourseCard from "./CourseCard";
import DetailMap from "./DetailMap";
import "../styles/CoursesDetailCard.css"
import { useEffect, useState } from "react";
import { getDetailTourCourse } from "../utils/data";

function CoursesDetailCard({id}) {
  const [course, setCourse] = useState([]);
  const [courseMarkers, setCourseMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDetailTourCourse(id);
        setCourse(data);
        console.log(data)

      } catch (error) {
        console.error("데이터를 불러오는데 문제가 발생했습니다.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const course1 = {
      id:1, 
      subtitle:"무조건 가야하는", 
      title: "제주 맛집 리스트",
      introduction: "여행에서 빼놓을 수 없는 맛집 탐방 \n 흑돼지 맛집 돈사돈, 고기국수 맛집 올레국수 \n꼭 다녀온다면 맛있는 추억이 쌓이는 여행코스",
      hashtags: ["#맛집", "#흑돼지", "#고기국수"],
      travelCourses: [
        {
          title: "이호테우해수욕장",
          address: "제주특별자치도 제주시 도리로",
          introduction: "맑은 바다와 멋진 섬 풍경을 즐기며 여유롭게 쉴 수 있는 제주도의 핫플",
          category: "관광",
          iconCategory: "tourData",
          lat:"33.4974183784",
          lng: "126.4531570913",
          images: [
            {
              id: 1,
              url: "/images/course/jeju.jpg"
            },
            {
              id: 2,
              url: "/images/course/jeju3.jpg"
            }
          ]
        },
        {
          title: "그랜드하얏트 제주",
          address: "제주특별자치도 제주시 노연로 12",
          introduction: "제주 시내 중심에서 럭셔리한 숙박과 멋진 전망을 한 번에 즐길 수 있는 최고급 호텔",
          category: "숙박",
          iconCategory: "accommodation",
          lat: "33.485242300144556",
          lng: "126.48141147321883",
          images: [
            {
              id: 1,
              url: "/images/course/hotel.jpg"
            },
            {
              id: 2,
              url: "/images/course/hotel2.jpg"
            }
          ]
        }
      ]
    };
    
    useEffect(() => {
      if(!course || !course.travelCourses)
        return;
      const markers = course.travelCourses.map(courseItem => ({
        name: courseItem.title,
        lat: courseItem.yMap,
        lng: courseItem.xMap,
        iconCategory: courseItem.category
      }));
      setCourseMarkers(markers);
      
    }, [course])

    return (
        <div className="courses-detail-card-container">
          <div className="courses-detail-map">
            <DetailMap courseMarkers={courseMarkers}/>
          </div>
          <div className="courses-detail-info">
            <div className="courses-datail-header">
              <div className="courses-detail-subtitle">{course.subtitle}</div>
              <div className="courses-detail-title">{course.title}</div>
            </div>
            <div className="courses-detail-introduction">
              {course.introduction && course.introduction.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </div> 
            <div className="hashtags">
              {course.hashtags && course.hashtags.map((hashtag, index) => (
                <span key={index} className="hashtag">#{hashtag.title}</span>
              ))}
            </div>
          </div>
          <div className="course-detail-card-list">
              {course.travelCourses && course.travelCourses.map((course, index) => (
                <CourseCard key={index} course={course} index={index}/>
              ))}
          </div>
        </div>
  );
}

export default CoursesDetailCard;