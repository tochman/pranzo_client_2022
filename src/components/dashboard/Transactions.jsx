import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
// import moment from "moment";
import moment from 'moment-with-locales-es6';

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { removeDuplicates } from "../../state/utilities/utilities";
const Transactions = (props) => {
  const { t, i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(
    i18n.language == "GB" ? "en" : "sv"
  );
  useEffect(() => {
    setCurrentLng(i18n.language == "SE" ? "sv" : "en");
  }, [i18n.language]);

  useEffect(() => {
    moment.locale(currentLng)
  }, [currentLng, moment]);

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
        <Td>{moment(transaction.date).locale(currentLng).format("LL")}</Td>
        <Td>
          {" "}
          {t("dashboard.content.vouchers.labels.servings") + transaction.count}
        </Td>
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
          <Th> {t("dashboard.content.vouchers.labels.transactions")}</Th>
          <Th></Th>
          <Th></Th>
        </Thead>
        <Tbody>{transactionRows}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default Transactions;
