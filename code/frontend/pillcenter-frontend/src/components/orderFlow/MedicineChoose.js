import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function MedicineChoose(props) {
  const [medicineInit, setMedicinesInit] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const { handleMedicineChoose } = props;
  useEffect(() => {
    const res = axios
      .get("http://127.0.0.1:8000/api/medicines/")
      .then((response) => {
        setMedicines(response.data);
        setMedicinesInit(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (input) => {
    let newMedicines = medicineInit.filter((medicine) => {
      return medicine.medicine_name.includes(input);
    });
    setMedicines(newMedicines);
  };
  return (
    <center>
      <br></br>
      <br></br>
      <Typography variant="h5"> אנא בחר מרשם אותו </Typography>
      <Typography variant="h5"> אתה רוצה לאסוף </Typography>
      <br></br>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
          <Grid item={true} xs={12}>
            <Autocomplete
              onChange={(e, value) => {
                handleSearch(value);
              }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={medicines.map((option) => option.medicine_name)}
              renderInput={(params) => (
                <TextField
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  sx={{ borderRadius: 3 }}
                  {...params}
                  label="חיפוש"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Grid>
          {medicines.map((medicine) => {
            return (
              <Grid item={true} xs={6} key={medicine.id}>
                <Card
                  sx={{
                    height: 280,
                    maxWidth: 345,
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "#C0C0C0",
                    },
                  }}
                  onClick={() => handleMedicineChoose(medicine.id)}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      objectFit: "contain",
                      height: 120,
                    }}
                  >
                    <img src={medicine.image_URL} height="80%" width="90%" />
                  </Paper>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {medicine.medicine_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {medicine.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </center>
  );
}
