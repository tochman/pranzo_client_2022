import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const LargeQuote = () => {
  const { t } = useTranslation();

  return (
    <Stack
      bg={useColorModeValue("gray.50", "gray.800")}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={"center"}
      direction={"column"}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign={"center"}
        maxW={"3xl"}
        as={"i"}
      >
        {`"${t("testimonials.1.content")}"`}
      </Text>
      <Box textAlign={"center"}>
        <Avatar
          alt={"John Doe"}
          mb={2}
        />

        <Text fontWeight={600}>{t("testimonials.1.sender.name")}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          {t("testimonials.1.sender.title")}
        </Text>
      </Box>
    </Stack>
  );
};

export default LargeQuote;
