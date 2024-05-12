import React from "react";
import { Box, Header, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";


const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (

    <Box>
      <Header>ADMIN</Header>
      <Text>{currentUser.name}</Text>
    </Box>
  );
};

export default AdminDashboard;
