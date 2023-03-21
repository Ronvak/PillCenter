import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Login from "./pages/Login";
import PrivateRoute from "./utils/PrivateRoute";

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
                <Header />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
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
