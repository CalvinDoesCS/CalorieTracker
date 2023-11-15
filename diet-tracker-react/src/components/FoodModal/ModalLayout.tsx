import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  formId: string;
  headerName: string;
  buttonName: string;
  children?: ReactNode;
}

const ModalLayout = ({
  isOpen,
  onClose,
  headerName,
  buttonName,
  formId,
  children,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{children}</ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            form={formId}
            mx={2}
          >
            {buttonName}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
