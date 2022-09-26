import {
  Text,
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Box,
  TableContainer,
  useColorModeValue,
  useDisclosure,
  Accordion,
  Icon,
  Collapse,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiCheck } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import Transactions from "./templates/Transactions";

const Vouchers = () => {
  const { vouchers } = useSelector((state) => state.user);
  const textColor = useColorModeValue("gray.700", "white");
  const [isOpen, setOpen] = useState({});
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: onModalClose,
  } = useDisclosure();

  let initialRowState = [];
  useEffect(() => {
    vouchers.forEach((voucher) =>
      initialRowState.push({ [voucher.code]: false })
    );
    setOpen(initialRowState);
  }, [vouchers]);

  const rows = vouchers.map((voucher) => {
    const icon =
      voucher.variant === "servings" ? (
        <AiOutlineNumber />
      ) : (
        <FaRegMoneyBillAlt />
      );
    return (
      <React.Fragment key={voucher.code}>
        <Tr
          onClick={() =>
            setOpen({ ...isOpen, [voucher.code]: !isOpen[voucher.code] })
          }
        >
          <Td>{voucher.code}</Td>
          <Td>{voucher.active && <FiCheck />}</Td>
          <Td>{icon}</Td>
          <Td>{voucher.value}</Td>
          <Td>{voucher.current_value}</Td>
          <Td>
            {!voucher.transactions.length == 0 && (
              <Icon
                as={ChevronDownIcon}
                transition={"all .25s ease-in-out"}
                transform={isOpen[voucher.code] ? "rotate(180deg)" : ""}
                w={6}
                h={6}
              />
            )}
          </Td>
        </Tr>
        <Tr>
          <td colSpan="6">
            <Collapse in={isOpen[voucher.code]} animateOpacity>
              <HStack m={{ base: 2 }} spacing={4}>
                <Text as={"small"}>
                  Holder: {voucher.email ? voucher.email : "holder"}
                </Text>
                <Button
                  alignSelf={"left"}
                  variant="outline"
                  colorScheme="pink"
                  size="sm"
                  onClick={() => openModal()}
                >
                  Create transaction
                </Button>
              </HStack>
              <Transactions transactions={voucher.transactions} />
            </Collapse>
          </td>
        </Tr>
        <Modal isCentered isOpen={isModalOpen}>
          <ModalOverlay
            bg="blackAlpha.300"
            backdropInvert="80%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>Code: {voucher.code} - {voucher.variant}</ModalHeader>
            <ModalCloseButton
              onClick={() => {
                onModalClose();
              }}
            />
            <ModalBody>

              { voucher.variant == 'servings' ? <Text>Servings voucher  actions</Text> : <Text>Cash voucher actions</Text>}
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => {
                  onModalClose();
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </React.Fragment>
    );
  });

  return (
    <>
      <Box m={{ base: 5 }}>
        <TableContainer>
          <Table variant="simple" colorScheme="pink">
            <Thead>
              <Tr>
                <Th>Code</Th>
                <Th>Active</Th>
                <Th>Variant</Th>
                <Th>Initial Value</Th>
                <Th>Current Value</Th>
                <Th>{""}</Th>
              </Tr>
            </Thead>
            <Tbody>{rows}</Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Vouchers;
