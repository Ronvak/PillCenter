import { useEffect, useState } from "react";
import { useClient } from "./settings";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamoffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall, finish } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };
  useEffect(() => {
    if (finish) leaveChannel();
  }, [finish]);
  return (
    <Grid container spacing={4}>
      <Grid item>
        <Button onClick={() => mute("audio")}>
          {trackState.audio ? (
            <MicIcon color="error" />
          ) : (
            <MicOffIcon color="error" />
          )}
        </Button>
      </Grid>
      <Grid item>
        <Button onClick={() => mute("video")}>
          {trackState.video ? (
            <VideocamIcon color="error" />
          ) : (
            <VideocamoffIcon color="error" />
          )}
        </Button>
      </Grid>
      <Grid item>
        <Button color="error" onClick={() => leaveChannel()}>
          התנתקות&nbsp;
          <ExitToAppIcon color="error" />
        </Button>
      </Grid>
    </Grid>
  );
}
