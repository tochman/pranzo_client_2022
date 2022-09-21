import {
  Box,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DesktopSubNav from "./DesktopSubNav";
import { NAV_ITEMS } from "./NAV_ITEMS";
import { VENDOR_NAV_ITEMS } from "./VENDOR_NAV_ITEMS";

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const location = useLocation()
  const popoverContentBgColor = useColorModeValue("white", "gray.800");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { vendor, authenticated } = useSelector((state) => state.user);
  const ITEMS = authenticated ? VENDOR_NAV_ITEMS : NAV_ITEMS;

  const labelHandler = (label) => {
    try {
      return eval(label);
    } catch {
      return label;
    }
  };
  return (
    <Stack direction={"row"} spacing={4} data-cy="navigation-items">
      {ITEMS.map((navItem) => (
        <Box key={navItem.label} data-cy={navItem.dataCy}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                onClick={() => navigate(navItem.href)}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {labelHandler(navItem.label)}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child, index) => {
                    if (child.condition) {
                      return eval(child.condition) ? (
                        <DesktopSubNav
                          key={index}
                          {...child}
                          labelHandler={labelHandler}
                        />
                      ) : null;
                    } else {
                      return (
                        <DesktopSubNav
                          key={index}
                          {...child}
                          labelHandler={labelHandler}
                        />
                      );
                    }
                  })}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
