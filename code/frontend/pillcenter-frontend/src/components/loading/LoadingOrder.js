import * as React from "react";
import Box from "@mui/system/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

export default function LoadingOrder() {
  return (
    <Box sx={{ width: "80%" }}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center>
        <Typography variant="h5"> אנא המתן מעבד את הזמנתך... </Typography>
        <CircularProgress size={80} color="inherit" />
      </center>
    </Box>
  );
}
