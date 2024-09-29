import "../styles/CourseItemList.css";
import CourseItem from './CourseItem';
import UserCard from "./UserCard";

function CourseItemList({ courseData }) {

    return (
        <div className='courses-item-list-container'>
            <div className='courses-item-list'>
                {courseData.map((course, index) => (
                    <div key={index}>
                        <UserCard 
                            profileImg={course.profileImg}
                            userName={course.userName}
                            userComment={course.userComment}/>
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
