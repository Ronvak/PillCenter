import { useState } from "react";
import axios from "axios";
import MyButton from "../buttons/ButtonTemplate";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import VideoCall from "../../agora/VideoCall";
import TextField from "@mui/material/TextField";
import useAuth from "../../hooks/useAuth";
import EndSession from "../modals/EndSession";
export default function VideoRoom() {
  const [inCall, setInCall] = useState(false);
  const [token, setToken] = useState();

  const { auth } = useAuth();
  async function createChannel() {
    let data = {
      pharmacist: auth?.id,
    };
    await axios
      .post("/api/generatetoken/", data)
      .then((response) => {
        console.log(response.data?.token);
        setToken(response.data?.token);
        return response;
      })
      .catch((e) => console.log(e));
  }
  function handleVideoSession() {
    createChannel();
    console.log(token);

    setInCall(true);
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
            <Box sx={{ marginTop: 3, width: "85%" }}>
              <TextField
                id="outlined-multiline-static"
                label="סיכום מפגש"
                multiline
                fullWidth
                rows={4}
              />
              <TextField
                id="outlined-multiline-static"
                label="הוראות שימוש"
                multiline
                fullWidth
                sx={{ marginTop: 3 }}
                rows={2}
              />

              <EndSession />
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
