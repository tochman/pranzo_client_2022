import {
  Box,
  Collapse,
  Container,
  Stack,
  Text,
  Center,
  HStack,
  Icon,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { FlagIcon } from "react-flag-kit";
import { FiMoon } from "react-icons/fi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Logo from "../content/Logo";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useCookieConsentContext } from "@use-cookie-consent/react";
import CookieBanner from "./CookieBanner";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { toggleColorMode } = useColorMode();
  const { isOpen, getDisclosureProps, getButtonProps } = useDisclosure();
  const { consent } = useCookieConsentContext();
  const navigate = useNavigate();
  const buttonProps = getButtonProps();
  const disclosureProps = getDisclosureProps();
  return (
    <Box
      data-cy="footer"
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
      pos="fixed"
      bottom="0"
      left="0"
      width={"100vw"}
    >
      {!consent.persistent && <CookieBanner />}
      <Container
        maxW={"8xl"}
        py={4}
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
      >
        <HStack data-cy="footer-logo">
          <Logo onClick={() => navigate("/")} />
          <Icon
            {...buttonProps}
            data-cy="toggle-footer-content-section"
            position={"absolute"}
            top={3}
            right={2}
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        </HStack>

        <Collapse
          data-cy="footer-content"
          in={isOpen}
          {...disclosureProps}
          animateOpacity
        >
          <Stack direction={"row"} spacing={3} justify={"center"}>
            <Box h="16px">
              {i18n.language === "GB" ? (
                <FlagIcon
                  code="SE"
                  style={{ cursor: "pointer" }}
                  size={20}
                  onClick={() => i18n.changeLanguage("SE")}
                />
              ) : (
                <FlagIcon
                  code="GB"
                  style={{ cursor: "pointer" }}
                  size={20}
                  onClick={() => i18n.changeLanguage("GB")}
                />
              )}
            </Box>
            <Box h="16px">
              <FiMoon style={{ cursor: "pointer" }} onClick={toggleColorMode} />
            </Box>
          </Stack>
          <Center>
            <Text fontSize="sm">{t("footer.slogan")}</Text>
          </Center>
          <Center>
            <Text fontSize="10px">{t("footer.slogan2")}</Text>
          </Center>
        </Collapse>
      </Container>
    </Box>
  );
};

export default Footer;
