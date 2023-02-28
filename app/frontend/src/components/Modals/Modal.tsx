import React, {useRef} from "react";
import {useOnClickOutside} from "@/hooks/useOnClickOutside";

export type ModalProps = {
  open: boolean;
  onDismiss?: () => void;
}

export default function Modal(props: React.PropsWithChildren<ModalProps>) {

  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, () => {
    if (!props.open || !props.onDismiss)
      return;
    props.onDismiss();
  })

  return (
    <div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle"/>
      <label htmlFor="my-modal-4" className={`modal ${props.open ? 'modal-open' : ''}`}>
        <label className="modal-box relative"  ref={modalRef}>
          {props.children}
        </label>
      </label>
    </div>
  )
}