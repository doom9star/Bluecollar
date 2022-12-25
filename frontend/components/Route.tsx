import React from "react";
import { MeDocument, MeQuery } from "../graphql/generated";
import useNavigator from "../hooks/useNavigator";
import useReadQuery from "../hooks/useReadQuery";

export const PrivateRoute: React.FC = ({ children }) => {
  const { replace } = useNavigator();
  const user = useReadQuery<MeQuery>(MeDocument)?.me.user;
  if (!user) {
    replace("/auth/login");
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};

export const PublicRoute: React.FC = ({ children }) => {
  const { replace } = useNavigator();
  const user = useReadQuery<MeQuery>(MeDocument)?.me.user;
  if (user) {
    replace("/home");
    return null;
  }
  return <React.Fragment>{children}</React.Fragment>;
};
