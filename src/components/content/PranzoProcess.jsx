import {
  Container,
  Heading,
  Stack,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";
import Card from "../dashboard/templates/Card";
import CardBody from "../dashboard/templates/CardBody";
import CardHeader from "../dashboard/templates/CardHeader";
import TimelineRow from "../dashboard/templates/TimelineRow";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const data = [
  {
    logo: FiCheck,
    title: {
      GB: "Register an personal account",
      SE: "Skapa ett användarkonto",
    },
    date: {
      GB: "Creating an account with Pranzo is the first step to be able to use our services.",
      SE: "Att skapa ett konto hos Pranzo är det första steget för att kunna använda våra tjänster.",
    },
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: { GB: "Add your venue", SE: "Lägg till ditt företag" },
    date: {
      GB: "Are you running a restaurant, a street food truck or a beauty salon? We need to know so we can provide you with the best possible service.",
      SE: "Driver du en restaurang, en street food truck eller en skönhetssalong? Vi behöver veta så att vi kan ge dig bästa möjliga service.",
    },
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: {
      GB: "Configure your cards and offerings",
      SE: "Sätt upp dina kort och erbjudanden",
    },
    date: {
      GB: "You can choose to use our out-of-the box solutions or customize your card design, values, etc.",
      SE: "Du kan välja att använda våra färdiga lösningar eller anpassa din kortdesign, värden och mer.",
    },
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: {
      GB: "Take it for a spin",
      SE: "Ta dina Pranzo-kort på en testrunda",
    },
    date: {
      GB: "Learn the process of issuing new cards and handling them with your customers.",
      SE: "Lär dig processen för att utfärda nya kort och hantera dem med dina kunder.",
    },
    color: "pink.300",
  },
  {
    logo: FiCheck,
    title: { GB: "Reports", SE: "Rapporter" },
    date: {
      GB: "Are daily or weekly usage reports the right thing for your reporting requirements? You choose, we deliver.",
      SE: "Är dagliga eller veckovisa användningsrapporter det rätta för dina rapporteringskrav? Du väljer, vi levererar.",
    },
    color: "pink.300",
  },
];

const PranzoProcess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Container maxW={"7xl"} p="5">
      <Card maxH="100%">
        <CardHeader p="22px 0px 35px 14px">
          <Flex direction="column">
            <Heading as="h1">
              {t("sellingPoints.pranzoExperience.header")}
            </Heading>
            <Text>{t("sellingPoints.pranzoExperience.subHeader")}</Text>
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
      <Stack
        pt={0}
        pb={"40px"}
        align={"center"}
        ml={{ base: 2, md: 20 }}
        mr={{ base: 2, md: 20 }}
      >
        <Button
          colorScheme="pink"
          size={"lg"}
          width="100%"
          style={{ outline: "none", borderColor: "transparent" }}
          data-cy="join-pranzo-sign-up-cta"
          onClick={() => navigate("/auth/sign-up")}
          mb={"20px"}
        >
          {t("appBar.signUp")}
        </Button>
      </Stack>
    </Container>
  );
};

export default PranzoProcess;
