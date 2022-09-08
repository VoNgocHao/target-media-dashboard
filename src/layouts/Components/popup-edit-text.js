import React from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from "reactstrap";

export default function PopupEditText(props) {
  const { visible, onClose, onConfirm, header, title } = props;

  return (
    <Modal size="md" isOpen={visible}>
      <ModalHeader>{header} </ModalHeader>
      <ModalBody>{title}</ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-small btn-light"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
          <Button
            className="bg-gradient-primary"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => onConfirm()}
          >
            Confirm
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
