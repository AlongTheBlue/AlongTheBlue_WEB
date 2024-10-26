import "../styles/UserCard.css";

function  UserCard({ user }) {
  
  const user1 = {
    id: 1,
    profileImg: '/images/user/user2.jpg',
    userName: '호랑나비',
    userComment: '한 마리 가야아',
  }

  if(!user) user = user1

  console.log(user)

  return (
      <div className="profile">
        <img src={user.profileImg} alt={user.userName} className="profile-img" />
        <div>
          <div className='profile-name'>{user.userName}</div>
          {/* <div className='profile-introduction'>{user.userComment}</div> */}
        </div>
      </div>
  );
}

export default UserCard;
