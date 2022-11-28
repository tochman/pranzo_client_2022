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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../state/features/authentication";
import { emailRegex } from "../../state/utilities/utilities";
import LandingImage from "../../assets/restaurant.jpeg";

const SignUp = () => {
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
    dispatch(registerUser(data));
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>
            {t("authentication.registerNewAccount.header")}
          </Heading>
          <form
            data-cy="create-account-form"
            onSubmit={handleSubmit(handleFormSubmission)}
          >
            <FormControl isInvalid={errors.name}>
              <FormLabel>
                {t("authentication.registerNewAccount.name")}
              </FormLabel>
              <Input
                name="name"
                data-cy="name"
                type="text"
                autocomplete="name"
                {...register("name", {
                  required: t("forms.messages.required"),
                  minLength: {
                    value: 4,
                    message: t("forms.messages.minLength", { length: 4 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel>
                {t("authentication.registerNewAccount.email")}
              </FormLabel>
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
              <FormLabel>
                {t("authentication.registerNewAccount.password")}
              </FormLabel>
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
            <FormControl isInvalid={errors.passwordConf}>
              <FormLabel>
                {t("authentication.registerNewAccount.passwordConfirmation")}
              </FormLabel>
              <Input
                name="password-conf"
                data-cy="password-conf"
                autocomplete="password-conf"
                type="password"
                {...register("passwordConf", {
                  required: t("forms.messages.required"),
                  minLength: {
                    value: 4,
                    message: t("forms.messages.minLength", { length: 4 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.passwordConf && errors.passwordConf.message}
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
          </form>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          //src={"https://source.unsplash.com/random/?restaurant"}
          src={LandingImage}
        />
      </Flex>
    </Stack>
  );
};

export default SignUp;
