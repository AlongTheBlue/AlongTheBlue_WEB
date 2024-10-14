import "../styles/Page.css";
import CourseCard from "./CourseCard";
import DetailMap from "./DetailMap";
import "../styles/CoursesDetailCard.css"
import { useEffect, useState } from "react";
import { getDetailTourCourse } from "../utils/data";

function CoursesDetailCard({alongCourse, id}) {
  const [course, setCourse] = useState([]);
  const [courseMarkers, setCourseMarkers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if(alongCourse) {
      console.log("여행따라:", alongCourse)
      setCourse(alongCourse);
      return;
    }

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
    
    useEffect(() => {
      if(!course || !course.travelCourses)
        return;

      console.log("코스:",course)
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
              {course.subtitle &&
              <div className="courses-detail-subtitle">{course.subtitle}</div>
              }
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