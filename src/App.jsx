import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import Navigation from "./components/app_bar/Navigation";
import Landing from "./components/content/Landing";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import VenueSetup from "./components/dashboard/VenueSetup";
import VenueView from "./components/dashboard/VenueView";
import Vouchers from "./components/dashboard/Vouchers";
import PranzoProcess from "./components/content/PranzoProcess";

import { useEffect } from "react";
import { validateUserByToken } from "./state/features/authentication";
const App = () => {
  const { authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(validateUserByToken({foo: 'bar'}))
  }, []);

  useEffect(() => {
    authenticated && navigate("/dashboard");
  }, [authenticated]);

  return (
    <Box height={"100vh"} w={"100vw"}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/venue/setup" element={<VenueSetup />} />
          <Route path="/dashboard/venue" element={<VenueView />} /> 
          <Route path='/dashboard/vouchers' element={<Vouchers />} />
        </Route>
        <Route path="/join-pranzo" element={<PranzoProcess />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
      </Routes>
      <Footer />
    </Box>
  );
};
export default App;
