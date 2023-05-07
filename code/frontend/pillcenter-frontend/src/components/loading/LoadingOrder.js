import * as React from "react";
import Box from "@mui/system/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function LoadingOrder(props) {
  const { text } = props;
  return (
    <Box sx={{ width: "80%", marginTop: 4 }}>
      <center>
        <Typography variant="h5"> {text} </Typography>
        <CircularProgress size={80} color="inherit" />
      </center>
    </Box>
  );
}
