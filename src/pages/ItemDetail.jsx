import React from 'react';
import "../styles/Page.css";
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ItemDetailCard from '../components/ItemDetailCard';


function ItemDetail() {
    const { title, id } = useParams();
    
    const tourSpot = {
        id: id,
        name: '사라봉',
        address: '제주특별자치도 제주시 사라봉동길 61',
        holiday: '연중개방 (방문 시 제주관광정보센터 확인)',
        weather: '24°C',
        phone: '제주관광정보센터 064-740-6000',
        introduction: '제주항 동쪽으로 바닷가를 접해 위치한 오름으로 제주시를 대표하는 오름이라고 할 수 있다. 고운 비단을 뜻하는 사라봉은 제주에서 가장 아름다운 열 곳을 선정한 영주십경 중 사봉낙조에 해당하는 오름이다. 사봉낙조는 사라봉에서 지는 붉은 노을을 의미하며, 사라봉 정상에 올라 노을로 붉게 물든 바다를 보면 절로 감탄사가 나온다. 정상에 오르면 북쪽으로는 파란 바다, 남쪽으로는 웅장한 한라산을 볼 수 있고 발아래로 제주 시내의 모습이 보여 막힘없이 펼쳐진 낮의 풍경도 아름답다. 오름의 형태는 북서쪽으로 벌어진 말굽형 화구로서 붉은 송이로 구성된 기생 화산이고 전체적으로 소나무가 가득하다. 사라봉 남쪽에는 모충사가 있고 동쪽에는 별도봉이 연봉을 이루고 있으며, 산 일대는 공원으로 지정되어 있다. 공원 내에는 팔각정과 의병 항쟁 기념탑이 있고 체력단련시설과 음수대, 화장실 등의 편의시설이 잘 갖추어져 있어 관광객뿐만 아니라 도민들도 자주 방문하는 오름이다.',
        hashtags: [
            '#제주사라봉', 
            '#사봉낙조', 
            '#제주오름', 
            '#한라산뷰', 
            '#제주시명소'
        ],
        image: 'http://tong.visitkorea.or.kr/cms/resource/99/3053499_image2_1.jpg'
    }

    return (
        <div className="detail-page-container">
            {/* <Header /> */}
            <ItemDetailCard item={tourSpot}/>
            <Footer/>
        </div>
    );
}

export default ItemDetail;