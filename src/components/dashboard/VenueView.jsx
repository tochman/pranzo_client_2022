import {
  Box,
  Text,
  Stack,
  Flex,
  Button,
  Heading,
  Image,
} from "@chakra-ui/react";
import Card from "./templates/Card";
import CardHeader from "./templates/CardHeader";
import CardBody from "./templates/CardBody";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiEdit3 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const VenueView = () => {
  const { vendor } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Stack>
      <Card
        data-cy="venue-info"
        p="22px"
        my={{ sm: "24px", lg: "0px" }}
        ms={{ sm: "0px", lg: "24px" }}
      >
        {vendor && (
          <>
            <Flex justify="space-between" align="top" mb="1rem" w="100%">
              <Box>
                <Heading as="h2" size={"lg"}>
                  {t("dashboard.headings.myVenue")}
                </Heading>
                <Image
                  src={vendor.logotype}
                  width={"200px"}
                  height={"auto"}
                  paddingTop={5}
                />
                <CardHeader mt={4}>
                  <Text fontSize="lg" fontWeight="bold">
                    {vendor.name}
                  </Text>
                  <Text fontSize="lg">{vendor.legal_name}</Text>
                  <Text fontSize={"small"} fontWeight="bold">
                    {t("venue.formElements.primaryEmail") + ": "}
                    <Box as="span" fontWeight="normal">
                      {vendor.primary_email}
                    </Box>
                  </Text>
                </CardHeader>
              </Box>
              <Button
                onClick={() =>
                  navigate("/dashboard/venue/setup", { state: { edit: true } })
                }
                data-cy="venue-edit-button"
                variant={"outline"}
                fontSize={"sm"}
                fontWeight={600}
                colorScheme="pink"
                p="8px 32px"
              >
                <FiEdit3 />
              </Button>
            </Flex>
            <CardBody>
              <Text>{vendor.description}</Text>
            </CardBody>
          </>
        )}
      </Card>
    </Stack>
  );
};

export default VenueView;
