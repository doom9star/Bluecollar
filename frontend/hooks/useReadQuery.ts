import { useApolloClient } from "@apollo/client";
import { DocumentNode } from "graphql";

export default function useReadQuery<TQuery>(
  document: DocumentNode,
  variables?: { [k: string]: any }
) {
  const client = useApolloClient();
  const query = client.readQuery<TQuery>({ query: document, variables });
  return query;
}
