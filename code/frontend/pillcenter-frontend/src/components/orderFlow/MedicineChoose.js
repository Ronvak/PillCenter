import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

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
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 2, md: 3 }}>
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
                  onClick={() => handleNext(medicine.id)}
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
