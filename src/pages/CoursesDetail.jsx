import Footer from '../components/Footer';
import "../styles/Page.css";
import PageHeader from '../components/PageHeader';
import CoursesDetailCard from '../components/CoursesDetailCard';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { useEffect, useState } from 'react';
import { getDetailAlongBlue, getDetailAlongCourse } from '../utils/data';

function CoursesDetail({alongCoursesMode, alongBluesMode}) {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [course, setCourse] = useState([]);
  
    useEffect(() => {
        if(!alongCoursesMode)
            return;

        const fetchData = async () => {
          setLoading(true);
          try {
            const data = await getDetailAlongCourse(id);
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
        if(!alongBluesMode)
            return;

        const fetchData = async () => {
          setLoading(true);
          try {
            const data = await getDetailAlongBlue(id);
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
    
    return (
        <div className="page-container">
            <PageHeader title={alongCoursesMode ? "여행따라" : (alongBluesMode ? "바당따라" : "여행코스")}/>
            { alongBluesMode && alongCoursesMode && <UserCard user={course.user} />}
            {alongCoursesMode ?
                !loading && <CoursesDetailCard alongCourse={course} />
            : alongBluesMode ?
                !loading && <CoursesDetailCard alongCourse={course} />
            : <CoursesDetailCard id={id} />
            }
            <Footer />
        </div>
  );
}

export default CoursesDetail;