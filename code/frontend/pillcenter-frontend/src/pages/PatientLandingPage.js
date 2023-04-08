import React, { useState, useEffect, useContext } from "react";

import { Typography } from "@mui/material";
import PatientOpt from "../components/patientsLanding/PatientOpt";
import useAuth from "../hooks/useAuth";
const PatientLandingPage = () => {
  const { auth } = useAuth();

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <center>
        <Typography variant="h5"> {auth?.first_name} ברוכים הבאים </Typography>
        <Typography variant="h5"> מה ברצונך לעשות? </Typography>
        <br></br>
        <br></br>
        <PatientOpt />
      </center>
    </div>
  );
};

export default PatientLandingPage;
