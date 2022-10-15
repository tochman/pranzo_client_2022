import {
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Select,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { generateReport } from "../../state/features/reports";
import { base64toBlob } from "../../state/utilities/utilities";

import { pdfjs, Document, Page } from 'react-pdf';
import { useEffect } from "react";

const ReportCreate = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { vendor } = useSelector((state) => state.user);
  const [reportData, setReportData] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const handleFormSubmit = (data) => {
    dispatch(generateReport(data)).then((response) => {
      setReportData(response.payload.report_as_base64);
    });
  };
  let url

  useEffect(() => {
     url = URL.createObjectURL(base64toBlob(reportData))
  }, [reportData])
  

  return (
    <Container m={2}>
    
      <Heading as={"h1"} size={"lg"}>
        Create report
      </Heading>
      <form data-cy="create-report" onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          type={"hidden"}
          id="vendor"
          {...register("vendor", { value: vendor.id })}
        />
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
         <Document file={`data:application/pdf;base64,${reportData}`} onLoadSuccess={onDocumentLoadSuccess}>
           <Page pageNumber={pageNumber} />
         </Document>
         <p>
           Page {pageNumber} of {numPages}
         </p>
       </>
      )}
    </Container>
  );
};

export default ReportCreate;
