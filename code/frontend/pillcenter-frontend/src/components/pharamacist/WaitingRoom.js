import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import MyButton from "../buttons/ButtonTemplate";
import { useNavigate } from "react-router-dom";

const WaitingRoom = ({ onJoinCall }) => {
  const [timer, setTimer] = useState(0);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();
  const handleJoinCall = () => {
    onJoinCall();
  };

  const handleCancelCall = () => {
    navigate("/");
  };

  return (
    <div>
      {!available ? (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <center>
            <Typography variant="h5">
              <strong>ברוכים הבאים לחדר המתנה</strong>
            </Typography>
            <Typography variant="h5"> מיד הרוקח יכנס לשיחה ... </Typography>
            <Typography variant="h5"> הזמן שחלף: {timer} שניות </Typography>
            <MyButton onClick={handleCancelCall}>לביטול השיחה</MyButton>

            <br></br>
            <br></br>
          </center>
        </div>
      ) : (
        <div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <center>
            <Typography variant="h5">
              <strong>ברוכים הבאים לחדר המתנה</strong>
            </Typography>
            <Typography variant="h5"> הרוקח נכנס לשיחה תורך הגיע</Typography>
            <Typography variant="h5"> הזמן שחלף: {timer} שניות </Typography>
            <MyButton onClick={handleJoinCall}>הצטרף לשיחה</MyButton>
            <br></br>
            <br></br>
          </center>
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
