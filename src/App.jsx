import { Routes, Route, useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Navigation from "./components/app_bar/Navigation";
import Landing from "./components/content/Landing";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import { useEffect } from "react";
const App = () => {
  const { authenticated } = useSelector((state) => state.user);
  const navigate = useNavigate()
  useEffect(() => {
    authenticated && navigate('/dashboard')
  }, [authenticated])
  
  return (
    <Box height={"100vh"} w={"100vw"}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/*<Route path="/projects/create" element={<ProjectCreate />} /> */}
        </Route>
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
      </Routes>
      <Footer />
      {/* <Toast /> */}
    </Box>
  );
};
export default App;
