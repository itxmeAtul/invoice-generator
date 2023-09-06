import React from "react";
import { ModalContextProps } from "../interface";

export default (): ModalContextProps => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState({});
  const [modalValue, setModalValue] = React.useState({});
  const handleModal = (
    content = false,
    value = false,
    dismissModal = false
  ) => {
    if (dismissModal) {
      setModal(dismissModal);
    } else {
      setModal(!modal);
    }

    if (content) {
      setModalContent(content);
      if (value) {
        setModalValue(value);
      }
    }
  };

  return { modal, handleModal, modalContent, modalValue };
};
