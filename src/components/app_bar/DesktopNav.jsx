import {
  Box,
  Stack,
  Link,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DesktopSubNav from "./DesktopSubNav";

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { vendor, authenticated } = useSelector((state) => state.user);

  return (
    <Stack direction={"row"} spacing={4} data-cy="navigation-items">
      <Box data-cy="my-venue">
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Link
              p={2}
              fontSize={"sm"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              {t("dashboard.headings.myVenue")}
            </Link>
          </PopoverTrigger>

          <PopoverContent
            border={0}
            boxShadow={"xl"}
            bg={popoverContentBgColor}
            p={4}
            rounded={"xl"}
            minW={"sm"}
          >
            <Stack>
              {authenticated && (
                <>
                  {vendor && (
                    <DesktopSubNav
                      {...{
                        dataCy: "venue-details",
                        href: "/dashboard/venue",
                      }}
                    >
                      <Text
                        transition={"all .3s ease"}
                        _groupHover={{ color: "pink.400" }}
                        fontWeight={500}
                      >
                        {t("dashboard.headings.detailsVenue.label")}
                      </Text>
                      <Text fontSize={"sm"}>
                        {t("dashboard.headings.detailsVenue.subLabel")}
                      </Text>
                    </DesktopSubNav>
                  )}
                  <DesktopSubNav
                    {...{
                      dataCy: "venue-setup",
                      href: "/dashboard/venue/setup",
                    }}
                  >
                    <Text
                      transition={"all .3s ease"}
                      _groupHover={{ color: "pink.400" }}
                      fontWeight={500}
                    >
                      {vendor
                        ? t("dashboard.headings.editVenue.label")
                        : t("dashboard.headings.setupVenue.label")}
                    </Text>
                    <Text fontSize={"sm"}>
                      {vendor
                        ? t("dashboard.headings.editVenue.subLabel")
                        : t("dashboard.headings.setupVenue.subLabel")}
                    </Text>
                  </DesktopSubNav>
                </>
              )}
            </Stack>
          </PopoverContent>
        </Popover>
      </Box>
      {vendor && authenticated && (
        <Box data-cy="vouchers">
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {t("dashboard.headings.vouchers")}
              </Link>
            </PopoverTrigger>
            <PopoverContent
              border={0}
              boxShadow={"xl"}
              bg={popoverContentBgColor}
              p={4}
              rounded={"xl"}
              minW={"sm"}
            >
              <Stack>
                {authenticated && vendor && (
                  <DesktopSubNav
                    {...{
                      dataCy: "voucher-management",
                      href: "/dashboard/vouchers",
                    }}
                  >
                    <Text
                      transition={"all .3s ease"}
                      _groupHover={{ color: "pink.400" }}
                      fontWeight={500}
                    >
                      {t("dashboard.headings.viewAndManage.label")}
                    </Text>
                    <Text fontSize={"sm"}>
                      {t("dashboard.headings.viewAndManage.subLabel")}
                    </Text>
                  </DesktopSubNav>
                )}
              </Stack>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </Stack>
  );
};

export default DesktopNav;
