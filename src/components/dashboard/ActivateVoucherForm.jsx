import {
  Button,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const ActivateVoucherForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleFormSubmit = () => {
    debugger;
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="email">
          {t("forms.elements.email")}
        </FormLabel>
        <Input
          data-cy="email"
          id="email"
          {...register("email", {
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
    </form>
  );
};

export default ActivateVoucherForm;
