import { useTranslation } from "react-i18next";

const ServingsVoucherActions = () => {
  const { t } = useTranslation();
  return <div>{t('dashboard.content.vouchers.labels.servingsActions.mainLabel')}</div>;
};

export default ServingsVoucherActions;
