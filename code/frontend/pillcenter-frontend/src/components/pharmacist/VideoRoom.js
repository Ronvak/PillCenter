import { useState } from "react";
import MyButton from "../buttons/ButtonTemplate";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import VideoCall from "../../agora/VideoCall";
// import { generateRtcToken } from "../../agora/tokenGenerator";
import TextField from "@mui/material/TextField";
import EndSession from "../modals/EndSession";
export default function VideoRoom() {
  const [inCall, setInCall] = useState(false);
  const [token, setToken] = useState("");

  function handleVideoSession() {
    let genToken =
      "006d3754641865b422f90f234d5766a4d8aIACXTENvEx1KLqqHSvN8j3YXwcwKNtWMWr6YUXsZxAF042TNKL8AAAAAIgBX54kDNVdiZAQAAQAQDgAAAgAQDgAAAwAQDgAABAAQDgAA";
    setToken(
      "006d3754641865b422f90f234d5766a4d8aIACXTENvEx1KLqqHSvN8j3YXwcwKNtWMWr6YUXsZxAF042TNKL8AAAAAIgBX54kDNVdiZAQAAQAQDgAAAgAQDgAAAwAQDgAABAAQDgAA"
    );

    console.log(genToken);
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
              {/* <Typography variant="h6" textAlign="start">
                {" "}
                סיכום מפגש
              </Typography> */}
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
