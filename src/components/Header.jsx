import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Header.css"

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate(`/`);
  };

  const url = 'https://noticemju.s3.ap-northeast-2.amazonaws.com/blue/logo.svg';

  return (
    <header className="header">
      <div className="logo" onClick={handleHomeClick}>
        <img src={url} alt='logo'/>
        <div className='text'>바당따라</div>
      </div>
    </header>
  );
}

export default Header;