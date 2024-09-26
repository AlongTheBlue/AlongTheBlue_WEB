import React from 'react';
import "../styles/BluesPlan.css"
import { useState } from 'react';
import { useEffect } from 'react';

const blue = { 
    id: 11,
    name: "이호테우해수욕장", 
    xMap: "126.4531570913", 
    yMap: 33.4974183784 
};

const BluesPlan = ({ id }) => {
    const [blue, setBlue] = useState(null); // 현재 위치 상태 관리
    useEffect

    return (
        <div className='blues-plan-container'>
             <div id="map" className='blues-plan-map'></div>
        </div>
    );
};

export default BluesPlan;
