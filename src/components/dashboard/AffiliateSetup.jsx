import {
  Button,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import snakecasekeys from "snakecase-keys";
import { setupAffiliate } from "../../state/features/vendors";
import { emailRegex } from "../../state/utilities/utilities";
import { auth } from "../../state/utilities/authConfig";

const AffiliateSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendor } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    getFieldState,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    criteriaMode: "all",
  });

  const primaryEmailState = getFieldState("primaryEmail");

  const handleFormSubmit = (data) => {
    const params = snakecasekeys(data);
    dispatch(setupAffiliate(params));
    navigate("/dashboard");
  };

  const checkEmail = async () => {
    const response = await auth.privateRoute("/api/validate_user", {
      method: "POST",
    });
    if (response.data.message === "conflict") {
      clearErrors("primaryEmail");
    } else {
      setError("primaryEmail", {
        message: t("forms.messages.notUnique"),
        shouldFocus: true,
      });
    }
  };

  return (
    <Stack minH={"80vh"} direction={{ base: "column", md: "row" }} m={1}>
      <Flex p={8} flex={1} align={"top"} justify={"left"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>{t("venue.affiliate.setup.heading")}</Heading>
          <Text>{t("venue.affiliate.setup.subHeading")}</Text>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Input type={"hidden"} {...register("vendor", { value: vendor.id })} />
            <FormControl isInvalid={errors.primaryEmail}>
              <FormLabel htmlFor="primaryEmail">
                {t("venue.formElements.primaryEmail")}
              </FormLabel>
              <Input
                data-cy="email"
                id="primaryEmail"
                {...register("primaryEmail", {
                  pattern: {
                    value: emailRegex,
                    message: t("forms.messages.invalidEmail"),
                  },
                  required: t("forms.messages.required"),
                })}
                onBlur={() => checkEmail()}
              />
              <FormErrorMessage>
                {errors.primaryEmail && errors.primaryEmail.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              data-cy="submit"
              disabled={primaryEmailState.error}
            >
              {t("forms.elements.submit")}
            </Button>
          </form>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default AffiliateSetup;
