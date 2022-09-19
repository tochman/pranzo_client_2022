import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  useColorMode,
} from "@chakra-ui/react";
import Logo from "../content/Logo";
import { FlagIcon } from "react-flag-kit";
import { FiMoon } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const {  toggleColorMode } = useColorMode();
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
      <Container
        as={Stack}
        maxW={"8xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Logo />
        <Text fontSize="sm">{t("footer.slogan")}</Text>
        {/* <Text fontSize='sm'>Voucher And Gift Card Management Made Easy</Text> */}

        <Stack direction={"row"} spacing={3}>
          <Box h="24px">
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
          <Box h="24px">
            <FiMoon
              style={{cursor: "pointer" }}
              onClick={toggleColorMode}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
