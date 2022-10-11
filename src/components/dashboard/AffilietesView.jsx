import { Box, Text, Stack, Heading, Flex, Button } from "@chakra-ui/react";
import Card from "./templates/Card";
import CardHeader from "./templates/CardHeader";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const AffiliatesView = () => {
  const { affiliates } = useSelector((state) => state.user.vendor);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const affiliatesCards = affiliates.map((affiliate) => {
    return (
      <CardHeader mt={4} key={affiliate.id}>
        <Text fontSize="lg" fontWeight="bold">
          {affiliate.name}
        </Text>
        <Text fontSize={"small"} fontWeight="bold">
          Primary email:{" "}
          <Box as="span" fontWeight="normal">
            {affiliate.primary_email}
          </Box>
        </Text>
      </CardHeader>
    );
  });
  return (
    <Stack>
      <Card
        data-cy="venue-info"
        p="22px"
        my={{ sm: "24px", lg: "0px" }}
        ms={{ sm: "0px", lg: "24px" }}
      >
        <Flex justify="space-between" align="top" mb="1rem" w="100%">
          {affiliates && (
            <Box>
              <Heading as="h2" size={"lg"}>
                {t("venue.affiliate.heading")}
              </Heading>
              {affiliates.length >= 1 ? (
                affiliatesCards
              ) : (
                <Text>
                  You haven't added any affiliates to your network yet
                </Text>
              )}
            </Box>
          )}
          <Box>
            <Button
              onClick={() => navigate("/dashboard/venue/affiliate/add")}
              data-cy="affiliate-add-button"
              variant={"outline"}
              fontSize={"sm"}
              fontWeight={600}
              colorScheme="pink"
              p="8px 32px"
            >
              <FiPlus />
            </Button>
          </Box>
        </Flex>
      </Card>
    </Stack>
  );
};

export default AffiliatesView;
