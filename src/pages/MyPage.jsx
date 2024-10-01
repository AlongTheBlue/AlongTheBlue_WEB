import { useNavigate } from "react-router-dom";
import "../styles/Page.css";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import UserCard from "../components/UserCard";
import "../styles/MyPage.css"
import KakaoLogin from "../components/Login/KakaoLogin";

function MyPage({isAuthenticated, user, setUser, setIsAuthenticated}) {
    const navigate = useNavigate();

    const logout = ()=> {
        localStorage.removeItem('id');
        setUser(null)
        setIsAuthenticated(false)
        navigate('/')
    }

    return(
        <div className="page-container">
            {!isAuthenticated ?
            <KakaoLogin/>
            :
            <>
                <PageHeader title={"마이"}/>
                <UserCard user={user}/>
                <div className="my-along-container">
                    <div className="my-along-header">마이페이지</div>
                    <div className="my-along-blues">
                        <div>내 바당따라</div>
                        <img src="/images/icon/arrow_right.svg"/>
                    </div>
                    <div className="my-along-courses">
                        <div>내 여행따라</div>
                        <img src="/images/icon/arrow_right.svg"/>
                    </div>
                </div>
                <div className="my-along-container">
                    <div className="my-along-header">고객센터</div>
                    <div className="my-along-blues">
                        <div>공지사항</div>
                        <img src="/images/icon/arrow_right.svg"/>
                    </div>
                    <div className="my-along-courses">
                        <div>문의하기</div>
                        <img src="/images/icon/arrow_right.svg"/>
                    </div>
                    <div className="my-along-courses">
                        <div>설정</div>
                        <img src="/images/icon/arrow_right.svg"/>
                    </div>
                </div>
                <div className="logout-container" onClick={logout}>로그아웃</div>
            <Footer/>
            </>
            }
        </div>
    );
}

export default MyPage;
