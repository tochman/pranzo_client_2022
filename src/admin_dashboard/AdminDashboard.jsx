import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";


const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (

    <Box>
      <Heading>ADMIN</Heading>
      <Text>{currentUser.name}</Text>
    </Box>
  );
};

export default AdminDashboard;
