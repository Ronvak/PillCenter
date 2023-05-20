import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
} from "./settings";
import Video from "./Video";

export default function VideoCall(props) {
  const { setInCall, token } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  useEffect(() => {
    let init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        if (mediaType === "video") {
          setUsers([...users, user]);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      try {
        await client.join(config.appId, name, token, null);
      } catch (error) {
        console.log("error");
      }

      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };

    if (ready && tracks) {
      try {
        init(channelName);
      } catch (error) {
        console.log(error);
      }
    }
  }, [channelName, client, ready, tracks]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} md={6} style={{ height: "100%" }}>
        {start && tracks && (
          <Video
            tracks={tracks}
            users={users}
            setStart={setStart}
            setInCall={setInCall}
          />
        )}
      </Grid>
      <Grid item xs={12} md={6} sx={{ height: "100%", display: "flex" }}>
        <Grid item sx={{ flexGrow: 1 }}>
          {/* {ready && tracks && (
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
            />
          )} */}
        </Grid>
      </Grid>
    </Grid>
  );
}
