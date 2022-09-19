import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../state/features/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmission = (event) => {
    event.preventDefault();
    const name = event.target["name"].value;
    const email = event.target["email"].value;
    const password = event.target["password"].value;
    const passwordConf = event.target["password-conf"].value;
    const params = {
      name: name,
      email: email,
      password: password,
      passwordConf: passwordConf,
    }
    dispatch(registerUser(params));
    navigate("/");
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Register a new account</Heading>
          <form data-cy="create-account-form" onSubmit={handleFormSubmission}>
            <FormControl>
              <FormLabel>Your name</FormLabel>
              <Input name="name" data-cy="name" type="text" />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input name="email" data-cy="email" type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input name="password" data-cy="password" type="password" />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm password</FormLabel>
              <Input
                name="password-conf"
                data-cy="password-conf"
                type="password"
              />
            </FormControl>
            <Stack spacing={6}>
              <Button
                data-cy="submit"
                colorScheme={"pink"}
                variant={"solid"}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={"https://source.unsplash.com/random/?restaurant"}
        />
      </Flex>
    </Stack>
  );
};

export default SignUp;
