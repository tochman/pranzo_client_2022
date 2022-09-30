import {
  Button,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Checkbox,
  Heading,
  Input,
  Textarea,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { activateVoucher } from "../../state/features/vouchers";
const ActivateVoucherForm = ({ voucher }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { vendor } = useSelector((state) => state.user);

  const handleFormSubmit = (data) => {
    dispatch(activateVoucher(data))
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        type={"hidden"}
        id="voucher"
        {...register("voucher", { value: voucher.code })}
      />
      <Input
        type={"hidden"}
        id="vendor"
        {...register("vendor", { value: vendor.id })}
      />
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="email">{t("forms.elements.email")}</FormLabel>
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
      <FormControl>
        <FormLabel htmlFor="email">{t("forms.elements.mobilePass")}</FormLabel>
        <Checkbox
          data-cy="mobile-pass"
          id="mobile-pass"
          {...register("mobile-pass")}
        />
      </FormControl>
      <Button data-cy="submit-activation-form" type="submit">
        {t("forms.elements.submit")}
      </Button>
    </form>
  );
};

export default ActivateVoucherForm;
