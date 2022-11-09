import {
  Button,
  Flex,
  FormErrorMessage,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Textarea,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import snakecasekeys from "snakecase-keys";
import { setupVenue, editVenue } from "../../state/features/vendors";
import { emailRegex } from "../../state/utilities/utilities";
import { auth } from "../../state/utilities/authConfig";
import { FiImage } from "react-icons/fi";
import { toBase64 } from "../../modules/ImageEncoder";
import { useRef, useEffect } from "react";
const VenueSetup = () => {
  const inputRef = useRef(null);
  // useEffect(() => {
  //   const el2 = inputRef.current;
  //   debugger;
  //   console.log("from useEffect" + el2); // 👈️ element here
  // }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { edit } = state || false;
  const { vendor } = useSelector((state) => state.user);
  const { t } = useTranslation();
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    getFieldState,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    criteriaMode: "all",
  });

  const primaryEmailState = getFieldState("primaryEmail");

  const handleFormSubmit = async (data) => {
    data.logotype = await toBase64(data.logotype[0]);
    const params = snakecasekeys(data);
    if (edit) {
      dispatch(editVenue({ ...params, id: vendor.id }));
    } else {
      dispatch(setupVenue(params));
    }
    navigate("/dashboard");
  };

  const checkEmail = async (email) => {
    const response = await auth.privateRoute("/api/validate_user", {
      method: "POST",
      data: { uid: email },
    });
    if (response.data.message === "conflict") {
      setError("primaryEmail", {
        message: t("forms.messages.notUnique"),
        shouldFocus: true,
      });
    } else {
      clearErrors("primaryEmail");
    }
  };

  return (
    <Stack minH={"80vh"} direction={{ base: "column", md: "row" }} m={1}>
      <Flex p={8} flex={1} align={"top"} justify={"left"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>
            {edit || vendor
              ? t("venue.edit.heading")
              : t("venue.setup.heading")}
          </Heading>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="name">
                {t("venue.formElements.venueName")}
              </FormLabel>
              <Input
                defaultValue={(edit || vendor) && vendor.name}
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
            <FormControl isInvalid={errors.vat_id}>
              <FormLabel htmlFor="vat_id">
                {t("venue.formElements.venueVatid")}
              </FormLabel>
              <Input
                defaultValue={(edit || vendor) && vendor.vat_id}
                data-cy="vat_id"
                id="vat_id"
                {...register("vat_id", {
                  required: t("forms.messages.required"),
                  pattern: {
                    value: /^[a-zA-Z]{2}[0-9]{12}$/,
                    message: t("forms.messages.invalidVat"),
                  },
                  minLength: {
                    value: 4,
                    message: t("forms.messages.minLength", { length: 4 }),
                  },
                })}
              />
              <FormErrorMessage>
                {errors.vat_id && errors.vat_id.message}
              </FormErrorMessage>
              <FormHelperText>
                {t("venue.formElements.venueVatidHelper")}
              </FormHelperText>
            </FormControl>
            <FormControl isInvalid={errors.description}>
              <FormLabel htmlFor="description">
                {t("venue.formElements.description")}{" "}
                {t("forms.elements.optional")}
              </FormLabel>
              <Textarea
                data-cy="description"
                defaultValue={(edit || vendor) && vendor.description}
                id="description"
                {...register("description")}
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
                defaultValue={(edit || vendor) && vendor.primary_email}
                id="primaryEmail"
                {...register("primaryEmail", {
                  pattern: {
                    value: emailRegex,
                    message: t("forms.messages.invalidEmail"),
                  },
                  required: t("forms.messages.required"),
                })}
                onBlur={(event) => checkEmail(event.target.value)}
              />
              <FormErrorMessage>
                {errors.primaryEmail && errors.primaryEmail.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>{t("forms.elements.logotype")}</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FiImage} />
                </InputLeftElement>
                <input
                  data-cy="logotype"
                  type="file"
                  id="logotype"
                  accept={"image/*"}
                  onChange={() => {
                    debugger;
                  }}
                  ref={(el) => (inputRef.current = el)}
                  style={{ display: "none" }}
                  {...register("logotype")}
                />
                <Input
                  placeholder={t("forms.elements.logotypePlaceholder")}
                  // onClick={() => inputRef.current.click()}
                  onClick={() => document.getElementById("logotype").click()}
                  readOnly={true}
                  value={
                    getValues("logotype") && getValues("logotype")[0]?.name
                  }
                />
              </InputGroup>
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

export default VenueSetup;
