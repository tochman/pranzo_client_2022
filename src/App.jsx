import { Routes, Route } from "react-router-dom";
import Navigation from "./components/app_bar/Navigation";
import Landing from "./components/content/Landing";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/footer/Footer";
import { Box } from "@chakra-ui/react";

const App = () => {
  return (
    <Box height={"100vh"} w={'100vw'}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/projects/:id" element={<Project />} />
          <Route path="/projects/create" element={<ProjectCreate />} /> */}
        </Route>
        <Route path="/auth" element={<SignUp />} />
      </Routes>
      <Footer />
      {/* <Toast /> */}
    </Box>
  );
};
export default App;