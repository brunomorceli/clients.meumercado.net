/* eslint-disable react/display-name */
import { useToasterStore } from "../stores";
import React, { useEffect } from "react";
import { Notification, toaster } from "rsuite";
import { useStore } from "zustand";

const Message = React.forwardRef(({ type, title, message, ...rest }: any, ref) => {
  return (
    <Notification ref={ref as any} {...rest} type={type} header={title}>
      {message}
    </Notification>
  );
});

export function Toaster(props: any) {
  const toasterStore = useStore(useToasterStore);

  useEffect(() => {
    const msg = toasterStore.message;

    msg && toaster.push(<Message type={msg.type} message={msg.message} title={msg.title} />, { duration: msg.duration });
  }, [toasterStore.message]);

  return null;
}
