import { Box, Flex, Text, Spacer, useColorModeValue } from "@chakra-ui/react";
import Card from "./templates/Card";
import CardBody from "./templates/CardBody";
import CardHeader from "./templates/CardHeader";
import VouchersRow from "./templates/VouchersRow";
import React from "react";
import { useSelector } from "react-redux";

import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";

const Vouchers = () => {
  const { vouchers } = useSelector((state) => state.user);
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card
      p="22px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            Vouchers
          </Text>
        </Flex>
        <Flex my={{ sm: "1rem", xl: "10px" }} alignItems="center">
          <Flex direction="column">
            <Text fontSize="md" color={textColor} fontWeight="bold">
              Code
            </Text>
            <Text
              fontSize="sm"
              color="gray.400"
              fontWeight="semibold"
              me="16px"
            >
              Status
            </Text>
          </Flex>
          <Spacer />
          <Box justifyContent={"center"}>
            <Text fontSize="md" color="gray.400" fontWeight="semibold">
              Initial value
            </Text>
          </Box>
          <Spacer />
          <Box justifyContent={"center"}>
            <Text fontSize="md" color="gray.400" fontWeight="semibold">
              Current Value
            </Text>
          </Box>
          <Spacer />
          <Box me="10px">
            <Text fontSize="md" color="gray.400" fontWeight="semibold">
              {""}
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          {vouchers.map((row) => {
            return (
              <VouchersRow
                code={row.code}
                active={row.active}
                value={row.value}
                currentValue={row.current_value}
                holder={row.email}
                transactions={row.transactions}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Vouchers;
