import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql";
import Wrapper from "../components/Wrapper";
import CtxProvider from "../context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <CtxProvider>
        <Wrapper>
          <Component {...pageProps} />;
        </Wrapper>
      </CtxProvider>
    </ApolloProvider>
  );
}

export default MyApp;
