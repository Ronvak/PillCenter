import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import MyButton from "../buttons/ButtonTemplate";
import { useNavigate } from "react-router-dom";
import { appId, CustomerId, secret } from "../../agora/settings";
import PatientVideoRoom from "./PatientVideoRoom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import SimpleDialogDemo from "../modals/EndVideoMessage";
const WaitingRoom = (props) => {
  const [timer, setTimer] = useState(0);
  const [available, setAvailable] = useState(false);
  const [inSession, setInSession] = useState(false);
  const [finish, setFinish] = useState(false);
  const [session, setSession] = useState();
  const [token, setToken] = useState("");
  const [instructions, setInstructions] = useState("");
  const { auth } = useAuth();
  const { handleFinishVideoSession } = props;
  const [openDialog, setOpenDialog] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    searchChannel();
  }, []);

  var plainCredentials = CustomerId + ":" + secret;
  var base64Credentials = btoa(plainCredentials);
  var config = {
    method: "get",
    url: `https://api.agora.io/dev/v1/channel/${appId}/`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic" + base64Credentials,
    },
  };
  async function searchChannel() {
    if (!available) {
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
  }

  async function getChannel() {
    await axios
      .get(`/api/joinchannel/?q=${auth.id}`)
      .then((response) => {
        setToken(response.data?.token);
        setSession(response.data);
        setAvailable(true);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
      if (available) {
        clearInterval(interval); // Stop the interval if available
      } else {
        searchChannel();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [available]);

  useEffect(() => {
    if (available) getChannel();
  }, [available]);

  async function checkEnd() {
    await axios
      .get(`/api/getchannel/?q=${session.id}`)
      .then((response) => {
        let status = response.data?.status;
        if (status !== "pending") {
          setInstructions(response.data?.instructions);
          if (status == "Approved") setIsApproved(true);
          setFinish(true);
        }
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    let intervalId = null;
    if (available && inSession) {
      intervalId = setInterval(() => {
        if (finish) {
          clearInterval(intervalId);
          handleFinishVideoSession(instructions, isApproved);
        } else {
          checkEnd();
        }
      }, 2000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [available, inSession, finish]);

  const navigate = useNavigate();

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
            <MyButton
              sx={{ marginTop: 3 }}
              fullWidth
              onClick={() => setInSession(true)}
            >
              התחל שיחה{" "}
            </MyButton>

            <br></br>
            <br></br>
          </div>
        ) : (
          <PatientVideoRoom
            token={token}
            setInSession={setInSession}
            inSession={inSession}
            finish={finish}
          />
        )}
        {finish && (
          <SimpleDialogDemo
            isApproved={isApproved}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        )}
      </center>
    </div>
  );
};

export default WaitingRoom;
