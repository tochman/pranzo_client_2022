import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const TimelineRow = ({ logo, title, date, color, index, arrLength }) => {
  const textColor = useColorModeValue("gray.700", "white.300");
  const bgIconColor = useColorModeValue("white.300", "gray.700");
  const { i18n } = useTranslation();
  return (
    <Flex
      alignItems="center"
      minH="78px"
      justifyContent="start"
      mb={{ base: "15px", sm: "1px" }}
    >
      <Flex direction="column" h="100%" alignItems={"start"}>
        <Icon
          as={logo}
          bg={bgIconColor}
          color={color}
          h={{ base: "30px" }}
          w={{ base: "26px" }}
          mt={1}
          ml="-15px"
          pe="6px"
          zIndex="1"
          position="relative"
        />
        <Box
          data-cy="side"
          w="2px"
          bg="gray.200"
          // ml={2}
          ml="-7px"
          h={index === arrLength - 1 ? "15px" : "30"}
        ></Box>
      </Flex>
      <Flex direction="column" justifyContent="start" h="100%">
        <Text fontSize="lg" color={textColor} fontWeight="bold">
          {title[i18n.language] || title}
        </Text>
        <Text fontSize="md" fontWeight="normal">
          {date[i18n.language] || date}
        </Text>
      </Flex>
    </Flex>
  );
};

export default TimelineRow;
