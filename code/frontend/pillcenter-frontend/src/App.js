import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import PrivateRoute from "./utils/PrivateRoute";
import PatientLandingPage from "./pages/PatientLandingPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import MakeOrderPage from "./pages/MakeOrderPage";
import OrderLayout from "./layouts/OrderLayout";
import OrderPage from "./pages/OrderPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import PharmacistLandingPage from "./pages/PharmacistLandingPage";
import Consultant from "./components/pharmacist/Consultant";
import VideoRoom from "./components/pharmacist/VideoRoom";
import React from "react";
import WaitingRoom from "./components/pharamacist/WaitingRoom";
import SessionSummary from "./components/sessionSummary/SessionSummary";
import PatientVideoRoom from "./components/pharamacist/PatientVideoRoom";

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
                    <Route
                      path="/order"
                      element={<MakeOrderPage prescriptioned={"False"} />}
                    />
                    <Route path="/waitingroom" element={<WaitingRoom />} />
                    <Route path="/videoroom" element={<PatientVideoRoom />} />
                    <Route path="/ordersummary" element={<OrderLayout />}>
                      <Route path=":orderid" element={<OrderPage />} />
                    </Route>
                    <Route
                      path="/orderprescription"
                      element={<MakeOrderPage prescriptioned={"True"} />}
                    />
                    <Route path="/myorders" element={<OrderLayout />}>
                      <Route path=":userid" element={<MyOrdersPage />} />
                    </Route>
                  </Route>
                  <Route
                    element={<PrivateRoute allowedRoles={["pharmacist"]} />}
                  >
                    <Route
                      path="/pharmacist"
                      element={<PharmacistLandingPage />}
                      exact
                    />
                    <Route path="/consultant" element={<Consultant />} exact />
                    <Route
                      path="/consultant/videoroom"
                      element={<VideoRoom />}
                      exact
                    />
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
