import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Item from "../buttons/Item";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function MachinesList(props) {
  const [machines, setMachines] = useState([]);

  const { medicineChoise, handleMachineChoose } = props;

  const getMachines = async () => {
    const res = await axios
      .get(`http://127.0.0.1:8000/api/medicineinstock/?q=${medicineChoise}`)
      .then((response) => {
        setMachines(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMachines();
  }, []);
  return (
    <center>
      <br></br>
      <br></br>
      {machines.length > 0 ? (
        <React.Fragment>
          <Typography variant="h5"> התרופה שבחרת נמצאת במלאי</Typography>
          <Typography variant="h5"> מאיפה תרצה לאסוף את התרופה ?</Typography>
          <br></br>
          <Box sx={{ width: "70%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 1, md: 2 }}
            >
              {machines.map((machine) => {
                return (
                  <Grid item={true} xs={12} key={machine.id}>
                    <Item
                      sx={{
                        border: 1,
                        borderWidth: 3,
                        borderColor: "black",
                        height: 75,
                        lineHeight: "75px",
                      }}
                      onClick={() => handleMachineChoose(machine)}
                    >
                      {machine.address} , {machine.city}
                    </Item>
                  </Grid>
                );
              })}
            </Grid>
          </Box>{" "}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography variant="h5">
            לצערנו התרופה שבחרת אינה נמצאת אצלנו במלאי המכונות
          </Typography>
        </React.Fragment>
      )}
    </center>
  );
}
