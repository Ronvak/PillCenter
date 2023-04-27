import Box from "@mui/system/Box";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import MyButton from "../buttons/ButtonTemplate";
import Typography from "@mui/material/Typography";
import Navigation from "./Navigation";
import GoogleMaps from "./GoogleMaps";
export default function OrderSummary(props) {
  const { machineChoice } = props;
  const [distance, setDistance] = useState();

  async function handleDistance(dis) {
    setDistance(dis.replace("km", 'ק"מ'));
    setDistance(dis.replace("m", "מטרים"));
  }
  return (
    <center>
      <Box sx={{ width: "95%" }}>
        <Typography variant="h5">התהליך הושלם בהצלחה!</Typography>
        <Typography variant="h6">
          כעת אפשר לגשת למכונה ולאסוף את התרופות בכתובת:
        </Typography>
        <Typography variant="button">
          {machineChoice.address} , {machineChoice.city}
        </Typography>
        <br></br>
        {distance ? (
          <Typography variant="button">במרחק של {distance} ממך</Typography>
        ) : (
          " מחשב מרחק..."
        )}

        <br></br>
        <br></br>
        <GoogleMaps
          machineChoice={machineChoice}
          handleDistance={handleDistance}
        />
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
