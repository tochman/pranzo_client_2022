import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Text,
  Input,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../state/features/authentication";
import { emailRegex } from "../../state/utilities/utilities";
const ResetPassword = () => {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const handleFormSubmission = (data) => {
    dispatch(resetPassword(data)).then((resp) => {
      if (resp.meta.requestStatus === "fulfilled") {
        navigate('/auth/sign-in')
      }
    });
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>
            {t("authentication.resetPassword.header")}
          </Heading>
          <Text>{t("authentication.resetPassword.subHeader")}</Text>
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
          src={"https://source.unsplash.com/random/?restaurant"}
        />
      </Flex>
    </Stack>
  );
};

export default ResetPassword;
