import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../state/features/authentication";

const ChangePassword = ({setShowResetForm}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();


  const handleFormSubmission = (data) => {
    dispatch(changePassword(data)).then(resp => {
      setShowResetForm(!resp.payload)
    });
  };

  return (
    <Stack spacing={4} w={"full"} maxW={"md"}>
      <Heading fontSize={"2xl"}>{t("authentication.changePassword.header")}</Heading>
      <form
        data-cy="sign-in-form"
        onSubmit={handleSubmit(handleFormSubmission)}
      >
        <FormControl isInvalid={errors.email}>
          <FormLabel>{t("authentication.changePassword.currentPassword")}</FormLabel>
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
        <FormControl isInvalid={errors.password}>
          <FormLabel>{t("authentication.changePassword.newPassword")}</FormLabel>
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
  );
};

export default ChangePassword;
