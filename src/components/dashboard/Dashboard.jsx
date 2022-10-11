import { Box, Stack, Text, Button, Divider } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AffiliatesView from "./AffilietesView";
import UsersView from "./UsersView";
import VenueView from "./VenueView";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { vendor } = useSelector((state) => state.user);
  return (
    <Stack spacing={8} m={1}>
      <Box p={5} mb={"40px"}>
        {!vendor ? (
          <>
            <Text mb={2}>
              {t("dashboard.headings.setupVenue.subLabelLong")}
            </Text>
            <Button
              onClick={() => navigate("/dashboard/venue/setup")}
              data-cy="venue-edit-button"
              variant={"outline"}
              fontSize={"sm"}
              fontWeight={600}
              colorScheme="pink"
              p="8px 32px"
            >
              {t("dashboard.headings.setupVenue.label")}
            </Button>
          </>
        ) : (
          <>
            <VenueView />
            {vendor.users && (
              <>
                <Divider />
                <UsersView />
              </>
            )}
            {vendor.affiliates && (
              <>
                <Divider />
                <AffiliatesView />
              </>
            )}
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Dashboard;
