import {
  Box,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  Divider,
} from "@chakra-ui/react";
import ChartWrapper from "./templates/ChartWrapper";
import ChartInNumbers from "./ChartInNumbers";
import ChartInValue from "./ChartInValue";

const Dashboard = () => {
  const percentage = 20;
  return (
    <Stack spacing={8} m={1}>
      <Box p={5}>
        <Heading fontSize="xl">Stats</Heading>
        <Divider orientation="horizontal" />
        <StatGroup p={2}>
          <Stat>
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              Issued Vouchers
            </StatLabel>
            <StatNumber>10</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              Voucher Sales
            </StatLabel>
            <StatNumber>€2.560</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>

          <Stat>
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              Issued Gift Cards
            </StatLabel>
            <StatNumber>20</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              Gift Card Sales
            </StatLabel>
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
