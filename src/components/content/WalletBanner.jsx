import { Image, Text, Center } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import SwedishLogo from "../../assets/add_to_wallets_swe.png";
import EnglishLogo from "../../assets/add_to_wallets_en.png";

const WalletBanner = ({ width, height, rest }) => {
  const { i18n, t } = useTranslation();

  return (
    <>
      <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
        {t("hero.walletsPromoText")}
      </Text>
      <Center>
        {i18n.language === "GB" ? (
          <Image
            htmlWidth={width ? width : "410px"}
            htmlHeight={height ? height : "auto"}
            objectFit="fit"
            src={EnglishLogo}
            {...rest}
          />
        ) : (
          <Image
            htmlWidth={width ? width : "410px"}
            htmlHeight={height ? height : "auto"}
            objectFit="fit"
            src={SwedishLogo}
            {...rest}
          />
        )}
      </Center>
    </>
  );
};

export default WalletBanner;
