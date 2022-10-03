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
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          type={"hidden"}
          id="vendor"
          {...register("vendor", { value: vendor.id })}
        />
        <Select
          data-cy="variant"
          placeholder="Select option"
          {...register("variant")}
        >
          <option value="servings">Servings</option>
          <option value="cash">Cash</option>
        </Select>
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
