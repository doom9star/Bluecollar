import type { NextPage } from "next";
import Link from "next/link";
import { Fragment } from "react";
import { MeQuery, MeDocument } from "../graphql/generated";
import useNavigator from "../hooks/useNavigator";
import useReadQuery from "../hooks/useReadQuery";

const Landing: NextPage = () => {
  const { path } = useNavigator();
  const user = useReadQuery<MeQuery>(MeDocument)?.me.user;
  return (
    <div>
      {user ? (
        <Link href={`${path}/home`}>Home</Link>
      ) : (
        <Fragment>
          <Link href={`${path}auth/login`}>Login</Link>
          <Link href={`${path}auth/register`}>Register</Link>
        </Fragment>
      )}
    </div>
  );
};

export default Landing;
