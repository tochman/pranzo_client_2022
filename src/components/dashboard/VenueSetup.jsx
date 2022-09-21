import {
  Button,
  Checkbox,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  Link,
  Image,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import { t } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const VenueSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated, currentUser } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFormSubmit = () => {
    debugger;
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
