import React from 'react';
import '../styles/Page.css';
import CourseItemList from '../components/CourseItemList';
import Footer from '../components/Footer';
import PageHeader from '../components/PageHeader';

const courseData = [
  {
    profileImg: '/images/user/user1.jpg',
    userName: '치즈버거',
    userComment: '우와아아아아아아',
    courseTitle: '제주의 해안가를 따라',
    description: '요즘 제주 여행을 많이 가는 것 같아서 3월에 다녀온 제주일정표 \n 별거 아니지만 혹시 계획 세우기 귀찮은 분들을 위해',
    images: [
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg', 
      'http://tong.visitkorea.or.kr/cms/resource/31/3035531_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
      'http://tong.visitkorea.or.kr/cms/resource/37/3035537_image2_1.jpg',
    ],
    tags: ['일출', '일출', '일출']
  },
  {
    profileImg: '/images/user/user2.jpg',
    userName: '호랑나비',
    userComment: '한 마리 가야아',
    courseTitle: '제주도 가성비 코스',
    description: '요즘 제주 여행을 많이 가는 것 같아서 3월에 다녀온 제주일정표 \n 별거 아니지만 혹시 계획 세우기 귀찮은 분들을 위해',
    images: [
      'http://tong.visitkorea.or.kr/cms/resource/32/3035532_image2_1.jpg', 
      'http://tong.visitkorea.or.kr/cms/resource/40/3035540_image2_1.jpg'
    ],
    tags: ['일출', '일출', '일출']
  }
];

const AlongCourses = () => {

  return (
    <div className='page-container'>
      <PageHeader title={"여행따라"}/>
      <CourseItemList courseData={courseData} />
      <Footer/>
    </div>
  );
};

export default AlongCourses;
