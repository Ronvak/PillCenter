import { useState } from "react";
import axios from "axios";
import MyButton from "../buttons/ButtonTemplate";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import VideoCall from "../../agora/VideoCall";
import TextField from "@mui/material/TextField";
import useAuth from "../../hooks/useAuth";
import EndSession from "../modals/EndSession";
import { Await, useNavigate } from "react-router-dom";
export default function VideoRoom() {
  const [inCall, setInCall] = useState(false);
  const [token, setToken] = useState();
  const [session, setSession] = useState();
  const [instructions, setInstructions] = useState("");
  const [anamnesis, setAnamnesis] = useState("");
  const [finish, setFinish] = useState(false);
  const { auth } = useAuth();
  async function createChannel() {
    let data = {
      pharmacist: auth?.id,
    };
    await axios
      .post("/api/generatetoken/", data)
      .then((response) => {
        setSession(response.data);
        setToken(response.data?.token);
        return response;
      })
      .catch((e) => console.log(e));
  }
  function handleVideoSession() {
    createChannel();

    setInCall(true);
  }

  async function handleEndSession(decision) {
    let data = {
      status: decision === true ? "Approved" : "Disapproved",
      instructions: instructions,
      anamnesis: anamnesis,
      session: session,
    };

    await axios.post("/api/endsession/", data).catch((e) => console.log(e));
    setFinish(true);
  }
  return (
    <center>
      <Box
        sx={{
          marginTop: 5,
        }}
      >
        <Typography variant="h6"> מספר אנשים בתור: 3 </Typography>
        {inCall ? (
          <>
            <VideoCall setInCall={setInCall} token={token} finish={finish} />
            <Box
              component="form"
              onSubmit={handleEndSession}
              sx={{ marginTop: 3, width: "85%" }}
            >
              <TextField
                id="outlined-multiline-static"
                label="סיכום מפגש"
                multiline
                fullWidth
                rows={4}
                onChange={(e) => setAnamnesis(e.target.value)}
              />
              <TextField
                id="outlined-multiline-static"
                label="הוראות שימוש"
                multiline
                fullWidth
                onChange={(e) => setInstructions(e.target.value)}
                sx={{ marginTop: 3 }}
                rows={2}
              />

              <EndSession handleEndSession={handleEndSession} />
            </Box>
          </>
        ) : (
          <MyButton
            sx={{ marginTop: 3 }}
            fullWidth
            onClick={() => {
              setFinish(false);
              handleVideoSession();
            }}
          >
            התחל שיחה{" "}
          </MyButton>
        )}
      </Box>
    </center>
  );
}
