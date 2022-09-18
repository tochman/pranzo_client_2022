import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  components: { MenuItem: { baseStyle: {  outline: "none"  } } },
};

const theme = extendTheme({ config });

export default theme;
