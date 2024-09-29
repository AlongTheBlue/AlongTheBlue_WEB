import React from 'react';
import "../styles/Page.css";
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import ItemCardList from '../components/ItemCardList';
import PageHeader from '../components/PageHeader';

const foods = [
    {
        title: '명진전복', 
        address: '제주특별자치도 제주시 구좌읍 해맞이해안로 1282', 
        hashtags: [
            "#전복요리",
            "#전복돌솥밥",
            "#바다뷰맛집",
            "#고등어구이",
            "#제주맛집"
        ], 
        image1: '/images/food/명진전복.png',
        image2: 'https://blog.kakaocdn.net/dn/b3fewH/btqWVSsjaEO/JcMi0zIGZg75AFXSYvDqGk/img.jpg'
    },
    { 
        title: '올래국수', 
        address: '제주특별자치도 제주시 귀아랑길 24', 
        hashtags: [
            "#제주고기국수",
            "#올래국수",
            "#진한사골국물",
            "#제주고기국수맛집",
            "#수요미식회맛집"
        ], 
        image1: '/images/food/올래국수.jpeg',
        image2: 'https://api.cdn.visitjeju.net/photomng/imgpath/201910/23/cfb35a88-5beb-4434-96b6-c878a6073d49.jpg'},
];

function ItemList() {

    const { category } = useParams();
    
    let title = '';
    if(category == "tour") title = "관광";
    else if(category == "restaurant") title = "음식";
    else if(category == "accommodation") title = "숙소";
    else if(category == "cafe") title = "카페";
    else title = "여행코스"

    return (
        <div className="page-container">
            <PageHeader title={title}/>
            <ItemCardList items={foods}/>
            <Footer/>
        </div>
    );
}

export default ItemList;