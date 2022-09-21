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
import { t } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import snakecasekeys from "snakecase-keys";
import { setupVendor } from "../../state/features/vendors";

const VenueSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { vendor } = useSelector(
    (state) => state.user
  );
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    vendor && navigate("/dashboard");
  }, [vendor]);

  const handleFormSubmit = (data) => {
    const params = snakecasekeys(data);
    dispatch(setupVendor(params));
  };

  return (
    <Stack minH={"80vh"} direction={{ base: "column", md: "row" }} m={1}>
      <Flex p={8} flex={1} align={"top"} justify={"left"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>{t("venue.setup.heading")}</Heading>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">
                {t("venue.formElements.venueName")}
              </FormLabel>
              <Input
                data-cy="name"
                id="name"
                {...register("name", {
                  required: t("forms.messages.required"),
                  minLength: {
                    value: 4,
                    message: t("forms.messages.minLength", { length: 4 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">
                {t("venue.formElements.description")}
              </FormLabel>
              <Textarea
                data-cy="description"
                id="description"
                {...register("description", {
                  required: t("forms.messages.required"),
                  minLength: {
                    value: 20,
                    message: t("forms.messages.minLength", { length: 20 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.primaryEmail}>
              <FormLabel htmlFor="primaryEmail">
                {t("venue.formElements.primaryEmail")}
              </FormLabel>
              <Input
                data-cy="email"
                id="primaryEmail"
                {...register("primaryEmail", {
                  pattern: {
                    value: /(^[^@.]+)@([^@.]+)\.{1}(\w{1,6}$)/i,
                    message: t("forms.messages.invalidEmail"),
                  },
                  required: t("forms.messages.required"),
                })}
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
            >
              {t("forms.elements.submit")}
            </Button>
          </form>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default VenueSetup;
