"use client";
import { FC, ReactNode, useLayoutEffect } from "react";
interface ModalProps {
  children: ReactNode;
}
const Modal: FC<ModalProps> = (props) => {
  useLayoutEffect((): (() => void) => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return <div className="modal-overlay">{props.children}</div>;
};

export default Modal;
