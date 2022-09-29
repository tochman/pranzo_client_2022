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

const VoucherActions = ({ isModalOpen, toggleModal, voucher }) => {
  return (
    <section data-cy={`${voucher.code}-modal`}>
      <Modal isCentered isOpen={isModalOpen}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent>
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
              onClick={() => {
                ToggleModal();
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default VoucherActions;
