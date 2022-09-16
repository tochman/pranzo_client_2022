import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaTrophy, FaChartPie, FaMoneyBillAlt } from "react-icons/fa";

const Testimonial = ({ children }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({ src, name, title, component }) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      {src && <Avatar src={src} alt={name} mb={2} />}

      <Stack spacing={-1} align={"center"}>
        {component}
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function SellingPoints() {
  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} pt={16} pb={24} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>Benefits</Heading>
          <Text>Let's move away from manual work</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Customer Loyalty</TestimonialHeading>
              <TestimonialText>
                Reward your loyal lunch guests with the opportunity to buy a
                lunch-card that gives them a discounted price while you benefit
                from increased and steady revenue.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar component={<FaTrophy size={"52"} />} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Build on your reputation</TestimonialHeading>
              <TestimonialText>
                It takes time to build a loyal customer base. As a restaurateur,
                you know this very well. Your creativity and hard work in the
                kitchen, together with the service your restaurant offers, lays
                the foundation for satisfied and returning guests.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar component={<FaChartPie size={"52"} />} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Financial control</TestimonialHeading>
              <TestimonialText>
                With Pranzo, your reporting and financial control becomes more
                managable, giving you an easy overview of sales and insights
                into effectivnes of your outreach and marketing.
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar component={<FaMoneyBillAlt size={"52"} />} />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
