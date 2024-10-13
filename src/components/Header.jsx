import { useNavigate } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(-1);
  };

  const clickMyPage = () => {
    navigate("/my");
  };

  return (
    <header className="header">
      {/* <img className='header-btn' src='/images/icon/menu_1.svg'/> */}
      <div className="header-logo" onClick={handleHomeClick}>
        <img src="/images/icon/logo.svg" alt="logo" />
        <div className="header-text">바당따라</div>
      </div>
      {/* <img className='header-btn' src='/images/icon/menu_profile.svg' onClick={clickMyPage}/> */}
    </header>
  );
}

export default Header;
