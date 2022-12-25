import { Spin } from "antd";
import Head from "next/head";
import React, { Fragment } from "react";
import { Alerter } from "../context/types";
import { useMeQuery } from "../graphql/generated";
import useNavigator from "../hooks/useNavigator";
import CAlert from "./CAlert";
import Navbar from "./Navbar";

const Wrapper: React.FC = ({ children }) => {
  const { path } = useNavigator();
  const { loading } = useMeQuery();
  if (loading)
    return (
      <Spin
        style={{ position: "absolute", top: "50%", left: "50%" }}
        size="large"
      />
    );
  return (
    <Fragment>
      <Head>
        <title>Bluecollar</title>
      </Head>
      <CAlert alerter={Alerter.CREATE_JOB_SUCCESS} type="success" />
      <div
        style={{
          padding: "1rem",
        }}
      >
        {path.includes("home") && <Navbar />}
        {children}
      </div>
    </Fragment>
  );
};

export default Wrapper;
