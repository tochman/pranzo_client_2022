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
  Radio,
  RadioGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activateVoucher } from "../../state/features/vouchers";

const ActivateVoucherForm = ({ voucher }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  // const [showPdfOptions, setShowPdfOptions] = useState(false);
  const { isOpen: showPdfOptions, onToggle: setShowPdfOptions } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { vendor } = useSelector((state) => state.user);

  const handleFormSubmit = (data) => {
    dispatch(activateVoucher(data));
  };

  const handlePdfCheckbox = () => {
    setShowPdfOptions(!showPdfOptions);
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
        <FormLabel htmlFor="activate_wallet">
          {t("forms.elements.mobilePass")}
        </FormLabel>
        <Checkbox
          {...register("activate_wallet")}
          data-cy="activate_wallet"
          id="activate_wallet"
        />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="activate_pdf">
          {t("forms.elements.pdfCard")}
        </FormLabel>
        <Checkbox
          {...register("activate_pdf")}
          data-cy="activate_pdf"
          id="activate_pdf"
        />
      </FormControl>
      {showPdfOptions && (
        <>
          <FormControl>
            <FormLabel htmlFor="pdf_variant">
              {t("forms.elements.pdfVariant")}
            </FormLabel>
            <RadioGroup
              id="pdf_variant"
              {...register("pdf_variant")}
              value={value}
            >
              <Stack direction="row">
                <Radio value="1">Design 1</Radio>
                <Radio value="2">Design 2</Radio>
                <Radio value="3">Design 3</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </>
      )}
      <Button data-cy="submit-activation-form" type="submit">
        {t("forms.elements.submit")}
      </Button>
    </form>
  );
};

export default ActivateVoucherForm;
