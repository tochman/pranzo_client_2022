import {
  Button,
  FormErrorMessage,
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
  Input,
  Stack,
  Radio,
  RadioGroup,
  HStack,
  Select,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { activateVoucher } from "../../state/features/vouchers";

const ReportCreate = () => {
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
    <Container m={2}>
      <Heading as={'h1'} size={"lg"}>Create report</Heading>
      <form data-cy="create-report" onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          type={"hidden"}
          id="vendor"
          {...register("vendor", { value: vendor.id })}
        />
         <FormControl mt={3}>
          <FormLabel htmlFor="variant">{t("forms.elements.report.variant")}</FormLabel>
          <Select
            id="variant"
            data-cy="variant"
            placeholder={t("forms.elements.report.selectReportVariant")}
            {...register("variant")}
          >
            <option value="today">
              {t("forms.elements.report.variants.today")}
            </option>
            <option value="yesterday">
              {t("forms.elements.report.variants.yesterday")}
            </option>
            <option value="this_week">
              {t("forms.elements.report.variants.thisWeek")}
            </option>
            <option value="last_week">
              {t("forms.elements.report.variants.previousWeek")}
            </option>
            <option value="this_month">
              {t("forms.elements.report.variants.thisMonth")}
            </option>
            <option value="last_month">
              {t("forms.elements.report.variants.previousMonth")}
            </option>
          </Select>
          <FormHelperText>{t("forms.elements.report.variantHelper")}</FormHelperText>
        </FormControl>
        
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
    </Container>
  );
};

export default ReportCreate;
