import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Auth = ({ setUser, setIsAuthenticated }) => {
    const navigate = useNavigate();
    const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    const baseUrl = `${endpoint}/oauth`;

    console.log("auth");
    useEffect(() => {
        const fetchToken = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');
            console.log(code)
            if (code) {
                try {
                    console.log(code);
                    const response = await axios.get(`${baseUrl}/callback?code=${code}`);
                    const id = response.data.data;
                    localStorage.setItem('id', id);  // JWT 토큰을 로컬 스토리지에 저장

                    // const config = {
                    //     // 토큰을 Authorization 헤더에 포함
                    //     headers: {
                    //         'Authorization': `${token}`,
                    //         'Content-Type': 'application/json' // 기본 Content-Type
                    //     }
                    // };

                    // 토큰으로 사용자 정보 가져오기
                    const userResponse = await axios.get(`${endpoint}/api/user`, {
                        headers: { Authorization: `${id}` },
                    });

                    setUser(userResponse.data.data);
                    setIsAuthenticated(true);
                    navigate('/');  // 홈 페이지로 리다이렉트
                } catch (error) {
                    console.error('Error during callback handling:', error);
                }
            }
        };

        fetchToken();
    }, [navigate, setUser]);

    return <div>로그인 중입니다...</div>;
};

export default Auth;