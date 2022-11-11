import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <div style={{ marginTop: "30px" }}>{currentUser.name}</div>;
};

export default Profile;
