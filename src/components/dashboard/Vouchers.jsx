import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "./templates/Card";
import CardBody from "./templates/CardBody";
import CardHeader from "./templates/CardHeader";
import VouchersRow from "./templates/VouchersRow";
import React from "react";
import { useSelector } from "react-redux";

import {
  FaArrowDown,
  FaArrowUp,
  FaBell,
  FaCreditCard,
  FaFilePdf,
  FaHtml5,
  FaShoppingCart,
} from "react-icons/fa";

const Vouchers = ({ title }) => {
  const { vouchers } = useSelector((state => state.user));
  const textColor = useColorModeValue("gray.700", "white");
  const data = [
    {
      date: "March, 01, 2020",
      code: "#MS-415646",
      price: "$180",
      logo: FaFilePdf,
      format: "PDF",
    },
    {
      date: "February, 10, 2020",
      code: "#RV-126749",
      price: "$250",
      logo: FaFilePdf,
      format: "PDF",
    },
    {
      date: "April, 05, 2020",
      code: "#FB-212562",
      price: "$560",
      logo: FaFilePdf,
      format: "PDF",
    },
    {
      date: "June, 25, 2019",
      code: "#QW-103578",
      price: "$120",
      logo: FaFilePdf,
      format: "PDF",
    },
    {
      date: "March, 01, 2019",
      code: "#AR-803481",
      price: "$300",
      logo: FaFilePdf,
      format: "PDF",
    },
  ];

  return (
    <Card
      p="22px"
      my={{ sm: "24px", lg: "0px" }}
      ms={{ sm: "0px", lg: "24px" }}
    >
      <CardHeader>
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="lg" color={textColor} fontWeight="bold">
            {title}
          </Text>
          <Button
            colorScheme="teal"
            borderColor="teal.300"
            color="teal.300"
            variant="outline"
            fontSize="xs"
            p="8px 32px"
          >
            VIEW ALL
          </Button>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" w="100%">
          {vouchers.map((row) => {
            return (
              <VouchersRow
                code={row.code}
                active={row.active}
                value={row.value}
                currentValue={row.current_value}
                holder={row.email}
                transactions={row.transactions}
              />
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default Vouchers;
