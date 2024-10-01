import "../styles/KakaoLogin.css"
import Footer from "./Footer"
import Header from "./Header"
import PageHeader from "./PageHeader"
import axios from 'axios';

const KakaoLogin = ()=>
    {   
        const endpoint = import.meta.env.VITE_BE_ENDPOINT;
        const baseUrl = `${endpoint}/oauth`;

        const getKakaoLoginUrl = async () => {
            const response = await axios.get(`${baseUrl}/login`);
            return response.data.data;
        }
        
        const handleLogin = async () => {
            try {
                const loginUrl = await getKakaoLoginUrl();
                window.location.href = loginUrl; // 카카오 로그인 페이지로 이동
            } catch (error) {
                console.error('Error fetching Kakao login URL:', error);
            }
        };

        return(
        <div className="kakao-login-container">
            <PageHeader title={"로그인"}/>
            <div className="kakao-login-main">
                <Header/>
                <div className="kakao-login-img-container" onClick={handleLogin}>
                    <img src="/images/login/kakao_login.png"/>
                </div>  
            </div>
            {/* <button onClick={handleLogin}>카카오 로그인</button> */}
            <Footer/>
        </div>
        )
    }
    export default KakaoLogin