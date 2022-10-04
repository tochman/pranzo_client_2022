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
            pattern: {
              value: /(^[^@.]+)@([^@.]+)\.{1}(\w{1,6}$)/i,
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
              id="pdf_variant"
              data-cy="pdf_variant"
              defaultValue={"1"}
            >
              <Stack direction="row">
                <Radio {...register("pdf_variant")} value="1">
                  Design 1
                </Radio>
                <Radio {...register("pdf_variant")} value="2">
                  Design 2
                </Radio>
                <Radio {...register("pdf_variant")} value="3">
                  Design 3
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="pdf_language">
              {t("forms.elements.pdfLanguage")}
            </FormLabel>
            <RadioGroup
              name="pdf_language"
              id="pdf_language"
              data-cy="pdf_language"
              defaultValue={"sv"}
            >
              <Stack direction="row">
                <Radio
                  {...register("pdf_language")}
                  data-cy="swedish"
                  value="sv"
                >
                  {t("forms.elements.swedish")}
                </Radio>
                <Radio
                  {...register("pdf_language")}
                  data-cy="english"
                  value="en"
                >
                  {t("forms.elements.english")}
                </Radio>
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
