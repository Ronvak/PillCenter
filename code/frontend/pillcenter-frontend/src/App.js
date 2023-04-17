import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "./components/navs/Navbar";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import PrivateRoute from "./utils/PrivateRoute";
import PatientLandingPage from "./pages/PatientLandingPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import MakeOrderPage from "./pages/MakeOrderPage";
import React from "react";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  direction: "rtl",
});

function App() {
  return (
    <div className="App">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            <Router>
              <AuthProvider>
                <Routes>
                  <Route element={<PrivateRoute allowedRoles={["patient"]} />}>
                    <Route path="/" element={<PatientLandingPage />} exact />
                    <Route path="/order" element={<MakeOrderPage />} exact />
                  </Route>
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </AuthProvider>
            </Router>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

export default App;
