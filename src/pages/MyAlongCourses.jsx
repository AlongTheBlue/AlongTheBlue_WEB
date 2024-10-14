import "../styles/Page.css";
import CourseItemList from "../components/CourseItemList";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";
import { getMyAlongCourses } from "../utils/data";

const MyAlongCourses = () => {
  const [loading, setLoading] = useState(false);
  const [alongCourses, setAlongCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getMyAlongCourses();
        setAlongCourses(data);

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
      <PageHeader title={"내 여행따라"} />
      <CourseItemList alongCourses={alongCourses} />
      <Footer />
    </div>
  );
};

export default MyAlongCourses;
