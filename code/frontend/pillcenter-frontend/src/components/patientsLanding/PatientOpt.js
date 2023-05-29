import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "../buttons/Item";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PatientOpt() {
  const navigate = useNavigate();
  const { auth } = useAuth();

  return (
    <>
      <Box sx={{ width: "84%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <Item
              id="order"
              sx={{ border: 1, borderWidth: 3, borderColor: "black" }}
              onClick={() => navigate("/order")}
            >
              תרופות ללא מרשם
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item
              onClick={() => navigate(`/myorders/${auth?.id}`)}
              sx={{ border: 1, borderWidth: 3, borderColor: "black" }}
            >
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
              onClick={() => {
                navigate("/orderprescription");
                //  setOpenVideoCallMessage(true)
              }}
            >
              {" "}
              תרופות מרשם
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
