import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const HomePage = () => {
  const { profile, setProfile, authTokens, logoutUser } =
    useContext(AuthContext);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    let response = await fetch("/api/profile/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
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
      <p>ת"ז: {profile.profile?.id_user}</p>
      <p>מספר פלאפון: {profile.profile?.phone}</p>
    </div>
  );
};

export default HomePage;
