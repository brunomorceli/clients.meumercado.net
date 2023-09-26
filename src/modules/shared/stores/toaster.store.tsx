import { ReactNode } from "react";
import { create } from "zustand";

interface IMessageOptions {
  title?: string;
  duration?: number;
}

interface IMessage extends IMessageOptions {
  message?: string | ReactNode;
  type: "info" | "success" | "warning" | "error";
}

interface useToasterStoreProps {
  message: IMessage | null;
  success: (message: string | ReactNode, options?: IMessageOptions) => void;
  error: (message: string | ReactNode, options?: IMessageOptions) => void;
  warning: (message: string | ReactNode, options?: IMessageOptions) => void;
  info: (message: string | ReactNode, options?: IMessageOptions) => void;
}

export const useToasterStore = create<useToasterStoreProps>((set, get) => {
  function show(
    message: string | ReactNode,
    type: "info" | "success" | "warning" | "error",
    options: IMessageOptions
  ) {
    set({
      message: { message, ...options, type },
    });
  }

  return {
    message: null,
    success: (message: string | ReactNode, options = {}) =>
      show(message, "success", { title: "Mensagem", duration: 1500, ...options }),
    error: (message: string | ReactNode, options = {}) =>
      show(message, "error", { title: "Mensagem", ...options }),
    warning: (message: string | ReactNode, options = {}) =>
      show(message, "warning", { title: "Mensagem", ...options }),
    info: (message: string | ReactNode, options = {}) =>
      show(message, "info", { title: "Mensagem", ...options }),
  };
});
