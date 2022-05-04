import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { upload, useAuth } from "../firebase";

const DashBoard = () => {
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
    upload(photo, currentUser, setLoading).then(() => {
      console.log(currentUser);
      window.location.reload();
    });
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
        <div id="user__info">
          <div id="email">
            <p>{currentUser?.email}</p>
          </div>
        </div>
        <div id="profile__picture">
          <img
            src={photoURL}
            className="profile__picture__image"
            alt="user__profile__picture"
          />
          <input
            type="file"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
          />
          <button disabled={loading || !photo} onClick={handleClickPicture}>
            Change profile picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
