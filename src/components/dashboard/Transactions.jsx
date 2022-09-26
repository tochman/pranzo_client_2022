import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

import moment from "moment";
import { removeDuplicates } from "../../state/utilities/utilities";
const Transactions = (props) => {
  let transactions = JSON.parse(JSON.stringify(props.transactions)); // really? Is this fixing object is not extensible?
  const cleanTransactions = removeDuplicates(transactions, "date");
  cleanTransactions.forEach((transaction) => {
    let transaction_count = transactions.reduce(
      (num, trans) => (trans.date === transaction.date ? ++num : num),
      0
    );
    transaction.count = transaction_count;
    return null;
  });
  const transactionRows = cleanTransactions.map((transaction) => {
    return (
      <Tr key={transaction.id}>
        <Td>{moment(transaction.date).format("MMMM Do YYYY")}</Td>
        <Td>Servings: {transaction.count}</Td>
      </Tr>
    );
  });
  return (
    <TableContainer
      data-cy={`${props.code}-table`}
      width={{ baseStyle: "80%", sm: "100%" }}
    >
      <Table variant="striped">
        <Thead>
          <Th>Transactions</Th>
          <Th></Th>
          <Th></Th>
        </Thead>
        <Tbody>{transactionRows}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default Transactions;
