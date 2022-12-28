import {
  Button,
  Stack,
  Heading,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useCookieConsentContext } from "@use-cookie-consent/react";
import { useTranslation } from "react-i18next";
import Content from "../elements/Content";

const CookieBanner = () => {
  const { t } = useTranslation();
  const { acceptAllCookies, declineAllCookies, acceptCookies } =
    useCookieConsentContext();

  return (
    <Alert data-cy="cookie-banner">
      <AlertIcon />
      <Stack spacing={2} direction={{ base: "column", md: "row" }}>
        <Box>
          <Heading size={"md"}>{t("gdpr.mainHeader")}</Heading>
          <Content size="sm">{t("gdpr.mainMessage")}</Content>
        </Box>
        <Stack
          direction={{ base: "row", md: "column" }}
          spacing={{ base: 1, sm: 4, md: 1 }}
        >
          <Button
            size={"sm"}
            colorScheme="orange"
            variant="solid"
            onClick={acceptAllCookies}
          >
            {t("gdpr.acceptAll")}
          </Button>
          <Button
            size={"sm"}
            colorScheme="orange"
            variant="outline"
            onClick={declineAllCookies}
          >
            {t("gdpr.rejectAll")}
          </Button>
        </Stack>
      </Stack>
    </Alert>
  );
};

export default CookieBanner;
