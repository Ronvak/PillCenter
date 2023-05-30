import React, { useEffect } from "react";
import Cards from "react-credit-cards";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "react-credit-cards/es/styles-compiled.css";
import MyButton from "../buttons/ButtonTemplate";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Recipt from "./Recipt";
const theme = createTheme();

export default function PaymentForm(props) {
  const [name, setName] = useState("");
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [number, setNumber] = useState("");
  const [focus, setFocus] = useState("");
  const [medicine, setMedicine] = useState();
  const [open, setOpen] = useState(false);
  const { handleComplete, medicineChoice } = props;
  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  async function getMedicine() {
    await axios
      .get(`/api/getmedicine/?q=${medicineChoice}`)
      .then((response) => {
        setMedicine(response.data);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getMedicine();
  }, []);
  return (
    <>
      <Typography variant="h6">
        {" "}
        מטופל יקר , אין אפשרות לשלם בהגיעך למכונה האוטומטית
      </Typography>
      <Typography variant="h6" sx={{ marginTop: 3 }}>
        להלן פרטי ההזמנה :
      </Typography>
      <Recipt medicine={medicine} />
      {!open ? (
        <MyButton fullWidth sx={{ marginTop: 3 }} onClick={() => setOpen(true)}>
          לתשלום {medicine?.price} ₪
        </MyButton>
      ) : (
        <div>
          <Typography sx={{ marginTop: 3 }} variant="h6">
            {" "}
            אנא מלא את פרטי התשלום{" "}
          </Typography>
          <div dir="ltr">
            <Cards
              cvc={cvc}
              expiry={expiry}
              focused={focus}
              name={name}
              number={number}
            />
          </div>

          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      type="tel"
                      name="number"
                      className="form-control"
                      placeholder="מספר אשראי"
                      pattern="[\d| ]{16,22}"
                      required
                      onChange={(e) => {
                        setNumber(e.target.value);
                      }}
                      onFocus={handleInputFocus}
                      fullWidth
                      id="phone"
                      label="מספר אשראי"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="שם"
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      onFocus={handleInputFocus}
                      fullWidth
                      id="phone"
                      label="שם"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      type="tel"
                      name="expiry"
                      className="form-control"
                      placeholder="Valid Thru"
                      pattern="\d\d/\d\d"
                      required
                      onChange={(e) => {
                        setExpiry(e.target.value);
                      }}
                      onFocus={handleInputFocus}
                      fullWidth
                      id="phone"
                      label="תוקף"
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      type="tel"
                      name="cvc"
                      className="form-control"
                      placeholder="CVC"
                      pattern="\d{3,4}"
                      required
                      onChange={(e) => {
                        setCvc(e.target.value);
                      }}
                      onFocus={handleInputFocus}
                      fullWidth
                      id="phone"
                      label="3 ספרות על גבי הכרטיס"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MyButton
                      onClick={() => {
                        handleComplete();
                      }}
                      type="submit"
                      fullWidth
                      variant="contained"
                    >
                      שלם
                    </MyButton>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      )}
    </>
  );
}
