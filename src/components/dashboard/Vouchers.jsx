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
} from "@chakra-ui/react";


import React from "react";
import { useSelector } from "react-redux";
import { FiCheck } from "react-icons/fi";
import Transactions from "./templates/Transactions";

const Vouchers = () => {
  const { vouchers } = useSelector((state) => state.user);
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Box m={{ base: 5 }}>
      <TableContainer>
        <Table variant="striped" colorScheme="pink">
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th>Active</Th>
              <Th>Initial Value</Th>
              <Th>Current Value</Th>
              <Th>Owner</Th>
              <Th>{""}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vouchers.map((voucher) => {
              return (
                  <Tr>
                    <Td>{voucher.code}</Td>
                    <Td>{voucher.active && <FiCheck />}</Td>
                    <Td>{voucher.value}</Td>
                    <Td>{voucher.current_value}</Td>
                    <Td>{voucher.email ? voucher.email : "holder"}</Td>
                    <Td>

                      <Box display={'none'}>
                        <Text>Hello</Text>
                      </Box>
                    </Td>
                  </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
    // <Card
    //   p="22px"
    //   my={{ sm: "24px", lg: "0px" }}
    //   ms={{ sm: "0px", lg: "24px" }}
    // >
    //   <CardHeader>
    //     <Flex justify="space-between" align="center" mb="1rem" w="100%">
    //       <Text fontSize="lg" color={textColor} fontWeight="bold">
    //         Vouchers
    //       </Text>
    //     </Flex>
    //     <Flex my={{ sm: "1rem", xl: "10px" }} alignItems="center">
    //       <Flex direction="column">
    //         <Text fontSize="md" color={textColor} fontWeight="bold">
    //           Code
    //         </Text>
    //         <Text
    //           fontSize="sm"
    //           color="gray.400"
    //           fontWeight="semibold"
    //           me="16px"
    //         >
    //           Status
    //         </Text>
    //       </Flex>
    //       <Spacer />
    //       <Box justifyContent={"center"}>
    //         <Text fontSize="md" color="gray.400" fontWeight="semibold">
    //           Initial value
    //         </Text>
    //       </Box>
    //       <Spacer />
    //       <Box justifyContent={"center"}>
    //         <Text fontSize="md" color="gray.400" fontWeight="semibold">
    //           Current Value
    //         </Text>
    //       </Box>
    //       <Spacer />
    //       <Box me="10px">
    //         <Text fontSize="md" color="gray.400" fontWeight="semibold">
    //           {""}
    //         </Text>
    //       </Box>
    //     </Flex>
    //   </CardHeader>
    //   <CardBody>
    //     <Flex direction="column" w="100%">
    //       {vouchers.map((row) => {
    //         return (
    //           <VouchersRow
    //             code={row.code}
    //             active={row.active}
    //             value={row.value}
    //             currentValue={row.current_value}
    //             holder={row.email}
    //             transactions={row.transactions}
    //           />
    //         );
    //       })}
    //     </Flex>
    //   </CardBody>
    // </Card>
  );
};

export default Vouchers;
