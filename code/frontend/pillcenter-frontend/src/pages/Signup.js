import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import logo from "./logo.png";
import MyButton from "../components/buttons/ButtonTemplate";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        PillCenter
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("");
  const [userTaken, setUserTaken] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [idTaken, setIdTaken] = useState(false);

  const navigate = useNavigate();

  String.prototype.isNumber = function () {
    return /^\d+$/.test(this);
  };

  const validateEmail = () => {
    if (email.length == 0) return true;
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  function validId() {
    if (id.length == 0) return true;

    return id.length == 9 && id.isNumber() == true;
  }
  function validPhone() {
    if (phone.length == 0) return true;

    return /^([0]\d{1,3}[-])?\d{7,10}$/.test(phone);
  }

  function validUserName() {
    if (username.length == 0) return true;
    return /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/.test(
      username
    );
  }

  function validPassword() {
    if (password.length === 0) return true;
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  }
  function validForm() {
    return (
      validId() &&
      validPhone() &&
      validateEmail() &&
      validUserName() &&
      validPassword &&
      password === confirmPass
    );
  }

  let { signUp } = useContext(AuthContext);
  async function handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: e.target.username.value,
      password: e.target.password.value,
      email: e.target.email.value,
      first_name: first,
      last_name: last,
      profile: { phone: phone, id_user: id },
    };
    var response = signUp(user);
    console.log(response);
    response.then((value) => {
      console.log(value);
      if (value.includes("username already exists")) setUserTaken(true);
      if (value.includes("address already exists")) setEmailTaken(true);
      if (value.includes("User Created Successfully")) navigate("/login");
      if (value.includes("id user already exists")) setIdTaken(true);
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

          <Box component="form" Validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {userTaken ? (
                  <Alert severity="error">
                    שם המשתמש שבחרת תפוס , נא בחר שם משתמש אחר .
                  </Alert>
                ) : (
                  ""
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="usernamee"
                  label="שם משתמש"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  error={!validUserName()}
                  helperText={
                    !validUserName()
                      ? "שם משתמש חייב להכיל אותיות באנגלית ומספרים  בלבד (לפחות ארבעה תווים)"
                      : ""
                  }
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUserTaken(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {idTaken ? (
                  <Alert severity="error">
                    כבר קיים משתמש עם תעודת זהות זהה לזאת שהזנת.
                  </Alert>
                ) : (
                  ""
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="id"
                  label="תעודת זהות"
                  name="id"
                  error={!validId()}
                  helperText={!validId() ? "תעודת זהות לא תקינה" : ""}
                  onChange={(e) => {
                    setId(e.target.value);
                    setIdTaken(false);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="phone"
                  required
                  fullWidth
                  id="phone"
                  label="מספר פלאפון"
                  error={!validPhone()}
                  helperText={!validPhone() ? "מספר פלאפון לא תקין" : ""}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="שם פרטי"
                  onChange={(e) => {
                    setFirst(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="שם משפחה"
                  name="last_name"
                  autoComplete="family-name"
                  onChange={(e) => setLast(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                {emailTaken ? (
                  <Alert severity="error">
                    כבר קיים משתמש עם כתובת דואר אלקטרוני זהה לזאת שהזנת
                  </Alert>
                ) : (
                  ""
                )}
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="דואר אלקטרוני"
                  name="email"
                  autoComplete="email"
                  error={!validateEmail()}
                  helperText={
                    !validateEmail() ? "כתובת דואר אלקטרוני לא תקינה" : ""
                  }
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailTaken(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="סיסמא"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!validPassword()}
                  helperText={
                    !validPassword()
                      ? "סיסמא חייבת להכיל לפחות 8 תווים , אות קטנה וגדולה באנגלית "
                      : ""
                  }
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="אימות סיסמא"
                  type="password"
                  id="password2"
                  error={confirmPass != password}
                  helperText={
                    confirmPass != password ? "הסיסמאות אינם תואמות" : ""
                  }
                  autoComplete="new-password"
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
            <MyButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!validForm()}
            >
              הרשם
            </MyButton>

            <Grid item>
              <Link component={RouterLink} to="/login">
                יש לך כבר משתמש ? התחבר עכשיו
              </Link>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
