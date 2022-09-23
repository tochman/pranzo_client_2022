import {
  Box,
  Flex,
  IconButton,
  Button,
  Collapse,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Avatar,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  HStack,
  Hide,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { FlagIcon } from "react-flag-kit";
import { FiMoon, FiUser, FiLogOut } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearSession } from "../../state/features/authentication";
import Logo from "../content/Logo";

const Navigation = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { i18n, t } = useTranslation();
  const { toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
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
          <HStack>
            <IconButton
              data-cy="mobile-nav-toggle"
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
            <Box pt={2} onClick={() => navigate("/")}>
              <Logo width={"110px"} onClick={() => navigate("/")} />
            </Box>
          </HStack>
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          display={{ base: "none", md: "flex" }}
        >
          <Box onClick={() => navigate("/")}>
            <Logo />
          </Box>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Flex alignItems={"center"}>
          <Hide below="md">
            <Box mr={4}>
              {i18n.language === "GB" ? (
                <FlagIcon
                  code="SE"
                  size={20}
                  data-cy="flag"
                  style={{ cursor: "pointer" }}
                  onClick={() => i18n.changeLanguage("SE")}
                />
              ) : (
                <FlagIcon
                  code="GB"
                  size={20}
                  data-cy="flag"
                  style={{ cursor: "pointer" }}
                  onClick={() => i18n.changeLanguage("GB")}
                />
              )}
            </Box>
            <Box mr={4}>
              <FiMoon style={{ cursor: "pointer" }} onClick={toggleColorMode} />
            </Box>
          </Hide>
          {!currentUser ? (
            <>
              <Hide below={"md"}>
                <Box mr={4}>
                  <Button
                    as={"a"}
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    onClick={() => navigate("/auth/sign-in")}
                    data-cy="sign-in-button"
                  >
                    {t("appBar.signIn")}
                  </Button>
                </Box>
                <Box mr={4}>
                  <Button
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    colorScheme="pink"
                    onClick={() => navigate("/auth/sign-up")}
                    data-cy="sign-up-button"
                  >
                    {t("appBar.signUp")}
                  </Button>
                </Box>
              </Hide>
            </>
          ) : (
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                data-cy="user-avatar"
              >
                <Avatar
                  size={"sm"}
                  src={"https://source.unsplash.com/random/?avatar"}
                />
              </MenuButton>
              <MenuList>
                <HStack>
                  <MenuItem
                    data-cy="user-name"
                    style={{ outline: "none", borderColor: "transparent" }}
                  >
                    <FiUser />
                    <Box pl={2}>{currentUser.name}</Box>
                  </MenuItem>
                </HStack>

                <MenuDivider />

                <HStack>
                  <MenuItem
                    onClick={() => {
                      dispatch(clearSession({}));
                    }}
                    data-cy="end-session"
                    style={{ outline: "none", borderColor: "transparent" }}
                  >
                    <FiLogOut />
                    <Box pl={2}>Log out</Box>
                  </MenuItem>
                </HStack>
              </MenuList>
            </Menu>
          )}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav toggleMainNavBar={onToggle} />
      </Collapse>
    </Box>
  );
};

export default Navigation;
