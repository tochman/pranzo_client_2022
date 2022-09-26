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
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Hide,
} from "@chakra-ui/react";
import _ from "lodash";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiCheck } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import Transactions from "./Transactions";
import ServingsVoucherActions from "./ServingsVoucherActions";
import CashVoucherActions from "./CashVoucherActions";

const Vouchers = () => {
  const { vouchers } = useSelector((state) => state.user);
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
          data-cy={voucher.code}
          onClick={() => {
            let status = _.mapValues(setOpen, () => false);
            setOpen({ ...status, [voucher.code]: !isOpen[voucher.code] });
          }}
          style={{ cursor: "pointer" }}
        >
          <Td>{voucher.code}</Td>
          <Hide below="md">
            <Td>{voucher.active && <FiCheck />}</Td>
            <Td>{icon}</Td>
            <Td>{voucher.value}</Td>
          </Hide>
          <Td>{voucher.current_value}</Td>
          <Td>
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen[voucher.code] ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          </Td>
        </Tr>
        <Tr>
          <td colSpan="5">
            <Collapse in={isOpen[voucher.code]} animateOpacity>
              <VStack m={{ base: 2 }} spacing={4}>
                {voucher.active ? (
                  <>
                    <Text as={"small"} data-cy={`${voucher.code}-holder`}>
                      Holder: {voucher.email ? voucher.email : "holder"}
                    </Text>
                    <Button
                      data-cy={`${voucher.code}-cta`}
                      alignSelf={"left"}
                      variant="outline"
                      colorScheme="pink"
                      size="sm"
                      onClick={() => openModal()}
                    >
                      Create transaction
                    </Button>
                  </>
                ) : (
                  <Button
                    data-cy={`${voucher.code}-cta`}
                    alignSelf={"left"}
                    variant="outline"
                    colorScheme="pink"
                    size="sm"
                    onClick={() => openModal()}
                  >
                    Activate
                  </Button>
                )}
              </VStack>
              {voucher.transactions != 0 && (
                <Transactions
                  code={voucher.code}
                  transactions={voucher.transactions}
                />
              )}
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
            <ModalHeader>
              Code: {voucher.code} - {voucher.variant}
            </ModalHeader>
            <ModalCloseButton
              onClick={() => {
                onModalClose();
              }}
            />
            <ModalBody>
              {voucher.variant == "servings" ? (
                <ServingsVoucherActions />
              ) : (
                <CashVoucherActions />
              )}
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
      <Box m={{ base: 5, sm: 0, xs: 0 }}>
        <TableContainer width={{sm: '100%'}}>
          <Table variant="simple" colorScheme="pink">
            <Thead>
              <Tr>
                <Th>Code</Th>
                <Hide below={'md'}>
                  <Th>Active</Th>
                  <Th>Variant</Th>
                  <Th>Initial Value</Th>
                </Hide>
                <Th>Current Value</Th>
                <Th maxWidth={{sm: '10%'}}>{""}</Th>
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
