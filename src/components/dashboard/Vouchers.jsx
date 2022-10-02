import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  TableContainer,
  Icon,
  Collapse,
  Container,
  Button,
  VStack,
  HStack,
  Hide,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import _ from "lodash";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiCheck } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";
import QrCodePopup from "@jimengio/qrcode-popup/lib/qrcode-popup";

import { FaRegMoneyBillAlt } from "react-icons/fa";
import Transactions from "./Transactions";
import VoucherActions from "./VoucherActions";
import { useTranslation } from "react-i18next";

const Vouchers = () => {
  const { t } = useTranslation();
  const { vouchers } = useSelector((state) => state.user);
  const [isOpen, setOpen] = useState({});
  const [isModalOpen, setModalOpen] = useState({});
  const [activeVouchers, setActiveVouchers] = useState([]);
  const [, setShowScanner] = useState(false);
  const [showInactive, setShowInactive] = useState(false);

  let initialRowState = [];
  let initialModalState = [];
  useEffect(() => {
    setActiveVouchers(vouchers);
    activeVouchers.forEach((voucher) => {
      initialRowState.push({ [voucher.code]: false });
      initialModalState.push({ [voucher.code]: false });
    });
    setOpen(initialRowState);
    setModalOpen(initialModalState);
  }, [vouchers]);

  const filterVouchers = (code, options = {}) => {
    let filteredVouchers = vouchers.filter((voucher) => voucher.code === code);
    if (filteredVouchers.length) {
      setActiveVouchers(filteredVouchers);
    }
    if (code === "") {
      setActiveVouchers(vouchers);
    }
    if (options.source === "scanner") {
      setShowScanner(false);
    }
    return null;
  };

  const toggleModal = (voucher) => {
    let status = _.mapValues(setModalOpen, () => false);
    setModalOpen({ ...status, [voucher.code]: !isModalOpen[voucher.code] });
  };

  const modals = activeVouchers.map((voucher) => {
    return (
      <>
        {isModalOpen[voucher.code] && (
          <VoucherActions
            isModalOpen={isModalOpen[voucher.code]}
            toggleModal={toggleModal}
            voucher={voucher}
            action={voucher.active ? "createTransaction" : "activateVoucher"}
          />
        )}
      </>
    );
  });

  const rows = activeVouchers.map((voucher) => {
    const icon =
      voucher.variant == "servings" ? (
        <AiOutlineNumber />
      ) : (
        <FaRegMoneyBillAlt />
      );
    if (voucher.active === !showInactive) {
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
                        {t("dashboard.content.vouchers.labels.owner")}
                        {voucher.email
                          ? voucher.email
                          : t("dashboard.content.vouchers.labels.presenter")}
                      </Text>
                      <Button
                        data-cy={`${voucher.code}-cta`}
                        alignSelf={"left"}
                        variant="outline"
                        colorScheme="pink"
                        size="sm"
                        onClick={() => toggleModal(voucher)}
                      >
                        {t(
                          "dashboard.content.vouchers.labels.createTransaction"
                        )}
                      </Button>
                    </>
                  ) : (
                    <Button
                      data-cy={`${voucher.code}-cta`}
                      alignSelf={"left"}
                      variant="outline"
                      colorScheme="pink"
                      size="sm"
                      // This click needs to trigger the activation
                      onClick={() => toggleModal(voucher)}
                    >
                      {t("dashboard.content.vouchers.labels.activate")}
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
        </React.Fragment>
      );
    }
  });

  return (
    <>
      <Box maxW={{ base: "90vw", xs: "100vw" }} mt={5} mb={5} mr={2} ml={2}>
        <HStack>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="voucher-status" mb="0">
              {t("dashboard.content.vouchers.labels.showInactive")}
            </FormLabel>
            <Switch
              id="voucher-status"
              data-cy="voucher-status"
              onChange={() => setShowInactive(!showInactive)}
            />
          </FormControl>
          {!showInactive && (
            <QrCodePopup
              onDetect={(code) => {
                filterVouchers(code, { source: "scanner" });
              }}
            >
              <Button colorScheme="teal" size="lg" data-cy="scan">
                Scan Voucher
              </Button>
            </QrCodePopup>
          )}
        </HStack>
        <TableContainer width={{ xs: "100%" }} mr={{xs: 0}} ml={{xs: 0}}>
          <Table variant="simple" data-cy="vouchers-index">
            <Thead>
              <Tr>
                <Th>{t("dashboard.content.vouchers.table.code")}</Th>
                <Hide below={"md"}>
                  <Th>{t("dashboard.content.vouchers.table.active")}</Th>
                  <Th>{t("dashboard.content.vouchers.table.variant")}</Th>
                  <Th>{t("dashboard.content.vouchers.table.initialValue")}</Th>
                </Hide>
                <Th>{t("dashboard.content.vouchers.table.currentValue")}</Th>
                <Th maxWidth={{ sm: "10%" }}>{""}</Th>
              </Tr>
            </Thead>
            <Tbody>{rows}</Tbody>
          </Table>
        </TableContainer>
      </Box>
      {modals}
    </>
  );
};

export default Vouchers;
