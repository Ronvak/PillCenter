import { Box } from "@mui/system";
import { CardActions, Grid } from "@mui/material";
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
  const { handleMedicineChoose, prescriptioned, setOpenVideoCallMessage } =
    props;

  useEffect(() => {
    const res = axios
      .get(`/api/medicines/?q=${prescriptioned}`)
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
      <Box sx={{ width: "100%", marginBottom: 8 }}>
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
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: 345,
                    borderRadius: 3,
                    "&:hover": {
                      backgroundColor: "#C0C0C0",
                    },
                  }}
                  onClick={() => {
                    prescriptioned === "False"
                      ? handleMedicineChoose(medicine.id)
                      : setOpenVideoCallMessage(true);
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      objectFit: "contain",
                      height: 140,
                    }}
                  >
                    <img src={medicine.image_URL} height="80%" width="90%" />
                  </Paper>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {medicine.medicine_name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {" "}
                      {medicine.description}
                    </Typography>
                    <Typography variant="body1" color="text.primary">
                      <strong>
                        {medicine.is_prescription
                          ? "תרופה במרשם"
                          : "תרופה ללא מרשם"}
                      </strong>
                    </Typography>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{ justifyContent: "center", marginTop: "auto" }}
                  >
                    <Typography variant="h6">
                      <strong> מחיר : {medicine.price} ₪</strong>
                    </Typography>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </center>
  );
}
