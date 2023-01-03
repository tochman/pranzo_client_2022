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
import { FiActivity, FiUsers, FiThumbsUp } from "react-icons/fi";
import { useTranslation } from "react-i18next";

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

const SellingPoints = () => {
  const { t } = useTranslation();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.700")}>
      <Container maxW={"7xl"} pt={16} pb={24} as={Stack} spacing={12}>
        <Stack spacing={0} align={"center"}>
          <Heading>{t("sellingPoints.benefits")}</Heading>
          <Text>{t("sellingPoints.subSlogan")}</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {t("sellingPoints.right.header")}
              </TestimonialHeading>
              <TestimonialText>
                {t("sellingPoints.right.content")}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar component={<FiThumbsUp size={"52"} />} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {t("sellingPoints.middle.header")}
              </TestimonialHeading>
              <TestimonialText>
                {t("sellingPoints.middle.content")}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar component={<FiUsers size={"52"} />} />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>
                {t("sellingPoints.left.header")}
              </TestimonialHeading>
              <TestimonialText>
                {t("sellingPoints.left.content")}
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar component={<FiActivity size={"52"} />} />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
};

export default SellingPoints;
