import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  Text
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInUser } from "../../state/features/authentication";
import { emailRegex } from "../../state/utilities/utilities";
import LandingImage from "../../assets/restaurant.jpeg";


const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  useEffect(() => {
    authenticated && navigate("/");
  }, [authenticated]);

  const handleFormSubmission = (data) => {
    dispatch(signInUser(data));
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>
            {t("authentication.signIn.header")}
          </Heading>
          <form
            data-cy="sign-in-form"
            onSubmit={handleSubmit(handleFormSubmission)}
          >
            <FormControl isInvalid={errors.email}>
              <FormLabel>{t("authentication.signIn.email")}</FormLabel>
              <Input
                name="email"
                data-cy="email"
                type="email"
                autocomplete="email"
                {...register("email", {
                  pattern: {
                    value: emailRegex,
                    message: t("forms.messages.invalidEmail"),
                  },
                  required: t("forms.messages.required"),
                  minLength: {
                    value: 4,
                    message: t("forms.messages.minLength", { length: 4 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password}>
              <FormLabel>{t("authentication.signIn.password")}</FormLabel>
              <Input
                name="password"
                data-cy="password"
                type="password"
                autocomplete="password"
                {...register("password", {
                  required: t("forms.messages.required"),
                  minLength: {
                    value: 4,
                    message: t("forms.messages.minLength", { length: 4 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Stack spacing={6} mt={5}>
              <Button
                data-cy="submit"
                colorScheme={"pink"}
                variant={"solid"}
                type="submit"
                isLoading={isSubmitting}
              >
                {t("authentication.submit")}
              </Button>
            </Stack>
            <FormControl mt={2}>
              <Text>
                {t("authentication.resetPassword.text")}{' '}
                <Link data-cy="reset-password" href="/auth/reset-password">
                  {t("authentication.resetPassword.link")}
                </Link>
              </Text>
            </FormControl>
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          // src={"https://source.unsplash.com/random/?restaurant"}
          src={LandingImage}
        />
      </Flex>
    </Stack>
  );
};

export default SignIn;
