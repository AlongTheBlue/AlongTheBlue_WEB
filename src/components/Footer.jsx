import "../styles/Footer.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
    const navigate = useNavigate();

    const handleMyAlongBlues = () => {
        navigate("/along/blues/my")
    }

    const handleMyAlongCourses = () => {
        navigate("/along/courses/my")
    }

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-copyright">© AlongTheBlue 2024</div>
                <div className="footer-ceo" onClick={handleMyAlongBlues}>대표: 김예일</div>
                <div>|</div>
                <div className="footer-fe" onClick={handleMyAlongCourses}>FE: 고도희</div>
                <div>|</div>
                <div className="footer-be">BE: 강예린, 문인배, 이지우</div>
                <div>|</div>
                <div className="footer-de">DE: 정하원</div>
            </div>
        </footer>
    );
};

export default Footer;
