import {
  Box,
  Button,
  Flex,
  Icon,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const VouchersRow = ({
  code,
  active,
  value,
  currentValue,
  holder,
  transactions,
}) => {
  const textColor = useColorModeValue("gray.700", "white");

  // code={row.code}
  // active={row.active}
  // value={row.value}
  // currentValue={row.current_value}
  // holder={row.email}

  return (
    <Flex
      my={{ sm: "1rem", xl: "10px" }}
      alignItems="center"
      justifyItems={"center"}
    >
      <Flex direction="column">
        <Text fontSize="md" color={textColor} fontWeight="bold">
          {code}
        </Text>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold" me="16px">
          {active ? "active" : "inactive"}
        </Text>
      </Flex>
      <Spacer />
      <Box me="50px">
        <Text fontSize="md" color="gray.400" fontWeight="semibold">
          {value}
        </Text>
      </Box>
      <Spacer />
      <Box me="50px">
        <Text fontSize="md" color="gray.400" fontWeight="semibold">
          {currentValue}
        </Text>
      </Box>
      <Spacer />
      <Box me="10px">
        <Text fontSize="md" color="gray.400" fontWeight="semibold">
          {""}
        </Text>
      </Box>
      {/* <Button p="0px" bg="transparent" variant="no-hover">
        <Flex alignItems="center" p="12px">
          <Icon as={logo} w="20px" h="auto" me="5px" />
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {format}
          </Text>
        </Flex>
      </Button> */}
    </Flex>
  );
};

export default VouchersRow;
