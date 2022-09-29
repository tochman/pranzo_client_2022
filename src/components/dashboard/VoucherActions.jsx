import {
  Button,
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
const VoucherActions = ({ isModalOpen, toggleModal, voucher }) => {
  const dispatch = useDispatch();

  return (
    <Modal isCentered isOpen={isModalOpen}>
      <ModalOverlay
        bg="blackAlpha.300"
        backdropInvert="80%"
        backdropBlur="2px"
      />
      <ModalContent data-cy={`${voucher.code}-modal`}>
        <ModalHeader>
          Code: {voucher.code} - {voucher.variant}
        </ModalHeader>
        <ModalCloseButton
          onClick={() => {
            toggleModal();
          }}
        />
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
              toggleModal(!isModalOpen)
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VoucherActions;
