import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { styled } from "@mui/material/styles";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#00000",
    },
  },
});
const MyIconButton = styled(Button)(({ theme }) => ({
  borderRadius: "20px",

  "&:hover": {
    backgroundColor: "#646464",
  },
}));
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  let { logoutUser } = useContext(AuthContext);

  function handleBack() {
    if (location.pathname !== "/") navigate(-1);
    else logoutUser();
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              PillCenter
            </Typography>
            <MyIconButton
              size="large"
              color="inherit"
              sx={{ mr: -2 }}
              onClick={() => handleBack()}
            >
              <KeyboardBackspaceIcon />
            </MyIconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <br></br>
      <br></br>
    </Box>
  );
}
