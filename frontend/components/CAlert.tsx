import { Alert, AlertProps } from "antd";
import React, { useEffect, useState } from "react";
import { useCtx } from "../context";
import { Alerter } from "../context/types";

type Props = {
  alerter: Alerter | null;
  type: AlertProps["type"];
};

const CAlert: React.FC<Props> = ({ alerter, type }) => {
  const { alert, resetAlert } = useCtx();
  const [timeoutTriggered, setTimeoutTriggered] = useState(false);
  useEffect(() => {
    if (alert.alerter === alerter && !timeoutTriggered) {
      setTimeoutTriggered(true);
      setTimeout(() => {
        resetAlert();
      }, 1000 * 60);
    }
  }, [alert, alerter, timeoutTriggered, resetAlert]);
  return (
    <>
      {alert.alerter === alerter && (
        <Alert
          message={alert.message}
          type={type}
          banner
          closable
          onClose={resetAlert}
          style={{ padding: "1rem" }}
        />
      )}
    </>
  );
};

export default CAlert;
