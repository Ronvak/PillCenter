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
  let { logoutUser } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static">
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
              onClick={logoutUser}
            >
              <KeyboardBackspaceIcon />
            </MyIconButton>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
