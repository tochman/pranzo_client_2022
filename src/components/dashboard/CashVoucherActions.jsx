import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const CashVoucherActions = ({ setAmount }) => {
  const { t } = useTranslation();

  return (
    <>
      <FormControl>
        <FormLabel>{t("forms.elements.cashAmount")}</FormLabel>
        <Input
          data-cy="transaction-amount"
          width={"200px"}
          onChange={(event) => setAmount(parseInt(event.target.value))}
        />
        <FormHelperText>{t("forms.elements.cashAmountHelper")}</FormHelperText>
      </FormControl>
    </>
  );
};

export default CashVoucherActions;
