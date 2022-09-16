import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { setMessage } from "../state/features/messageSlice";

const ProtectedRoute = () => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // dispatch(setMessage([{content: "You can't do that!", status: 'error'}]));
      // navigate("/auth", { state: { originalRoute: location } });
    }
  }, [currentUser, location, dispatch, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;