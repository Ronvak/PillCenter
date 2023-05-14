import { AgoraVideoPlayer } from "agora-rtc-react";
import Grid from "@mui/material/Grid";
import Controls from "./Controls";
import Paper from "@mui/material/Grid";
import Box from "@mui/system/Box";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks, setStart, setInCall } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    console.log(users);

    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <Grid container style={{ height: "calc(100% - 48px)" }}>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={12} sm={6} style={{ height: "100%" }}>
                <Paper
                  elevation={3}
                  style={{
                    height: "100%",
                    width: "80%",
                  }}
                >
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    key={user.uid}
                    style={{ height: "300px", width: "100%" }}
                  ></AgoraVideoPlayer>
                </Paper>
              </Grid>
            );
          } else return null;
        })}
      <Grid item xs={12} sm={6} style={{ height: "100%" }}>
        <Paper
          elevation={3}
          style={{
            height: "100%",
            width: "80%",
            borderTop: "solid",
            borderTopWidth: "14px",
            borderTopColor: "#C0C0C0",
          }}
        >
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            style={{ height: "300px", width: "100%" }}
          ></AgoraVideoPlayer>
          <Paper
            elevation={13}
            sx={{
              backgroundColor: "#C0C0C0",
            }}
          >
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
            />
          </Paper>
        </Paper>
      </Grid>
    </Grid>
  );
}
