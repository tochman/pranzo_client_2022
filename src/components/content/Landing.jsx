import { Button, Stack, Box, Text, useColorModeValue } from "@chakra-ui/react";
import Hero from "./Hero";
import LargeQuote from "./LargeQuote";
import SellingPoints from "./SellingPoints";
import { useTranslation } from "react-i18next";

const Landing = () => {
  const { t } = useTranslation();

  return (
    <>
      <Hero />
      <Box bg={useColorModeValue("white", "gray.700")}>
        <Stack pt={30} pb={10} align={"center"} ml={48} mr={48}>
          <Button colorScheme="pink" size={"lg"} style={{ outline: "none", borderColor: 'transparent' }}>
            {t("hero.buttonText")}
          </Button>
          <Stack mt={20}>
            <Text>{t("hero.ctaText")}
            </Text>
          </Stack>
        </Stack>
      </Box>
      <SellingPoints />
      <LargeQuote />
    </>
  );
};

export default Landing;
