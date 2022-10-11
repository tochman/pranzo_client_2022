import { Box, Text, Stack, Heading, Flex } from "@chakra-ui/react";
import Card from "./templates/Card";
import CardHeader from "./templates/CardHeader";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const UsersView = () => {
  const { users } = useSelector((state) => state.user.vendor);
  const { t } = useTranslation();
  const usersCards = users.map((user) => {
    return (
      <CardHeader mt={4} key={user.email}>
        <Text fontSize="lg" fontWeight="bold">
          {user.name}
        </Text>
        <Text fontSize={"small"} fontWeight="bold">
          Primary email:{" "}
          <Box as="span" fontWeight="normal">
            {user.email}
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
        {users && (
          <Flex justify="space-between" align="top" mb="1rem" w="100%">
            <Box>
              <Heading as="h2" size={"lg"}>
                {t("venue.user.heading")}
              </Heading>
              {usersCards}
            </Box>
            <Box>
              {/* Place CTA here */}
            </Box>
          </Flex>
        )}
      </Card>
    </Stack>
  );
};

export default UsersView;
