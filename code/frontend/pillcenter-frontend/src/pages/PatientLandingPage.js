import React, { useState, useEffect, useContext } from "react";

import { Typography } from "@mui/material";
import PatientOpt from "../components/patientsLanding/PatientOpt";
import useAuth from "../hooks/useAuth";
import LoginMessage from "../components/modals/LoginMessage";
const PatientLandingPage = () => {
  const { auth } = useAuth();

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <center>
        <Typography variant="h5"> שלום {auth?.first_name},</Typography>
        <Typography variant="h5"> מה הפעולה שברצונך לבצע ? </Typography>
        <br></br>
        <br></br>
        <PatientOpt />
      </center>
    </div>
  );
};

export default PatientLandingPage;
