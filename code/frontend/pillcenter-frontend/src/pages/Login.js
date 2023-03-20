import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import { Alert } from "@mui/material";

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

const theme = createTheme();

export default function Login() {
  let { loginUser } = useContext(AuthContext);
  const [valid, setValid] = useState(false);

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            התחבר
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            error
            sx={{ mt: 1 }}
          >
            {valid ? (
              <Alert severity="error">Invalid username or password</Alert>
            ) : (
              " "
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="שם משתמש"
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              התחבר
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ? שכחת סיסמא
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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
