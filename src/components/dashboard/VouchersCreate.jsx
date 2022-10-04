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
  Container,
  Heading,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createVouchers } from "../../state/features/vouchers";

const VouchersCreate = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const watchVariant = watch("variant", false);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { vendor } = useSelector((state) => state.user);

  const handleFormSubmit = (data) => {
    dispatch(createVouchers(data));
    navigate("/dashboard/vouchers");
  };

  return (
    <Container m={2}>
      <Heading>
        {t("dashboard.content.vouchers.create.createFormHeading")}
      </Heading>
      <form
        data-cy="batch-create-vouchers"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input type={"hidden"} {...register("vendor", { value: vendor.id })} />
        <Input type={"hidden"} {...register("command", { value: "batch" })} />
        <FormControl isInvalid={errors.amount} mt={3}>
          <FormLabel htmlFor="amount">{t("forms.elements.amount")}</FormLabel>
          <Input
            width={"140px"}
            data-cy="amount"
            type={"number"}
            id="amount"
            {...register("amount", {
              required: t("forms.messages.required"),
              minLength: {
                value: 1,
                message: t("forms.messages.submitNumber", { length: 4 }),
              },
            })}
          />
          <FormHelperText>{t("forms.elements.amountHelper")}</FormHelperText>
          <FormErrorMessage>
            {errors.amount && errors.amount.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt={3}>
          <FormLabel htmlFor="variant">{t("forms.elements.variant")}</FormLabel>
          <Select
            id="variant"
            data-cy="variant"
            placeholder={t("forms.elements.selectVariant")}
            {...register("variant")}
          >
            <option value="servings">Servings</option>
            <option disabled={true} value="cash">
              Cash
            </option>
          </Select>
          <FormHelperText>{t("forms.elements.variantHelper")}</FormHelperText>
        </FormControl>

        {watchVariant === "servings" && (
          <FormControl mt={3}>
            <FormLabel htmlFor="value">
              {t("forms.elements.valueServings")}
            </FormLabel>

            <Select
              id="value"
              data-cy="value"
              placeholder={t("forms.elements.selectServings")}
              {...register("value")}
            >
              <option value="10">10</option>
              <option value="15">15</option>
            </Select>
            <FormHelperText>
            {t("forms.elements.selectValueHelper")}
            </FormHelperText>
          </FormControl>
        )}
        {watchVariant === "cash" && (
          <>
            <FormLabel htmlFor="value">
              {t("forms.elements.valueCash")}
            </FormLabel>

            <Select
              id="value"
              data-cy="value"
              placeholder={t("forms.elements.selectCash")}
              {...register("value")}
            >
              <option value="100">100</option>
              <option value="250">250</option>
              <option value="500">500</option>
              <option value="1000">1000</option>
            </Select>
          </>
        )}
        <Button
          data-cy="submit-create-form"
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

export default VouchersCreate;
