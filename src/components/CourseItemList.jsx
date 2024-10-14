import { useNavigate } from "react-router-dom";
import "../styles/CourseItemList.css";
import CourseItem from './CourseItem';
import UserCard from "./UserCard";

function CourseItemList({myPageMode, courses, alongCourse }) {
    const navigate = useNavigate();
    
    const handleAlongCoursesForm = () => {
        const uid = localStorage.getItem("id");
        if(!uid){
            alert("로그인을 먼저 해주세요.")
            navigate(`/my`);
            return;
        }
        navigate(`/along/courses/form/${uid}`);
    }

    return (
        <div className='courses-item-list-container'>
            {!myPageMode &&
            <div className='courses-item-add' onClick={handleAlongCoursesForm}>작성</div>
            }
            <div className='courses-item-list'>
                {courses && courses.map((course, index) => (
                    <div className='courses-item-card' key={index}>
                        <UserCard user={course.user} />
                        <CourseItem course = {course} alongCourse={alongCourse}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseItemList;
