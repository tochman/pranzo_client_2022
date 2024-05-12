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
import ReportCreate from "./components/dashboard/ReportCreate";
import Profile from "./components/user/Profile";
import ResetPassword from "./components/auth/ResetPassword";
import ChangePassword from "./components/auth/ChangePassword";
import AdminDashboard from "./admin_dashboard/AdminDashboard";

const App = () => {
  const { authenticated, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authHeaders = getHeaders();
    authHeaders.uid && dispatch(validateUserByToken());
  }, [getHeaders]);

  useEffect(() => {
    if (authenticated) {
      navigate("/dashboard");
    }
  }, [authenticated, navigate]);

  // New useEffect for admin role check
  useEffect(() => {
    if (authenticated && currentUser?.role === "admin") {
      navigate("/admin");
    }
  }, [authenticated, currentUser, navigate]);

  return (
    <Box height={"100vh"} w={"100vw"}>
      <Navigation />
      <Box paddingBottom={"50px"}>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/venue/setup" element={<VenueSetup />} />
            <Route path="/dashboard/venue" element={<VenueView />} />
            <Route path="/dashboard/vouchers" element={<Vouchers />} />
            <Route
              path="/dashboard/vouchers/create"
              element={<VouchersCreate />}
            />
            <Route
              path="/dashboard/venue/affiliate/add"
              element={<AffiliateSetup />}
            />
            <Route
              path="/dashboard/reports/create"
              element={<ReportCreate />}
            />
            <Route path="/user" element={<Profile />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
          <Route path="/join-pranzo" element={<PranzoProcess />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/change-password" element={<ChangePassword />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};
export default App;
