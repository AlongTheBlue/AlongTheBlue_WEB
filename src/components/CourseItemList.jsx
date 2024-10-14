import { useNavigate } from "react-router-dom";
import "../styles/CourseItemList.css";
import CourseItem from './CourseItem';
import UserCard from "./UserCard";

function CourseItemList({courseData }) {
    const navigate = useNavigate();
    
    const handleAlongCoursesForm = () => {
        const storedData = localStorage.getItem("id");
        if(!storedData){
            alert("로그인을 먼저 해주세요.")
            navigate(`/my`);
            return;
        }
        navigate(`/along/courses/form/${storedData}`);
    }

    return (
        <div className='courses-item-list-container'>
            <div className='courses-item-add' onClick={handleAlongCoursesForm}>작성</div>
            <div className='courses-item-list'>
                {courseData.map((course, index) => (
                    <div className='courses-item-card' key={index}>
                        <UserCard 
                            userId={course.userId} />
                        <CourseItem
                            id = {course.id}
                            courseTitle={course.courseTitle}
                            description={course.description}
                            images={course.images}
                            tags={course.tags}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CourseItemList;
