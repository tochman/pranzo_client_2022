import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { createStandaloneToast } from "@chakra-ui/react";
const { toast } = createStandaloneToast();

const ProtectedRoute = () => {
  const location = useLocation();
  const { authenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      toast({
        title: "You can't do that!",
        description: "Please log in or register first.",
        isClosable: true,
        status: "error",
      });
      navigate("/auth/sign-in", { state: { originalRoute: location } });
    }
  }, [authenticated, location, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
