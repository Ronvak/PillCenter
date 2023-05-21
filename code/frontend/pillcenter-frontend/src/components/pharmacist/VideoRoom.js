import { useState } from "react";
import axios from "axios";
import MyButton from "../buttons/ButtonTemplate";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import VideoCall from "../../agora/VideoCall";
import TextField from "@mui/material/TextField";
import useAuth from "../../hooks/useAuth";
import EndSession from "../modals/EndSession";
import { useNavigate } from "react-router-dom";
import { useClient } from "../../agora/settings";

export default function VideoRoom() {
  const [inCall, setInCall] = useState(false);
  const [token, setToken] = useState();
  const [session, setSession] = useState();
  const [instructions, setInstructions] = useState("");
  const [anamnesis, setAnamnesis] = useState("");
  const navigate = useNavigate();
  const client = useClient();

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

    await client.leave();
    client.removeAllListeners();
    setInCall(false);

    navigate(0);
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
            <VideoCall setInCall={setInCall} token={token} />
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
            onClick={() => handleVideoSession()}
          >
            התחל שיחה{" "}
          </MyButton>
        )}
      </Box>
    </center>
  );
}
