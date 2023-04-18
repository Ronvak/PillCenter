import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Item from "../buttons/Item";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function MachinesList(props) {
  const [machines, setMachines] = useState([]);

  const { medicineChoise, handleNext } = props;

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

      <Typography variant="h5"> מאיפה תרצה לאסוף את התרופות ?</Typography>
      <br></br>
      <Box sx={{ width: "70%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
          {machines.map((machine) => {
            return (
              <Grid xs={12} key={machine.id}>
                <Item
                  sx={{
                    border: 1,
                    borderWidth: 3,
                    borderColor: "black",
                    height: 75,
                    lineHeight: "75px",
                  }}
                  onClick={() => handleNext()}
                >
                  {machine.id}
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </center>
  );
}
