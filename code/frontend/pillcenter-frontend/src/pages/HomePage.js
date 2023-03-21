import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  let [profile, setProfile] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let response = await fetch("http://localhost:8000/api/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    console.log(data);
    if (response.status === 200) {
      setProfile(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  return (
    <div>
      <p>אתה מחובר לדף הבית!</p>
      <p>
        שם : {profile.first_name} {profile.last_name}
      </p>
      <p>אימייל: {profile.email}</p>
    </div>
  );
};

export default HomePage;
