import {
  Container,
  Heading,
  Box,
  Link,
  Image,
  HStack,
  Tag,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import Card from "../dashboard/templates/Card";
import CardBody from "../dashboard/templates/CardBody";
import CardHeader from "../dashboard/templates/CardHeader";
import TimelineRow from "../dashboard/templates/TimelineRow";

const data = [
  {
    logo: FiCheck,
    title: "Register an personal account",
    date: "Creating an account with Pranzo is the first step in your onboarding process.",
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: "Add your venue",
    date: "Are you running a restaurant, a street food truck or a beuty sallon? We need to know.",
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: "Configure your cards",
    date: "You can choose to use our out-of-the box solutions or customize your card design, values, etc.",
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: "Take it for a spin",
    date: "Learn the process of issuing new cards and handling them with your customers.",
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: "Reports",
    date: "Are daily or weekly reports of usage the right thing for your reporting requirements? You choose, we deliver.",
    color: "pink.300",
  },
];
const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://source.unsplash.com/random/?avatar"
        alt={` ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const PranzoProcess = () => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Container maxW={"7xl"} p="5">
      <Card maxH="100%">
        <CardHeader p="22px 0px 35px 14px">
          <Flex direction="column">
            <Heading as="h1">The Pranzo Experience</Heading>
            <Text>We keep it simple, for your benefit.</Text>
          </Flex>
        </CardHeader>
        <CardBody ps="20px" pe="0px" mb="31px" position="relative">
          <Flex direction="column">
            {data.map((row, index, arr) => {
              return (
                <TimelineRow
                  key={row.title}
                  logo={row.logo}
                  title={row.title}
                  date={row.date}
                  color={row.color}
                  index={index}
                  arrLength={arr.length}
                />
              );
            })}
          </Flex>
        </CardBody>
      </Card>
    </Container>
  );
};

export default PranzoProcess;
