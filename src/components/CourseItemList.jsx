import "../styles/CourseItemList.css";
import CourseItem from './CourseItem';

function CourseItemList({ courseData }) {

    return (
        <div className='courses-item-list-container'>
            <div className='courses-item-list'>
                {courseData.map((course, index) => (
                    <CourseItem
                        key={index}
                        profileImg={course.profileImg}
                        userName={course.userName}
                        userComment={course.userComment}
                        courseTitle={course.courseTitle}
                        description={course.description}
                        images={course.images}
                        tags={course.tags}
                    />
                ))}
            </div>
        </div>
    );
}

export default CourseItemList;
