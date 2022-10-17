import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  Input,
  Select,
  Container,
  Text,
  Box,
  Heading,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateReport } from "../../state/features/reports";
import { getWindowSize } from "../../state/utilities/utilities";

import { pdfjs, Document, Page } from "react-pdf";

const ReportCreate = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { vendor } = useSelector((state) => state.user);
  const [reportData, setReportData] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber] = useState(1);
  const [windowSize, setWindowSize] = useState(getWindowSize());



  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  
  const handleFormSubmit = (data) => {
    dispatch(generateReport(data)).then((response) => {
      response.payload.report_as_base64 &&
      setReportData(response.payload.report_as_base64);
    });
  };

  return (
    <Container m={2}>
      <Heading as={"h1"} size={"lg"}>
        {t("forms.elements.report.mainHeader")}
      </Heading>
      <form data-cy="create-report" onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          type={"hidden"}
          id="vendor"
          {...register("vendor", { value: vendor.id })}
        />
        <FormControl>
          <RadioGroup
            name="command"
            id="command"
            data-cy="command"
            defaultValue={"preview"}
          >
            <Stack direction="row">
              <Radio {...register("command")} value="preview">
                {t("forms.elements.report.preview")}
              </Radio>
              <Radio {...register("command")} value="deliver">
                {t("forms.elements.report.deliver")}
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl mt={3}>
          <FormLabel htmlFor="variant">
            {t("forms.elements.report.variant")}
          </FormLabel>
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
          <FormHelperText>
            {t("forms.elements.report.variantHelper")}
          </FormHelperText>
        </FormControl>

        <Button
          data-cy="submit-form"
          type="submit"
          colorScheme="pink"
          mt={4}
          isLoading={isSubmitting}
        >
          {t("forms.elements.submit")}
        </Button>
      </form>
      {reportData && (
        <>
          <Box maxWidth={{ base: "100%" }}>
            {pageNumber && (
              <Box m={1}>
                <Text as={"small"}>
                  {t("forms.elements.report.pages", {
                    page: pageNumber,
                    pagesTotal: numPages,
                  })}
                </Text>
              </Box>
            )}
            <Document
              file={`data:application/pdf;base64,${reportData}`}
              loading={<Text>{t("forms.elements.report.loading")}</Text>}
              error={<Text>{t("forms.elements.report.loadingError")}</Text>}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} width={windowSize.innerWidth * 0.9} />
            </Document>
          </Box>
        </>
      )}
      <Divider mb={"20px"} />
    </Container>
  );
};

export default ReportCreate;
