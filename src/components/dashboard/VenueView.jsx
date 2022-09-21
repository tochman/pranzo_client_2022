import {
  Box,
  Text,
  Stack,
  Flex,
  Button,
} from "@chakra-ui/react";
import Card from "./templates/Card";
import CardHeader from "./templates/CardHeader";
import CardBody from "./templates/CardBody";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { FiEdit3 } from "react-icons/fi";

const VenueView = () => {
  const { vendor } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Stack>
      <Card
        data-cy="venue-info"
        p="22px"
        my={{ sm: "24px", lg: "0px" }}
        ms={{ sm: "0px", lg: "24px" }}
      >
        {vendor && (
          <>
            <Flex justify="space-between" align="center" mb="1rem" w="100%">
              <CardHeader>
                <Text fontSize="lg" fontWeight="bold">
                  {vendor.name}
                </Text>
                <Text fontSize={"small"} fontWeight="bold">
                  Primary email:{" "}
                  <Box as="span" fontWeight="normal">
                    {vendor.primary_email}
                  </Box>
                </Text>
              </CardHeader>
              <Button
                onClick={() =>
                  navigate("/dashboard/venue/setup", { state: { edit: true } })
                }
                data-cy="venue-edit-button"
                variant={"outline"}
                fontSize={"sm"}
                fontWeight={600}
                colorScheme="pink"
                p="8px 32px"
              >
                <FiEdit3 />
              </Button>
            </Flex>
            <CardBody>
              <Text>{vendor.description}</Text>
            </CardBody>
          </>
        )}
      </Card>
    </Stack>
  );
};

export default VenueView;
