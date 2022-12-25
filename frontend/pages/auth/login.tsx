import { useApolloClient } from "@apollo/client";
import { Button, Input } from "antd";
import { Form, Formik } from "formik";
import produce from "immer";
import React from "react";
import CAlert from "../../components/CAlert";
import { PublicRoute } from "../../components/Route";
import { useCtx } from "../../context";
import { Alerter } from "../../context/types";
import { MeDocument, MeQuery, useLoginMutation } from "../../graphql/generated";
import { StatusType } from "../../graphql/types";
import useNavigator from "../../hooks/useNavigator";

function Login() {
  const client = useApolloClient();
  const { alert, setAlert, resetAlert } = useCtx();
  const { replace, back } = useNavigator();
  const [login] = useLoginMutation({ fetchPolicy: "no-cache" });

  return (
    <PublicRoute>
      <CAlert alerter={Alerter.LOGIN_ERROR} type="error" />
      <h1>Login</h1>
      <Formik
        initialValues={{
          nameOrEmail: "",
          password: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (values.nameOrEmail.trim().length < 3)
            errors.nameOrEmail = "Must be atleast 3 characters long!";
          if (values.password.trim().length < 3)
            errors.password = "Must be atleast 3 characters long!";
          return errors;
        }}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setErrors, setSubmitting }) => {
          if (alert.alerter === Alerter.LOGIN_ERROR) resetAlert();
          login({
            variables: values,
          }).then(({ data }) => {
            if (data?.login.status === StatusType.SUCCESS) {
              client.cache.updateQuery<MeQuery>({ query: MeDocument }, (old) =>
                produce(old, (draft) => {
                  if (draft?.me) {
                    draft.me.user = data.login.user;
                    draft.me.status = data.login.status;
                    draft.me.errors = data.login.errors;
                  }
                })
              );
              replace(`/home`);
            } else if (data?.login.errors) {
              const error = data.login.errors[0];
              if (error.field === "general")
                setAlert({
                  alerter: Alerter.LOGIN_ERROR,
                  message: error.message,
                });
              else setErrors({ [error.field]: error.message });
              setSubmitting(false);
            }
          });
        }}
      >
        {({ handleChange, values, errors, isSubmitting, handleReset }) => (
          <Form>
            <Input
              name="nameOrEmail"
              value={values.nameOrEmail}
              placeholder="Name/Email"
              onChange={handleChange}
            />
            {errors.nameOrEmail && (
              <p style={{ color: "red" }}>{errors.nameOrEmail}</p>
            )}
            <Input
              value={values.password}
              name="password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
            <Button htmlType="submit" type="primary" loading={isSubmitting}>
              login
            </Button>
            <Button onClick={back}>cancel</Button>
            <Button onClick={handleReset}>reset</Button>
          </Form>
        )}
      </Formik>
    </PublicRoute>
  );
}

export default Login;
