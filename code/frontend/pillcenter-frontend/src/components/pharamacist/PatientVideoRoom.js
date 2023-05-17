import { useEffect, useState } from "react";
import axios from "axios";
import MyButton from "../buttons/ButtonTemplate";
import Box from "@mui/material/Box";
import VideoCall from "../../agora/VideoCall";

import useAuth from "../../hooks/useAuth";

export default function PatientVideoRoom(props) {
  const [inCall, setInCall] = useState(false);
  const { token } = props;
  const [activeChannel, setActiveChannel] = useState(false);

  const { auth } = useAuth();

  return (
    <center>
      <Box
        sx={{
          marginTop: 5,
        }}
      >
        {inCall ? (
          <>
            <VideoCall setInCall={setInCall} token={token} />
            <Box sx={{ marginTop: 3, width: "85%" }}></Box>
          </>
        ) : (
          <MyButton
            sx={{ marginTop: 3 }}
            fullWidth
            onClick={() => setInCall(true)}
          >
            התחל שיחה{" "}
          </MyButton>
        )}
      </Box>
    </center>
  );
}
