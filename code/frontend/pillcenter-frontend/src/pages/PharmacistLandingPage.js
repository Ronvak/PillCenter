import React, { useState, useEffect, useContext } from "react";

import { Box, Typography } from "@mui/material";
import PharmacistOpt from "../components/pharmacistLanding/PharmacistOpt";
import useAuth from "../hooks/useAuth";
const PharmacistLandingPage = () => {
  const { auth } = useAuth();

  return (
    <Box style={{ marginTop: 50 }}>
      <center>
        <Typography variant="h5">
          {" "}
          שלום {auth?.first_name} הרוקח הטוב באזור
        </Typography>
        <Typography variant="h5"> מה הפעולה שברצונך לבצע ? </Typography>
        <PharmacistOpt />
      </center>
    </Box>
  );
};

export default PharmacistLandingPage;
