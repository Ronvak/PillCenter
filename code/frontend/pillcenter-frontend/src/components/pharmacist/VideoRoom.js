import { useState } from "react";
import Button from "@mui/material/Button";
import VideoCall from "../../agora/VideoCall";
export default function VideoRoom() {
  const [inCall, setInCall] = useState(false);

  return (
    <div style={{ height: "500px", width: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
        >
          Join Call
        </Button>
      )}
    </div>
  );
}
