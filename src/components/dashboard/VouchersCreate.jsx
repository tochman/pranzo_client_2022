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
import { activateVoucher } from "../../state/features/vouchers";

const VouchersCreate = ({ voucher }) => {
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
    dispatch(activateVoucher(data));
  };

  return (
    <Container m={2}>
      <Heading>Create vouchers for inventory</Heading>
      <form
        data-cy="batch-create-vouchers"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Input type={"hidden"} {...register("vendor", { value: vendor.id })} />
        <Input type={"hidden"} {...register("command", { value: "batch" })} />
        <FormControl isInvalid={errors.name} mt={3}>
          <FormLabel htmlFor="amount">{t("forms.elements.amount")}</FormLabel>
          <Input
            width={"140px"}
            data-cy="amount"
            type={'number'}
            id="amount"
            {...register("amount", {
              required: t("forms.messages.required"),
              minLength: {
                value: 1,
                message: t("forms.messages.submitNumber", { length: 4 }),
              },
            })}
          />
          <FormHelperText>
            The amount of vouchers you want to add to your inventory
          </FormHelperText>
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
          <FormHelperText>
            Only "servings" are currently implemented
          </FormHelperText>
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
            Choose the value of each voucher. If you wish to create vouchers with other values, please go through the creation process for each value. 
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
        {/* <Input
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
        </FormControl> */}
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
