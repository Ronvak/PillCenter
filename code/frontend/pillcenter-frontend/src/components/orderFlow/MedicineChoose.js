import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Item from "../buttons/Item";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

export default function MedicineChoose(props) {
  const [medicines, setMedicines] = useState([]);
  const { handleNext } = props;
  useEffect(() => {
    const res = axios
      .get("http://127.0.0.1:8000/api/medicines/")
      .then((response) => {
        setMedicines(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <center>
      <br></br>
      <br></br>

      <Typography variant="h5"> אנא בחר מרשם אותו </Typography>
      <Typography variant="h5"> אתה רוצה לאסוף </Typography>
      <br></br>

      <Box sx={{ width: "70%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 2 }}>
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
                  onClick={() => handleNext(medicine.id)}
                >
                  {medicine.description}
                </Item>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </center>
  );
}
