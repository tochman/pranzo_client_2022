import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ServingsVoucherActions from "./ServingsVoucherActions";
import CashVoucherActions from "./CashVoucherActions";
import { useSelector, useDispatch } from "react-redux";

import { createTransaction } from "../../state/features/vouchers";
import ActivateVoucherForm from "./ActivateVoucherForm";
import { useTranslation } from "react-i18next";
const VoucherActions = ({ isModalOpen, toggleModal, voucher, action }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const activateVoucherContent = (
    <>
      <ModalBody>
        <ActivateVoucherForm voucher={voucher} />
      </ModalBody>
      <ModalFooter>
        {/* <Button
          data-cy={`${voucher.code}-create-transaction`}
          onClick={() => {
            dispatch(createTransaction(voucher));
            toggleModal(!isModalOpen);
          }}
        >
          Create
        </Button> */}
      </ModalFooter>
    </>
  );

  const createTransactionContent = (
    <>
      <ModalBody>
        {voucher.variant == "servings" ? (
          <ServingsVoucherActions />
        ) : (
          <CashVoucherActions />
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          data-cy={`${voucher.code}-create-transaction`}
          onClick={() => {
            dispatch(createTransaction(voucher));
            toggleModal(!isModalOpen);
          }}
        >
          Create
        </Button>
      </ModalFooter>
    </>
  );

  return (
    <Modal isCentered isOpen={isModalOpen}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <ModalContent data-cy={`${voucher.code}-modal`}>
        <ModalHeader>
          {t("dashboard.content.vouchers.table.code")}{": "} {voucher.code} -{" "}
          <Text as="small"> 
          {voucher.variant}
          </Text>
        </ModalHeader>
        <ModalCloseButton
          onClick={() => {
            toggleModal(!isModalOpen);;
          }}
        />
        {action === "createTransaction" && createTransactionContent}
        {action === "activateVoucher" && activateVoucherContent}
      </ModalContent>
    </Modal>
  );
};

export default VoucherActions;
