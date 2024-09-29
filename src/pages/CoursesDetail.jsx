import Footer from '../components/Footer';
import "../styles/Page.css";
import PageHeader from '../components/PageHeader';
import CoursesDetailCard from '../components/CoursesDetailCard';
import { useParams } from 'react-router-dom';
import UserCard from '../components/UserCard';

function CoursesDetail({alongCoursesMode}) {
    const { id } = useParams();

    const user = {
        profileImg: '/images/user/user1.jpg',
        userName: '치즈버거',
        userComment: '우와아아아아아아',
    }
    
    return (
        <div className="page-container">
            <PageHeader title={alongCoursesMode ? "여행따라" : "여행코스"}/>
            {alongCoursesMode && <UserCard 
                profileImg= {user.profileImg} 
                userName={user.userName}
                userComment={user.userComment}/>}
            <CoursesDetailCard id={id} />
            <Footer />
        </div>
  );
}

export default CoursesDetail;