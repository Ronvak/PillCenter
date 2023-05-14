import { useState } from "react";
import Item from "../buttons/Item";
import { Box, Typography } from "@mui/material";
import VideoCall from "../../agora/VideoCall";
import { useNavigate } from "react-router-dom";
export default function Consultant() {
  const [inCall, setInCall] = useState(false);

  const navigate = useNavigate();

  return (
    <center>
      <Box
        sx={{
          height: "90%",
          width: "80%",
          marginTop: 8,
        }}
      >
        <Typography variant="h5">ייעוץ ללקוחות </Typography>
        <Typography sx={{ marginTop: 3 }} variant="h6">
          {" "}
          מספר אנשים בתור: 3{" "}
        </Typography>
        <Item
          onClick={() => navigate("/consultant/videoroom")}
          sx={{
            marginTop: 5,
            border: 1,
            borderWidth: 3,
            borderColor: "black",
            maxHeight: 70,
            lineHeight: 4,
          }}
        >
          התחלת סשן שיחת וידאו
        </Item>
      </Box>
    </center>
  );
}
