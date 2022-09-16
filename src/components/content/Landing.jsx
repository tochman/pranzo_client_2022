import { Button, Stack, Box, Text, useColorModeValue } from "@chakra-ui/react";
import Hero from "./Hero";
import LargeQuote from "./LargeQuote";
import SellingPoints from "./SellingPoints";

const Landing = () => {
  return (
    <>
      <Hero />
      <Box bg={useColorModeValue("white", "gray.700")}>
        <Stack pt={30} pb={10} align={"center"} ml={48} mr={48}>
          <Button colorScheme="pink" size={"lg"}>
            Get Started
          </Button>
          <Stack mt={20}>
            <Text>
              There's no upfront fee to register. We will charge you only if you
              actually benefit from the Pranzo plattform with a fee of €1 per
              issued voucher.
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
