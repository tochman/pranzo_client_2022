import {
  Box,
  Heading,
  Text,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Divider,
  Center,
} from "@chakra-ui/react";
import ChartWrapper from "./templates/ChartWrapper";
import ChartInNumbers from "./ChartInNumbers";
import ChartInValue from "./ChartInValue";

const Dashboard = () => {
  return (
    <Stack spacing={8} m={1}>
      <Box p={5}>
        <Heading fontSize="xl">Stats</Heading>
        <Divider orientation="horizontal" />
        <StatGroup p={2} m={2}>
          <Stat>
            <StatLabel>Issued Vouchers</StatLabel>
            <StatNumber>10</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Voucher Sales</StatLabel>
            <StatNumber>€2.560</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Issued Gift Cards</StatLabel>
            <StatNumber>20</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Gift Card Sales</StatLabel>
            <StatNumber>€12.110</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </StatGroup>
      </Box>
      <Box pb={20}>
        <ChartWrapper
          title="Sales Overview (in numbers)"
          percentage={-20}
          chart={<ChartInNumbers />}
        />
        <ChartWrapper
          title="Sales Overview (in value)"
          chart={<ChartInValue />}
        />
      </Box>
    </Stack>
  );
};

export default Dashboard;
