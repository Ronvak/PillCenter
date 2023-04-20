import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Item from "../buttons/Item";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
export default function PaymentNConfirm(props) {
  const [completed, setCompleted] = useState(false);
  const { machineChoice } = props;
  function handleComplete() {
    setCompleted(true);
  }
  return (
    <center>
      <br></br>
      <br></br>

      <br></br>
      <Box sx={{ width: "80%" }}>
        {!completed ? (
          <PaymentForm handleComplete={handleComplete} />
        ) : (
          <OrderSummary machineChoice={machineChoice} />
        )}
      </Box>
    </center>
  );
}
