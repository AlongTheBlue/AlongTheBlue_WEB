// import TravelCoursesForm from './TravelCoursesForm';

function TravelCoursesFormList({ travelCourses, setTravelCourses }) {

    return (
        <div className="travel-courses-form-list-container">
            <div className='travel-courses-header'>여행코스</div>
            <div className="travel-courses-list">
                {travelCourses.map((course, index) => (
                        <CourseCard key={index} course={course} index={index}/>
                ))}
            </div>
        </div>
    );
}

export default TravelCoursesFormList;
