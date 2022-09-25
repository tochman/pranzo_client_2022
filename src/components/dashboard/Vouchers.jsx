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
  Box,
  TableContainer,
  useColorModeValue,
  useDisclosure,
  Accordion,
  Icon,
  Collapse,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FiCheck } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";

import { FaRegMoneyBillAlt }  from "react-icons/fa";
import Transactions from "./templates/Transactions";

const Vouchers = () => {
  const { vouchers } = useSelector((state) => state.user);
  const textColor = useColorModeValue("gray.700", "white");
  const [isOpen, setOpen] = useState({});
  let initialRowState = [];
  useEffect(() => {
    vouchers.forEach((voucher) =>
      initialRowState.push({ [voucher.code]: false })
    );
    setOpen(initialRowState);
  }, [vouchers]);

  const rows = vouchers.map((voucher) => {
    const icon = voucher.variant === 'servings' ? <AiOutlineNumber /> : <FaRegMoneyBillAlt />
    return (
      <React.Fragment  key={voucher.code} >
        <Tr
         
          onClick={() =>
            setOpen({ ...isOpen, [voucher.code]: !isOpen[voucher.code] })
          }
        >
          <Td>{voucher.code}</Td>
          <Td>{voucher.active && <FiCheck />}</Td>
          <Td>{ icon}</Td>
          <Td>{voucher.value}</Td>
          <Td>{voucher.current_value}</Td>
          <Td>{voucher.email ? voucher.email : "holder"}</Td>
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
              <Transactions transactions={voucher.transactions} />
            </Collapse>
          </td>
        </Tr>
      </React.Fragment>
    );
  });

  return (
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
              <Th>Owner</Th>
              <Th>{""}</Th>
            </Tr>
          </Thead>
          <Tbody>{rows}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Vouchers;
