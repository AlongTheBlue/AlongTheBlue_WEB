import { useNavigate } from 'react-router-dom';
import "../styles/PageHeader.css"

function PageHeader({title}) {
  const navigate = useNavigate();

  const handleBeforeClick = () => {
    if(title == "로그인") 
      navigate('/')
    const referrer = document.referrer; // 이전 페이지의 URL

    // 이전 페이지가 우리 사이트 내부 URL인지 확인
    if (referrer && referrer.includes(window.location.origin)) {
      // history 스택에 두 개 이상의 항목이 있을 때만 뒤로 이동 (-1)
      if (window.history.length > 1) {
        navigate(-1);
      }
    } else {
      navigate('/'); // 외부에서 접속했거나, 이전 페이지가 없으면 홈으로 이동
    }
  };

  return (
    <div className='page-header'>
        <img className='page-header-before' src='/images/icon/left_arrow.svg' onClick={handleBeforeClick} alt="before"/>
        <div className='page-title'>{title}</div>
    </div>
  );
}

export default PageHeader;