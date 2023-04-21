import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import MyButton from "../buttons/ButtonTemplate";
import Typography from "@mui/material/Typography";
import Navigation from "./Navigation";
import GoogleMaps from "./GoogleMaps";
export default function OrderSummary(props) {
  const { machineChoice } = props;

  return (
    <center>
      <Box sx={{ width: "90%" }}>
        <Typography variant="h5">התהליך הושלם בהצלחה!</Typography>
        <Typography variant="button">
          כעת אפשר לגשת למכונה ולאסוף את התרופות בכתובת:
        </Typography>
        <Typography variant="button">
          {machineChoice.address} , {machineChoice.city}
        </Typography>
        <br></br>
        <br></br>
        <GoogleMaps machineChoice={machineChoice} />
        <br></br>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
          <Grid item xs={6} sm={6}>
            <MyButton fullWidth>צפייה בהזמנה</MyButton>
          </Grid>
          <Grid item xs={6} sm={6}>
            {" "}
            <Navigation machineChoice={machineChoice} />
          </Grid>
        </Grid>
      </Box>
    </center>
  );
}
