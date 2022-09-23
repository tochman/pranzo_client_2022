import {
  Stack,
  Flex,
  Text,
  Link,
  Icon,
  Collapse,
  Box,
  Button,
  useColorModeValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FlagIcon } from "react-flag-kit";
import { FiMoon } from "react-icons/fi";

const MobileNav = ({ toggleMainNavBar }) => {
  const { vendor, authenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const { t, i18n } = useTranslation();

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <>
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
            <FiMoon style={{ cursor: "pointer" }} onClick={toggleColorMode} />
          </Box>
        </Stack>
        {!authenticated && (
          <>
            <Text
              data-cy="nothing-to-see"
              align={"center"}
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              {t("appBar.nothingToSeeHere")}
            </Text>
            <Stack>
              <Button
                fontSize={"sm"}
                fontWeight={400}
                variant={"outline"}
                width="100%"
                onClick={() => {
                  navigate("/auth/sign-in", { replace: true });
                  toggleMainNavBar();
                }}
                data-cy="sign-in-button-mobile"
              >
                {t("appBar.signIn")}
              </Button>
              <Button
                fontSize={"sm"}
                fontWeight={600}
                colorScheme="pink"
                width="100%"
                onClick={() => {
                  navigate("/auth/sign-up", { replace: true });
                  toggleMainNavBar();
                }}
                data-cy="sign-up-button-mobile"
              >
                {t("appBar.signUp")}
              </Button>
            </Stack>
          </>
        )}
      </>
      <Stack spacing={4} onClick={onToggle}>
        <Flex
          py={2}
          as={Link}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
          data-cy={"my-venue-mobile"}
        >
          {authenticated && (
            <>
              <Text
                fontWeight={600}
                color={useColorModeValue("gray.600", "gray.200")}
              >
                {t("dashboard.headings.myVenue")}
              </Text>
              <Icon
                as={ChevronDownIcon}
                transition={"all .25s ease-in-out"}
                transform={isOpen ? "rotate(180deg)" : ""}
                w={6}
                h={6}
              />
            </>
          )}
        </Flex>
        {authenticated && (
          <Collapse
            in={isOpen}
            animateOpacity
            style={{ marginTop: "0!important" }}
          >
            <Stack
              mt={2}
              pl={4}
              borderLeft={1}
              borderStyle={"solid"}
              borderColor={useColorModeValue("gray.200", "gray.700")}
              align={"start"}
            >
              {vendor && (
                <Link
                  py={2}
                  onClick={() => {
                    navigate("/dashboard/venue", { replace: true });
                    toggleMainNavBar();
                  }}
                  data-cy="venue-details-mobile"
                >
                  {t("dashboard.headings.detailsVenue.label")}
                </Link>
              )}
              <Link
                py={2}
                onClick={() => {
                  navigate("/dashboard/venue/setup", { replace: true });
                  toggleMainNavBar();
                }}
                data-cy="venue-setup-mobile"
              >
                {vendor
                  ? t("dashboard.headings.editVenue.label")
                  : t("dashboard.headings.setupVenue.label")}
              </Link>
            </Stack>
          </Collapse>
        )}
      </Stack>
    </Stack>
  );
};

export default MobileNav;
