import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import axios from "axios";
import Paper from "@mui/material/Paper";
import { wazelink } from "../components/orderFlow/Navigation";
import { googlemapLink } from "../components/orderFlow/Navigation";
import Icon from "@mdi/react";
import IconButton from "@mui/material/IconButton";
import { mdiWaze } from "@mdi/js";
import { SiGooglemaps } from "react-icons/si";
import CancelOrder from "../components/orderFlow/CancelOrder";

export default function OrderPage() {
  const [expanded, setExpanded] = React.useState("panel4");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  let params = useParams();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [number, setNumber] = useState();
  const [order, setOrder] = useState();
  const [canceled, setCanceled] = useState(false);

  function handleCancelation() {
    setCanceled(true);
  }

  async function getOrder() {
    const res = await axios
      .get(`/api/getorder/?q=${params.orderid}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (params) getOrder();
  }, [params, canceled]);

  useEffect(() => {
    if (order) {
      setNumber(order.machine.address.replace(/^\D+/g, ""));
      const addr = order.machine.address.replace(/[0-9]/g, "");
      setAddress(addr.replace(/ /g, "%20"));
      setCity(order?.machine?.city.replace(/ /g, "%20"));
    }
  }, [order]);

  return (
    <div>
      <Box sx={{ width: "100%", marginTop: 7 }}>
        <center>
          <Typography variant="h5">סיכום הזמנה מס' {order?.id}</Typography>

          <br></br>
          <Box
            sx={{
              width: "85%",
              border: "solid",
              borderRadius: "10px",
              borderWidth: "3px",
              borderColor: "#C0C0C0",
            }}
          >
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
              elevation={14}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography align="left" sx={{ width: "33%", flexShrink: 0 }}>
                  פרטי המוצר:
                </Typography>
                <Typography align="right" sx={{ color: "text.secondary" }}>
                  {order?.product_id?.medicine_id?.medicine_name}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Paper
                  elevation={0}
                  sx={{
                    objectFit: "cover",
                    height: 70,
                  }}
                >
                  <img
                    src={order?.product_id?.medicine_id?.image_URL}
                    height="100%"
                    width="60%"
                  />
                </Paper>
                <Typography align="left">
                  חברה : {order?.product_id?.medicine_id?.brand}
                </Typography>
                <Typography align="left">
                  תיאור : {order?.product_id?.medicine_id?.description}
                </Typography>
                <Typography align="left">
                  הוראות שימוש : {order?.product_id?.medicine_id?.prescription}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              elevation={14}
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography align="left" sx={{ width: "33%", flexShrink: 0 }}>
                  פרטי הזמנה:
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {order?.id}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography align="left">
                  תאריך ההזמנה: {order?.order_date}
                </Typography>
                <Typography align="left">
                  סטאטוס הזמנה : {order?.order_status?.status}
                </Typography>
                <Typography align="left">
                  הערת רוקח : {order?.pharmacist_instruction}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              elevation={14}
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography align="left" sx={{ width: "40%", flexShrink: 0 }}>
                  כתובת לאיסוף :
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {order?.machine?.address} , {order?.machine.city}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography id="modal-modal-description" sx={{ mt: 3 }}>
                  באפשרותך לבחור באחד מדרכי הניווט הבאים אל המכונה.
                  <br></br>
                  <a
                    href={`${wazelink}${number}%20${city}%20${address}&navigate=yes`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton
                      sx={{
                        textDecorationColor: "black",
                        textEmphasisColor: "black",
                      }}
                    >
                      <Icon path={mdiWaze} size={1.6} color="#42D4FF" />
                      Waze
                    </IconButton>
                  </a>
                  <a
                    href={`${googlemapLink}${address}%20${number}%2C%20${city}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconButton aria-label="Google">
                      <SiGooglemaps color="#F4B400" size={32} />
                      GoogleMaps
                    </IconButton>
                  </a>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion
              elevation={14}
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  ברקוד לאיסוף הזמנה:
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <img src={`http://localhost:8000${order?.qr_code}`} />
              </AccordionDetails>
            </Accordion>
          </Box>
          {order?.order_status?.id === 1 ? (
            <Box sx={{ marginTop: 5 }}>
              <CancelOrder
                orderid={order?.id}
                handleCancelation={handleCancelation}
              />
            </Box>
          ) : (
            " "
          )}
        </center>
      </Box>
    </div>
  );
}
