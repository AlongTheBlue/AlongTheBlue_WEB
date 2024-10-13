import "../styles/CoursesCard.css";
import { useNavigate } from "react-router-dom";

const CoursesCard = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseDetail = (id) => {
    navigate(`/courses/detail/${id}`);
  };

  console.log(course)

  return (
    <div
      className="courses-card-container"
      onClick={() => handleCourseDetail(course.contentid)}
    >
      <div
        className="courses-card-img"
        style={{
          backgroundImage: `linear-gradient(
                    rgba(0, 0, 0, 0), 
                    rgba(0, 0, 0, 0.8)
                  ),url(${course.img})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "90%",
          height: "20em",
          borderRadius: "5px",
        }}
      >
        <div className="courses-card-info">
          <div className="courses-card-header">{course.subtitle}</div>
          <div className="courses-card-main">
            <div className="courses-card-title">{course.title}</div>
            <div className="courses-card-hashtag">#{course.hashTag}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesCard;
