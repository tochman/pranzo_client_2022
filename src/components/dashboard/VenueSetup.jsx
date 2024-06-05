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
  Image,
  Text,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import snakecasekeys from "snakecase-keys";
import { setupVenue, editVenue } from "../../state/features/vendors";
import { emailRegex, toastMessage } from "../../state/utilities/utilities";
import { auth } from "../../state/utilities/authConfig";
import { FiImage } from "react-icons/fi";
import { toBase64 } from "../../modules/ImageEncoder";
import { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { validateVat } from "../../state/features/vatSlice"; // Import the VAT validation action

const VenueSetup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { edit } = state || false;
  const { vendor } = useSelector((state) => state.user);
  const {
    vatNumber,
    legalName,
    status: vatStatus,
  } = useSelector((state) => state.vatData); // VAT slice state
  const { t } = useTranslation();
  const [orgId, setOrgId] = useState(vendor?.org_id || "");
  const {
    handleSubmit,
    register,
    setError,
    clearErrors,
    getFieldState,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    criteriaMode: "all",
  });

  const [file, setFile] = useState();
  const inputRef = useRef();
  const primaryEmailState = getFieldState("primaryEmail");

  useEffect(() => {
    if (legalName) {
      setValue("name", legalName);
    }
    if (vatNumber) {
      setValue("vat_id", vatNumber);
    }
    if (orgId) {
      setValue("org_id", orgId);
    }
  }, [legalName, vatNumber, orgId, setValue]);

  const handleFormSubmit = async (data) => {
    const params = snakecasekeys({
      ...data,
      vat_id: vatNumber,
      name: legalName,
    });
    if (!file && !edit) {
      delete params.logotype;
    }
    if (edit) {
      dispatch(editVenue({ ...params, id: vendor.id }));
    } else {
      dispatch(setupVenue(params));
    }
    navigate("/dashboard");
  };

  const checkEmail = async (email) => {
    if (!edit) {
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
    }
  };

  const changedFile = async (event) => {
    const name = event.target.files[0].name;
    try {
      const base64 = await toBase64(event.target.files[0]);
      setValue("logotype", base64);
      setFile({ name: name, content: base64 });
    } catch (error) {
      toastMessage([error]);
    }
  };

  const handleVatChange = (event) => {
    const vatNumber = event.target.value;
    setOrgId(vatNumber);
    if (vatNumber.length === 11 && /^[0-9]{6}-[0-9]{4}$/.test(vatNumber)) {
      dispatch(validateVat(vatNumber.replace("-", "")));
    }
  };

  const isLoading = vatStatus === "loading";

  return (
    <>
      <Helmet>
        {edit || vendor ? t("venue.edit.heading") : t("venue.setup.heading")}
      </Helmet>
      <Stack minH={"80vh"} direction={{ base: "column", md: "row" }} m={1}>
        <Flex p={8} flex={1} align={"top"} justify={"left"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={"2xl"}>
              {edit || vendor
                ? t("venue.edit.heading")
                : t("venue.setup.heading")}
            </Heading>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <Skeleton isLoaded={!isLoading}>
                <FormControl isInvalid={errors.name}>
                  <FormLabel htmlFor="name">
                    {t("venue.formElements.venueName")}
                  </FormLabel>
                  <Input
                    defaultValue={(edit || vendor) && vendor.name}
                    data-cy="name"
                    id="name"
                    isDisabled={isLoading}
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
              </Skeleton>
              <Divider p={1} />
              <FormControl isInvalid={errors.org_id}>
                <Skeleton isLoaded={!isLoading}>
                  <FormLabel htmlFor="org_id">
                    {t("venue.formElements.venueOrganizationNumber")}
                  </FormLabel>
                  <Input
                    value={orgId}
                    data-cy="org_id"
                    id="org_id"
                    isDisabled={isLoading}
                    {...register("org_id", {
                      pattern: {
                        value: /^[0-9]{6}-[0-9]{4}$/,
                        message: t("forms.messages.invalidVat"),
                      },
                      minLength: {
                        value: 11,
                        message: t("forms.messages.minLength", { length: 11 }),
                      },
                    })}
                    onChange={handleVatChange}
                  />
                  <FormErrorMessage>
                    {errors.org_id && errors.org_id.message}
                  </FormErrorMessage>
                </Skeleton>
                <FormHelperText>
                  {t("venue.formElements.venueOrganizationNumberHelper")}
                </FormHelperText>
              </FormControl>
              {vatStatus === "loading" && (
                <Text mt={2} color="blue.500">
                  {t("venue.formElements.venueVatValidationInProgress")}
                </Text>
              )}
              {vatStatus === "succeeded" && (
                <>
                  <Text mt={2} color="green.500">
                    {`${t("venue.formElements.venueLegalName")}: ${legalName}`}
                  </Text>
                  <Text mt={2} color="green.500">
                    {`${t("venue.formElements.venueVatId")}: ${vatNumber}`}
                  </Text>
                </>
              )}
              {vatStatus === "failed" && (
                <Text mt={2} color="red.500">
                  {t("venue.formElements.venueVatValidationError")}
                </Text>
              )}
              <Skeleton isLoaded={!isLoading}>
                <FormControl isInvalid={errors.description}>
                  <FormLabel htmlFor="description">
                    {t("venue.formElements.description")}{" "}
                    {t("forms.elements.optional")}
                  </FormLabel>
                  <Textarea
                    data-cy="description"
                    defaultValue={(edit || vendor) && vendor.description}
                    id="description"
                    isDisabled={isLoading}
                    {...register("description")}
                  />
                  <FormErrorMessage>
                    {errors.description && errors.description.message}
                  </FormErrorMessage>
                </FormControl>
              </Skeleton>
              <Divider p={1} />

              <Skeleton isLoaded={!isLoading}>
                <FormControl isInvalid={errors.primaryEmail}>
                  <FormLabel htmlFor="primaryEmail">
                    {t("venue.formElements.primaryEmail")}
                  </FormLabel>
                  <Input
                    data-cy="email"
                    defaultValue={(edit || vendor) && vendor.primary_email}
                    id="primaryEmail"
                    isDisabled={isLoading}
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
              </Skeleton>
              <Divider p={1} />

              <Skeleton isLoaded={!isLoading}>
                <FormControl isInvalid={!edit && errors.logotype}>
                  <FormLabel>{t("forms.elements.logotype")}</FormLabel>
                  <InputGroup ref={inputRef}>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FiImage} />
                    </InputLeftElement>
                    <input
                      data-cy="logotype"
                      type="file"
                      name="logotype"
                      accept={"image/*"}
                      onInput={changedFile}
                      style={{ display: "none" }}
                      isDisabled={isLoading}
                      {...register("logotype", {
                        required: !edit && t("forms.messages.required"),
                      })}
                    />
                    <Input
                      data-cy="logotypeFake"
                      placeholder={t("forms.elements.logotypePlaceholder")}
                      onClick={() => inputRef.current.children.logotype.click()}
                      readOnly={true}
                      value={file && file.name}
                      isDisabled={isLoading}
                    />
                  </InputGroup>
                  {!edit && (
                    <FormErrorMessage>
                      {errors.logotype && errors.logotype.message}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Skeleton>
              {file && (
                <Image
                  src={file.content}
                  width={"200px"}
                  height={"auto"}
                  paddingTop={5}
                />
              )}
              <Divider p={1} />

              <Skeleton isLoaded={!isLoading}>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  data-cy="submit"
                  isDisabled={primaryEmailState.error || isLoading}
                >
                  {t("forms.elements.submit")}
                </Button>
              </Skeleton>
              <input
                type="hidden"
                {...register("legal_name")}
                value={legalName}
              />
              <input type="hidden" {...register("vat_id")} value={vatNumber} />
            </form>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
};

export default VenueSetup;
