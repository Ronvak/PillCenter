import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "../components/buttons/Item";
import Box from "@mui/material/Box";
import ProcessBar from "../components/processBar/ProcessBar";
import Questionnaire from "../components/questionnaire/Questionnaire";

const MakeOrderPage = () => {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const res = axios
      .get("http://127.0.0.1:8000/api/medicines/")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <ProcessBar />
      <center>
        <br></br>

        <br></br>

        <Typography variant="h5"> אנא בחר מרשם אותו </Typography>
        <Typography variant="h5"> אתה רוצה לאסוף </Typography>
        <br></br>
        <Box sx={{ width: "70%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 1, md: 2 }}
          >
            {medicines.map((medicine) => {
              return (
                <Grid xs={12} key={medicine.id}>
                  <Item
                    sx={{
                      border: 1,
                      borderWidth: 3,
                      borderColor: "black",
                      height: 75,
                      lineHeight: "75px",
                    }}
                  >
                    {medicine.description}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </center>
    </div>
  );
};

export default MakeOrderPage;
