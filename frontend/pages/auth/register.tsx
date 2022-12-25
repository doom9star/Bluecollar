import { useApolloClient } from "@apollo/client";
import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Field, Form, Formik } from "formik";
import produce from "immer";
import React, { useState } from "react";
import CAlert from "../../components/CAlert";
import { PublicRoute } from "../../components/Route";
import { useCtx } from "../../context";
import { Alerter } from "../../context/types";
import {
  MeDocument,
  MeQuery,
  useRegisterMutation,
} from "../../graphql/generated";
import { GenderType, StatusType } from "../../graphql/types";
import useNavigator from "../../hooks/useNavigator";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

function Register() {
  const client = useApolloClient();
  const { alert, setAlert, resetAlert } = useCtx();
  const { replace, back } = useNavigator();
  const [register] = useRegisterMutation({ fetchPolicy: "no-cache" });

  const [location, setLocation] = useState({
    country: "",
    state: "",
  });

  return (
    <PublicRoute>
      <CAlert alerter={Alerter.REGISTER_ERROR} type="error" />
      <h1>Register</h1>
      <Formik
        initialValues={{
          name: "",
          gender: GenderType.OTHER,
          email: "",
          password: "",
          confirmPassword: "",
          description: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (values.name.trim().length < 3)
            errors.name = "Must be atleast 3 characters long!";
          if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
              values.email.trim()
            )
          )
            errors.email = "Email is required!";
          if (values.password.trim().length < 3)
            errors.password = "Must be atleast 3 characters long!";
          else if (values.confirmPassword.trim() !== values.password.trim())
            errors.confirmPassword = "Passwords must match!";
          return errors;
        }}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(
          { confirmPassword: _, ...others },
          { setErrors, setSubmitting }
        ) => {
          if (alert.alerter === Alerter.REGISTER_ERROR) resetAlert();
          register({
            variables: {
              ...others,
              location: `${location.state}, ${location.country}`,
            },
          }).then(({ data }) => {
            if (data?.register.status === StatusType.SUCCESS) {
              client.cache.updateQuery<MeQuery>({ query: MeDocument }, (old) =>
                produce(old, (draft) => {
                  if (draft?.me) {
                    draft.me.user = data.register.user;
                    draft.me.status = data.register.status;
                    draft.me.errors = data.register.errors;
                  }
                })
              );
              replace(`/home`);
            } else if (data?.register.errors) {
              const error = data.register.errors[0];
              if (error.field === "general")
                setAlert({
                  alerter: Alerter.REGISTER_ERROR,
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
              name="name"
              value={values.name}
              placeholder="Name"
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <Input
              name="email"
              value={values.email}
              placeholder="Email"
              type="email"
              onChange={handleChange}
            />
            {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
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
            <Input
              value={values.confirmPassword}
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
            <div>
              <p>Gender</p>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <label>
                  <Field
                    type="radio"
                    name="gender"
                    value={GenderType.MALE}
                    checked="checked"
                  />
                  Male
                </label>
                <label>
                  <Field type="radio" name="gender" value={GenderType.FEMALE} />
                  Female
                </label>
                <label>
                  <Field type="radio" name="gender" value={GenderType.OTHER} />
                  Other
                </label>
              </div>
            </div>
            <div>
              <p>Location</p>
              <CountryDropdown
                value={location.country}
                onChange={(value) =>
                  setLocation((prev) => ({ ...prev, country: value }))
                }
              />
              <RegionDropdown
                country={location.country}
                value={location.state}
                onChange={(value) =>
                  setLocation((prev) => ({ ...prev, state: value }))
                }
              />
            </div>
            <TextArea
              placeholder="Something about you..."
              value={values.description}
              rows={4}
              onChange={handleChange}
            />
            <Button htmlType="submit" type="primary" loading={isSubmitting}>
              register
            </Button>
            <Button onClick={back}>cancel</Button>
            <Button onClick={handleReset}>reset</Button>
          </Form>
        )}
      </Formik>
    </PublicRoute>
  );
}

export default Register;
