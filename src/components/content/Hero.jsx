import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Logo from "./Logo";

const Hero = () => {
  return (
    <Stack
      data-cy="hero-section"
      minH={"50vh"}
      direction={{ base: "column", md: "row" }}
    >
      <Flex
        p={8}
        flex={1}
        align={"center"}
        justify={"center"}
        h={{ base: "100%", sm: "400px", lg: "500px" }}
      >
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Logo width={"250px"} />
          <Heading fontSize={{ base: "3xl", md: "2xl", lg: "3xl" }}>
            <Text as={"span"} position={"relative"}>
              Simplify your sales - Increase your revenue
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Making voucher and gift card management easy. Pranzo offers a
            simple and easy-to-use solution for creating, selling and
            administering lunch cards.

          </Text>

          <Heading fontSize={{ base: "1xl", md: "1xl", lg: "1xl" }}>
            <Text as={"span"} position={"relative"}>
            Low start-up fee and no subscriptions costs. Pay as you go!
            </Text>
          </Heading>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          fit={"cover"}
          align={"center"}
          w={"100%"}
          h={{ base: "100%", sm: "400px", lg: "500px" }}
          alt={"Example Project"}
          objectFit={"cover"}
          src={"https://source.unsplash.com/random/?restaurant"}
        />
      </Flex>
    </Stack>
  );
};

export default Hero;
