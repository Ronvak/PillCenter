import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "../buttons/Item";
import Box from "@mui/material/Box";

export default function PatientOpt() {
  return (
    <Box sx={{ width: "70%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item sx={{ border: 1, borderWidth: 3, borderColor: "black" }}>
            הזמנה
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item sx={{ border: 1, borderWidth: 3, borderColor: "black" }}>
            תרופות ממתינות
          </Item>
        </Grid>
        <Grid xs={12}>
          <Item
            sx={{
              border: 1,
              borderWidth: 3,
              borderColor: "black",
              maxHeight: 70,
              lineHeight: 4,
            }}
          >
            {" "}
            המתנה לרוקח
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
