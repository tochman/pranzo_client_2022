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
import VouchersCreate from "./components/dashboard/VouchersCreate";
import PranzoProcess from "./components/content/PranzoProcess";
import { useEffect } from "react";
import { validateUserByToken } from "./state/features/authentication";
import { getHeaders } from "./state/utilities/authConfig";
import AffiliateSetup from "./components/dashboard/AffiliateSetup";

const App = () => {
  const { authenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authHeaders = getHeaders()
    authHeaders.uid && dispatch(validateUserByToken());
  }, [getHeaders]);

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
          <Route path="/dashboard/vouchers" element={<Vouchers />} />
          <Route path="/dashboard/vouchers/create" element={<VouchersCreate />} />
          <Route path="/dashboard/venue/affiliate/add" element={<AffiliateSetup />}/>
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
