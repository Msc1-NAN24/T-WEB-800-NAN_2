'use client'

import Modal from "@/components/Modals/Modal";
import {useState} from "react";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(!open)}>Hello World</button>
      <Modal open={open} onDismiss={() => setOpen(false)}>
        <div>
          Hello World
        </div>
      </Modal>
    </>
  )
}