import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";

const TimelineRow = ({ logo, title, date, color, index, arrLength }) => {
  const textColor = useColorModeValue("gray.700", "white.300");
  const bgIconColor = useColorModeValue("white.300", "gray.700");

  return (
    <Flex alignItems="center" minH="78px" justifyContent="start" mb={{ base: '15px', sm: '1px'}}>
      <Flex direction="column" h="100%" alignItems={'start'}>
        <Icon
          as={logo}
          bg={bgIconColor}
          color={color}
          h={"30px"}
          w={"26px"}
          mt={3}
          pe="6px"
          zIndex="1"
          position="relative"
        />
        <Box
          data-cy="side"
          w="2px"
          bg="gray.200"
          ml={2}
          h={index === arrLength - 1 ? "15px" : "30"}
        ></Box>
      </Flex>
      <Flex direction="column" justifyContent="flex-start" h="100%">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="md" fontWeight="normal">
          {date}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TimelineRow;
