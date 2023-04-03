'use client';

import React, {useState} from "react";
import {v4 as uuidv4} from 'uuid';

export type AddToast = {
  title: string;
  content?: string;
  duration?: number;
}

export type Toast = {
  id: string;
  title: string;
  content?: string;
  duration?: number;
}

export type ToastContextType = {
  showToast: (toast: AddToast) => void;
  clearToast: () => void;
}

export const ToastContext = React.createContext<ToastContextType>({
  showToast: () => null,
  clearToast: () => null
})

export function ToastContextProvider({children}: React.PropsWithChildren) {

  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: AddToast) => {
    const t = toasts;
    const createdToast: Toast = {
      id: uuidv4(),
      title: toast.title,
      content: toast.content,
      duration: toast.duration ?? 2000,
    }
    t.push(createdToast);
    console.log('SHOW TOAST !' + createdToast.id);
    setToasts(t);
    dismissToast(createdToast);
  }

  const dismissToast = (toast: Toast) => {
    setTimeout(() => {
      setToasts(toasts.filter((b) => b.id !== toast.id));
      console.log('HIDE TOAST !' + toast.id);
    }, toast.duration);
  }

  const clearToast = () => {

  }

  return (
    <ToastContext.Provider value={{showToast, clearToast}}>
      {children}
      <div className="toast">
        {toasts.map((t, index) => (
          <div key={'toast' + t.id + index} className="alert alert-info">
            <div>
              <span>{t.title} abc</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}