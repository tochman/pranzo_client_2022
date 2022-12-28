import { Text } from "@chakra-ui/layout";
const Content = ({ children, ...props }) => {
  return (
    <Text
      fontSize={props.size || "ld"}
      textAlign="left"
      lineHeight="1.375"
      fontWeight="300"
      color="gray.500"
      {...props}
    >
      {children}
    </Text>
  );
};

export default Content;
