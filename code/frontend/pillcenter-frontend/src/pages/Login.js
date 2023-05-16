import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import logo from "./logo.png";
import useAuth from "../hooks/useAuth";
import ButtonTemplate from "../components/buttons/ButtonTemplate";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        PillCenter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  let { loginUser, auth, user } = useAuth();
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  const theme = createTheme();
  async function handleSubmit(e) {
    loginUser(e).catch((error) => {
      setValid(true);
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="logo" width="300"></img>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {valid ? (
              <Alert severity="error">שם משתמש או סיסמא לא נכונים</Alert>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="  שם משתמש / דואר אלקטרוני"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמא"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <ButtonTemplate
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              התחבר
            </ButtonTemplate>
            <Grid container>
              <Grid item xs>
                <Link href="" variant="body2">
                  שכחת סיסמא ?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/signup">
                  {"אין לך משתמש ? הרשם עכשיו"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
