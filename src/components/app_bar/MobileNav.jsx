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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@chakra-ui/icons";

import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileNav = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { vendor, authenticated } = useSelector((state) => state.user);

  const { t } = useTranslation();

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <>
        <Text
          data-cy="nothing-to-see"
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
            onClick={() => redirect("/auth/sign-in")}
            data-cy="sign-in-button"
          >
            {t("appBar.signIn")}
          </Button>
          <Button
            fontSize={"sm"}
            fontWeight={600}
            colorScheme="pink"
            width="100%"
            onClick={() => redirect("/auth/sign-up")}
            data-cy="sign-up-button"
          >
            {t("appBar.signUp")}
          </Button>
        </Stack>
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
                  onClick={() => redirect("/dashboard/venue")}
                  data-cy="venue-details-mobile"
                >
                  {t("dashboard.headings.detailsVenue.label")}
                </Link>
              )}
              <Link
                py={2}
                onClick={() => redirect("/dashboard/venue/setup")}
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
      {/* {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))} */}
    </Stack>
  );
};

export default MobileNav;
