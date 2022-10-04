import { Box, Flex, Spacer, Text, useColorModeValue } from "@chakra-ui/react";

const VouchersRow = ({ code, active, value, currentValue }) => {
  const textColor = useColorModeValue("gray.700", "white");

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
    </Flex>
  );
};

export default VouchersRow;
