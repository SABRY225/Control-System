import React from 'react';
import "./Profile.css"
import { useSelector } from 'react-redux';
const UserProfile= ({ user }) => {
  return (
    <div className="user-details">
      <img src={user.image}  alt="User" className="user-image" />
      <div className="user-info">
        <h2 className="user-name">{user.username}</h2>
        <p className="user-national-id"><span>National ID : </span><span>{user.national} </span></p>
        <p className="user-email"><span>Email : </span><span>{user.email}</span></p>
        <p className="user-college"><span>college : </span><span>{user.college}</span></p>
        <p className="user-university"><span>university : </span><span>{user.university}</span></p>
      </div>
    </div>
  );
};

function Profile() {
  const username = useSelector((state) => state.Profile.firstName);
  const email = useSelector((state) => state.Profile.email);
  // const userImage = useSelector((state) => state.Profile.userImage);
  const national = useSelector((state) => state.Profile.national);
  const college = useSelector((state) => state.Profile.college);
  const user = {
    username,
    national,
    email,
    college,
    university: "South Valley University",
    image:"https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png"
  };

  return (
    <div className="app">
      <UserProfile user={user} />
    </div>
  );
}

export default Profile;
