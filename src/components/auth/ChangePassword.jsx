import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  changePassword,
  resetPassword,
} from "../../state/features/authentication";
import { auth } from "../../state/utilities/authConfig";
import { queryParamsToObject } from "../../state/utilities/utilities";

const ConditionalWrapper = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

const ChangePassword = ({ setShowResetForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const [resetToken, setResetToken] = useState();
  const location = useLocation();

  useEffect(() => {
    async function setHeaders(data) {
      await auth.setSession(data);
      setResetToken(params.token);
    }
    const params = queryParamsToObject(location.search);
    setHeaders(params)
  }, []);

  const handleFormSubmission = (data) => {
    if (resetToken) {
      dispatch(resetPassword(data)).then((resp) => {
        navigate("/dashboard");
      });
    } else {
      dispatch(changePassword(data)).then((resp) => {
        setShowResetForm(!resp.payload);
      });
    }
  };
  const wrapperElements = (children) => (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "row" }}
      data-cy="reset-password-wrapper"
    >
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        {children}
      </Flex>
    </Stack>
  );

  return (
    <ConditionalWrapper condition={resetToken} wrapper={wrapperElements}>
      <Stack spacing={4} w={"full"} maxW={"md"}>
        <Heading fontSize={"2xl"}>
          {resetToken
            ? t("authentication.resetPassword.formHeader")
            : t("authentication.changePassword.header")}
        </Heading>
        <form
          data-cy="sign-in-form"
          onSubmit={handleSubmit(handleFormSubmission)}
        >
          {resetToken && (
            <Input
              data-cy="reset-token"
              type={"hidden"}
              id="resetToken"
              {...register("resetToken", { value: resetToken })}
            />
          )}

          {!resetToken && (
            <FormControl isInvalid={errors.email}>
              <FormLabel>
                {t("authentication.changePassword.currentPassword")}
              </FormLabel>
              <Input
                name="currentPassword"
                data-cy="current-password-field"
                type="password"
                autocomplete="password"
                {...register("currentPassword", {
                  required: t("forms.messages.required"),
                  minLength: {
                    value: 4,
                    message: t("forms.messages.minLength", { length: 4 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.currentPassword && errors.currentPassword.message}
              </FormErrorMessage>
            </FormControl>
          )}
          <FormControl isInvalid={errors.password}>
            <FormLabel>
              {t("authentication.changePassword.newPassword")}
            </FormLabel>
            <Input
              name="newPassword"
              data-cy="new-password-field"
              type="password"
              autocomplete="password"
              {...register("newPassword", {
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
              {t("authentication.changePassword.newPasswordConfirmation")}
            </FormLabel>
            <Input
              name="password-conf"
              data-cy="new-password-confirmation-field"
              autocomplete="password-conf"
              type="password"
              {...register("newPasswordConfirmation", {
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
              data-cy="change-password-submit"
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
    </ConditionalWrapper>
  );
};

export default ChangePassword;
