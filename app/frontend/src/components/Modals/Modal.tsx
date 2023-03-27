import React, {useRef} from "react";
import {useOnClickOutside} from "@/hooks/useOnClickOutside";

export type ModalProps = {
  open: boolean;
  onDismiss?: () => void;
  disableOutside?: boolean;
}

export default function Modal(props: React.PropsWithChildren<ModalProps>) {

  const modalRef = useRef<any>();

  useOnClickOutside(modalRef, () => {
    if (!props.open || !props.onDismiss || props.disableOutside)
      return;
    props.onDismiss();
  })

  return (
    <div className={"z-50"}>
      <input type="checkbox" id="my-modal-4" className="modal-toggle"/>
      <label htmlFor="my-modal-4" className={`modal ${props.open ? 'modal-open' : ''}`}>
        <label className="modal-box relative"  ref={modalRef}>
          {props.children}
        </label>
      </label>
    </div>
  )
}