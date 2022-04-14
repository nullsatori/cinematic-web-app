import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { upload, useAuth } from "../firebase";

const Dashboard = () => {
  const currentUser = useAuth();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
  );
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };
  const handleClickPicture = () => {
    upload(photo, currentUser, setLoading);
    console.log(currentUser);
  };
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhotoURL(currentUser.photoURL);
    }
  }, [currentUser]);
  return (
    <div id="Dashboard">
      <h1>DASHBOARD</h1>
      <div id="userOptions">
        <div id="profile__picture">
          <img
            src={photoURL}
            className="profile__picture__image"
            alt="user__profile__picture"
          />
          <input type="file" onChange={handleChange} />
          <button disabled={loading || !photo} onClick={handleClickPicture}>
            Change profile picture
          </button>
        </div>
        <div id="user__info">
          <div id="email">
            <p>{currentUser?.email}</p>
            <input type="text" onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
