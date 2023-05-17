import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import MyButton from "../buttons/ButtonTemplate";
import { useNavigate } from "react-router-dom";
import { appId, CustomerId, secret } from "../../agora/settings";
import PatientVideoRoom from "./PatientVideoRoom";
import axios from "axios";

const WaitingRoom = ({ onJoinCall }) => {
  const [timer, setTimer] = useState(0);
  const [available, setAvailable] = useState(false);
  const [inSession, setInSession] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    searchChannel();
  }, []);

  var plainCredentials = CustomerId + ":" + secret;
  var base64Credentials = btoa(plainCredentials);
  var config = {
    method: "get",
    url: `http://api.agora.io/dev/v1/channel/${appId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic" + base64Credentials,
    },
  };
  async function searchChannel() {
    await axios(config)
      .then((response) => {
        if (
          response.data?.data?.channels.length > 0 &&
          response.data?.data?.channels[0]?.user_count === 1
        ) {
          setAvailable(true);
        }
      })
      .catch((e) => console.log(e));
  }

  async function getChannel() {
    await axios
      .get("/api/getchannel/")
      .then((response) => {
        setToken(response.data?.token);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    if (!available) {
      const interval = setInterval(() => {
        setTimer((timer) => timer + 1);
        searchChannel();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    getChannel();
  }, [available]);

  const navigate = useNavigate();
  const handleJoinCall = () => {
    navigate("/videoroom");
  };

  const handleCancelCall = () => {
    navigate("/");
  };

  return (
    <div>
      <center>
        {!available ? (
          <div>
            <Typography sx={{ marginTop: 10 }} variant="h5">
              <strong>ברוכים הבאים לחדר המתנה</strong>
            </Typography>
            <Typography variant="h5"> מיד הרוקח יכנס לשיחה ... </Typography>
            <Typography variant="h5"> הזמן שחלף: {timer} שניות </Typography>
            <MyButton sx={{ marginTop: 5 }} onClick={handleCancelCall}>
              לביטול השיחה
            </MyButton>
          </div>
        ) : !inSession ? (
          <div>
            <Typography sx={{ marginTop: 10 }} variant="h5">
              <strong>ברוכים הבאים לחדר המתנה</strong>
            </Typography>
            <Typography variant="h5"> הרוקח נכנס לשיחה תורך הגיע</Typography>
            <Typography variant="h5"> הזמן שחלף: {timer} שניות </Typography>
            <PatientVideoRoom token={token} setInSession={setInSession} />
            <br></br>
            <br></br>
          </div>
        ) : (
          ""
        )}
      </center>
    </div>
  );
};

export default WaitingRoom;
