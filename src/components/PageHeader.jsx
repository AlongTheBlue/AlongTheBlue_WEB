import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/PageHeader.css"

function PageHeader({title}) {
  const navigate = useNavigate();

  const handleBeforeClick = () => {
    navigate(-1);
  };

  return (
    <div className='page-header'>
        <img className='page-header-before' src='../src/images/icon/left_arrow.svg' onClick={handleBeforeClick} alt="before"/>
        <div className='page-title'>{title}</div>
    </div>
  );
}

export default PageHeader;