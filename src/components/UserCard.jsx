import "../styles/UserCard.css";

function UserCard({profileImg, userName, userComment}) {
  return (
      <div className="profile">
        <img src={profileImg} alt={userName} className="profile-img" />
        <div>
          <div className='profile-name'>{userName}</div>
          <div className='profile-introduction'>{userComment}</div>
        </div>
      </div>
    // </div>
  );
}

export default UserCard;
