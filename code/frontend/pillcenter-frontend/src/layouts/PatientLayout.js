import { Outlet } from "react-router-dom";
import Navbar from "../components/navs/Navbar";

function PatientLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PatientLayout;
