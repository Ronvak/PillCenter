import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Item from "../buttons/Item";
import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
import LoadingOrder from "../loading/LoadingOrder";
export default function PaymentNConfirm(props) {
  const [completed, setCompleted] = useState(false);
  const { auth } = useAuth();
  const { machineChoice, medicineChoise } = props;
  const [order, setOrder] = useState();

  function handleComplete() {
    completeOrder();
    setCompleted(true);
  }

  async function completeOrder() {
    const orderDetails = {
      user_id: auth?.id,
      medicine_id: medicineChoise,
      machine_id: machineChoice?.id,
      pharmacist_instruction: "מאושר",
    };
    const res = await axios
      .post("/api/completeorder/", orderDetails)
      .then((response) => {
        setOrder(response.data);
        return response;
      })
      .catch((err) => console.log(err));
  }
  return (
    <center>
      <Box sx={{ width: "80%", marginTop: 5 }}>
        {!completed ? (
          <PaymentForm handleComplete={handleComplete} />
        ) : order ? (
          <OrderSummary machineChoice={machineChoice} order={order} />
        ) : (
          <LoadingOrder />
        )}
      </Box>
    </center>
  );
}
