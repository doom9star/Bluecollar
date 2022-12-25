import { Dispatch, SetStateAction } from "react";

export enum Alerter {
  LOGIN_ERROR,
  REGISTER_ERROR,
  CREATE_JOB_SUCCESS,
}

export type AlertState = {
  alerter: Alerter | null;
  message: string;
};

export type TCtx = {
  alert: AlertState;
  setAlert: Dispatch<SetStateAction<AlertState>>;
  resetAlert: () => void;
};
