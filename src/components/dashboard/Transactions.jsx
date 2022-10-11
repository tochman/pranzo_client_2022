import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import moment from "moment-with-locales-es6";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { pluck, removeDuplicates } from "../../state/utilities/utilities";

const Transactions = (props) => {
  const { t, i18n } = useTranslation();
  const [currentLng, setCurrentLng] = useState(
    i18n.language == "GB" ? "en" : "sv"
  );
  useEffect(() => {
    setCurrentLng(i18n.language == "SE" ? "sv" : "en");
  }, [i18n.language]);

  useEffect(() => {
    moment.locale(currentLng);
  }, [currentLng, moment]);

  let transactions = JSON.parse(JSON.stringify(props.voucher.transactions)); // really? Is this fixing object is not extensible?
  const cleanTransactions = removeDuplicates(transactions, "date");
  cleanTransactions.forEach((transaction) => {
    let transaction_count = transactions.reduce(
      (num, trans) => (trans.date === transaction.date ? ++num : num),
      0
    );
    // let amounts = transactions.reduce(
    //   (trans) => (trans.date === transaction.date ? transaction.amount : null),
    //   []
    // )
    let amounts = pluck(transactions, "amount");
    transaction.amounts = amounts;
    transaction.count = transaction_count;

    return null;
  });

  const transactionRows = transactions.map((transaction) => {
    if (props.voucher.variant === "cash") {
      return (
        <Tr key={transaction.id}>
          <Td>{moment(transaction.date).locale(currentLng).format("LL")}</Td>
          <Td>
            {" "}
            {"Amount: " + transaction.amount.toString()}
            {/* {t("dashboard.content.vouchers.labels.servings") + transaction.count + ", amounts:" + transaction.amounts.toString()} */}
          </Td>
        </Tr>
      );
    } else {
      let dups = _.filter(transactions, { date: transaction.date }); //
      dups.forEach((tran) => {
        _.remove(transactions, (current) => current.id === tran.id);
      });
      return (
        <Tr key={transaction.id}>
          <Td>{moment(transaction.date).locale(currentLng).format("LL")}</Td>
          <Td>
            {`${t("dashboard.content.vouchers.labels.servings")} ${
              dups.length
            }`}
          </Td>
        </Tr>
      );
    }
  });
  return (
    <TableContainer
      data-cy={`${props.voucher.code}-table`}
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
