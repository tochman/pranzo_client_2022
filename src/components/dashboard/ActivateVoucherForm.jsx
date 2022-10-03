import {
  Button,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Stack,
  Radio,
  RadioGroup,
  HStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { activateVoucher } from "../../state/features/vouchers";

const ActivateVoucherForm = ({ voucher }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const watchActivatePdf = watch("activate_pdf", false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { vendor } = useSelector((state) => state.user);

  const handleFormSubmit = (data) => {
    dispatch(activateVoucher(data));
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
      <HStack mt={4}>
        <Checkbox {...register("activate_wallet")} data-cy="activate_wallet">
          {t("forms.elements.mobilePass")}
        </Checkbox>
        <Checkbox
          {...register("activate_pdf")}
          data-cy="activate_pdf"
          id="activate_pdf"
        >
          {t("forms.elements.pdfCard")}
        </Checkbox>
      </HStack>
      {watchActivatePdf && (
        <Stack direction={"column"} mt={4}>
          <FormControl>
            <FormLabel htmlFor="pdf_variant">
              {t("forms.elements.pdfVariant")}
            </FormLabel>
            <RadioGroup
              name="pdf_variant"
              {...register("pdf_variant")}
              defaultValue={"1"}
            >
              <Stack direction="row">
                <Radio value="1">Design 1</Radio>
                <Radio value="2">Design 2</Radio>
                <Radio value="3">Design 3</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pdf_language">
              {t("forms.elements.pdfLanguage")}
            </FormLabel>
            <RadioGroup
              name="pdf_language"
              {...register("pdf_language")}
              defaultValue={"se"}
            >
              <Stack direction="row">
                <Radio value="se">{t("forms.elements.swedish")}</Radio>
                <Radio value="en">{t("forms.elements.english")}</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </Stack>
      )}
      <Button
        data-cy="submit-activation-form"
        type="submit"
        colorScheme="pink"
        mt={4}
        isLoading={isSubmitting}
      >
        {t("forms.elements.submit")}
      </Button>
    </form>
  );
};

export default ActivateVoucherForm;
