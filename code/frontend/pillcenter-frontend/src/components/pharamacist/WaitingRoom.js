import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import MyButton from "../buttons/ButtonTemplate";

const WaitingRoom = ({ videoCall = false, onJoinCall, onCancelCall }) => {
  const [timer, setTimer] = useState(0);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleJoinCall = () => {
    onJoinCall();
  };

  const handleCancelCall = () => {
    onCancelCall();
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
            <MyButton on Click={handleCancelCall}>
              לביטול השיחה
            </MyButton>

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
            <MyButton on Click={handleJoinCall}>
              הצטרף לשיחה
            </MyButton>
            <br></br>
            <br></br>
          </center>
        </div>
      )}
    </div>
  );
};

export default WaitingRoom;
