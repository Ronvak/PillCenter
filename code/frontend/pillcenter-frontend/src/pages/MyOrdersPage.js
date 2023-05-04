import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import useAuth from "../hooks/useAuth";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import LoadingOrder from "../components/loading/LoadingOrder";
import { useNavigate } from "react-router-dom";

export default function MyOrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  let params = useParams();

  console.log(params);
  const getMyOrders = async () => {
    const res = await axios
      .get(`/api/getmyorders/?q=${params.userid}`)
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  function isAuthorized() {
    if (String(auth?.id) !== String(params.userid)) {
      navigate("/unauthorized");
    }
  }
  useEffect(() => {
    isAuthorized();
    getMyOrders();
  }, [params]);
  return (
    <center>
      <Box sx={{ width: "100%", marginTop: 5 }}>
        {loading ? (
          <LoadingOrder text="אנא המתן מחפש את ההזמנות שלך..." />
        ) : orders.length > 0 ? (
          <React.Fragment>
            <Typography variant="h5">
              {" "}
              להלן התרופות שלך שממתינות לאיסוף :
            </Typography>
            <br></br>
            <Grid>
              <List>
                {orders.map((order) => {
                  order.order_date = order.order_date
                    .split("-")
                    .reverse()
                    .join("-");
                  return (
                    <Grid item={true} xs={22} key={order.id}>
                      <ListItem
                        dense={false}
                        sx={{ height: "50px", width: "100%" }}
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <VaccinesIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={"מס' הזמנה: " + order.id}
                            secondary={"מתאריך : " + order.order_date}
                          />
                        </ListItemButton>
                        <ListItemSecondaryAction
                          onClick={() => navigate(`/ordersummary/${order.id}`)}
                        >
                          לצפייה
                          <IconButton
                            edge="end"
                            aria-label="צפייה בהזמנה"
                            title="צפייה"
                          >
                            <VisibilityIcon />
                          </IconButton>{" "}
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Grid>
                  );
                })}
              </List>
            </Grid>{" "}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography variant="h5">
              לא נמצא אצלנו הזמנות הממתינות לאיסוף על ידך
            </Typography>
          </React.Fragment>
        )}
      </Box>
    </center>
  );
}
