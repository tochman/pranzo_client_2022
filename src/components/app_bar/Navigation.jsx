import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Image,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import colorLogo from "../../assets/pranzo_color.png";
import whiteLogo from "../../assets/pranzo_white.png";
import { FlagIcon } from "react-flag-kit";
import { useTranslation } from "react-i18next";

// import { useSelector } from "react-redux";

const Navigation = () => {
  const { i18n } = useTranslation();
  const { isOpen, onToggle } = useDisclosure();
  // const { currentUser } = useSelector((state) => state.user);
  const currentUser = {};
  return (
    <Box data-cy="navigation-bar">
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <Image
              htmlWidth={"120px"}
              htmlHeight={"auto"}
              objectFit="fit"
              src={useColorModeValue(colorLogo, whiteLogo)}
            />
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {i18n.language === "GB" ? (
            <FlagIcon
              code="SE"
              size={24}
              data-cy="flag"
              style={{cursor: 'pointer'}}
              onClick={() => i18n.changeLanguage("SE")}
            />
          ) : (
            <FlagIcon
              code="GB"
              size={24}
              data-cy="flag"
              style={{cursor: 'pointer'}}
              onClick={() => i18n.changeLanguage("GB")}
            />
          )}
          <Box />

          {!currentUser && (
            <>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                href={"#"}
              >
                Sign In
              </Button>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"pink.400"}
                href={"#"}
                _hover={{
                  bg: "pink.300",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navigation;
