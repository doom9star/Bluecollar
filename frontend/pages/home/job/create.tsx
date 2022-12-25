import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useApolloClient } from "@apollo/client";
import { Button, Input, TimePicker } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Field, Form, Formik } from "formik";
import produce from "immer";
import moment from "moment";
import React, { useState } from "react";
import { PrivateRoute } from "../../../components/Route";
import { useCtx } from "../../../context";
import { Alerter } from "../../../context/types";
import {
  MeDocument,
  MeQuery,
  useCreateJobMutation,
} from "../../../graphql/generated";
import { ExperienceType, JobType, StatusType } from "../../../graphql/types";
import useNavigator from "../../../hooks/useNavigator";
import useReadQuery from "../../../hooks/useReadQuery";

function CreateJob() {
  const { setAlert } = useCtx();
  const client = useApolloClient();
  const { replace, back } = useNavigator();
  const user = useReadQuery<MeQuery>(MeDocument)?.me.user;
  const [createJob] = useCreateJobMutation({ fetchPolicy: "no-cache" });

  const [workingHours, setWorkingHours] = useState({
    start: moment("00:00:00", "HH:mm:ss"),
    end: moment("00:00:00", "HH:mm:ss"),
  });

  const [sampleCharges, setSampleCharges] = useState<
    { sample: string; charge: number }[]
  >([{ sample: "", charge: 0 }]);

  return (
    <PrivateRoute>
      <h1>Create Job</h1>
      <Formik
        initialValues={{
          type: JobType.DRIVER,
          address: "",
          contact: 0,
          experience: ExperienceType.BELOW1,
          available: "",
          extraInfo: "",
        }}
        validate={(values) => {
          const errors: any = {};
          if (values.address.trim().length === 0)
            errors.address = "Must not be empty!";
          if (values.contact.toString().length !== 10)
            errors.contact = "Must be 10 numbers long!";
          if (user?.jobs.find((j) => j.type === values.type))
            errors.type = "Job with this type already exists!";
          return errors;
        }}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          createJob({
            variables: {
              input: {
                ...values,
                available: !!values.available,
                start: workingHours.start.toISOString(true),
                end: workingHours.end.toISOString(true),
                sampleCharges: JSON.stringify(sampleCharges),
              },
            },
          }).then(({ data }) => {
            if (data?.createJob.status === StatusType.SUCCESS) {
              client.cache.updateQuery<MeQuery>({ query: MeDocument }, (old) =>
                produce(old, (draft) => {
                  if (draft?.me.user) {
                    draft.me.user.jobs.unshift(data.createJob.job!);
                  }
                })
              );
              setAlert({
                alerter: Alerter.CREATE_JOB_SUCCESS,
                message: `Your Job as "${data.createJob.job?.type}" has been successfully posted!`,
              });
              replace(`/home/profile`);
            }
          });
        }}
      >
        {({ handleChange, isSubmitting, handleReset, errors, values }) => (
          <Form>
            <div>
              <p>Type</p>
              <Field as="select" name="type">
                {Object.keys(JobType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Field>
            </div>
            {errors.type && <p style={{ color: "red" }}>{errors.type}</p>}
            <Input
              name="contact"
              type="number"
              placeholder="eg: 9980847695"
              onChange={handleChange}
              id="contact-input"
              list="contact-suggestions"
            />
            <datalist id="contact-suggestions">
              {user?.jobs.map((j) => (
                <option value={j.contact} key={j.contact} />
              ))}
            </datalist>
            {errors.contact && <p style={{ color: "red" }}>{errors.contact}</p>}
            <div>
              <p>Experience</p>
              <Field as="select" name="experience">
                {Object.values(ExperienceType).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Field>
            </div>
            <Input
              name="address"
              placeholder="Address"
              onChange={handleChange}
              id="address-input"
              list="address-suggestions"
            />
            <datalist id="address-suggestions">
              {user?.jobs.map((j) => (
                <option value={j.address} key={j.address} />
              ))}
            </datalist>
            {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
            <div>
              <p>Working Hours</p>
              <TimePicker.RangePicker
                value={[workingHours.start, workingHours.end]}
                onChange={(vals) => {
                  setWorkingHours({
                    start: vals?.[0] ? vals[0] : workingHours.start,
                    end: vals?.[1] ? vals[1] : workingHours.end,
                  });
                }}
                showSecond={false}
              />
            </div>

            <div>
              <p>Availability</p>
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <label>
                  <Field
                    type="radio"
                    name="available"
                    value={"yes"}
                    checked="checked"
                  />
                  Available
                </label>
                <label>
                  <Field type="radio" name="available" value={""} />
                  Unavailable
                </label>
              </div>
            </div>
            <div>
              <p>Sample Charges</p>
              {sampleCharges.map((sc, idx) => (
                <div
                  style={{ display: "flex", width: "500px" }}
                  key={sc.sample}
                >
                  <Input
                    placeholder="Sample"
                    value={sc.sample}
                    autoFocus
                    onChange={(e) => {
                      const _ = [...sampleCharges];
                      _[idx].sample = e.target.value;
                      setSampleCharges(_);
                    }}
                  />
                  <Input
                    placeholder="₹ Charge"
                    type={"number"}
                    value={sc.charge}
                    onChange={(e) => {
                      const _ = [...sampleCharges];
                      _[idx].charge = e.target.valueAsNumber;
                      setSampleCharges(_);
                    }}
                  />
                  <PlusCircleOutlined
                    onClick={() => {
                      setSampleCharges(
                        sampleCharges.concat({ sample: "", charge: 0 })
                      );
                    }}
                  />
                  {idx > 0 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        setSampleCharges(
                          sampleCharges.slice(0, sampleCharges.length - 1)
                        );
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
            <TextArea
              placeholder="Extra Information..."
              value={values.extraInfo}
              rows={4}
              onChange={handleChange}
            />
            <Button htmlType="submit" type="primary" loading={isSubmitting}>
              create
            </Button>
            <Button onClick={back}>cancel</Button>
            <Button onClick={handleReset}>reset</Button>
          </Form>
        )}
      </Formik>
    </PrivateRoute>
  );
}

export default CreateJob;
