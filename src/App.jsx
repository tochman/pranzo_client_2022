import { Container, Heading, Button, useColorMode } from "@chakra-ui/react";

const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Container>
      <Button onClick={toggleColorMode}>
        {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
      <Heading>Pranzo</Heading>
    </Container>
  );
};

export default App;
