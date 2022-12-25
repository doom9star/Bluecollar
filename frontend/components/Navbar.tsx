import { Button } from "antd";
import { MeDocument, MeQuery, useLogoutMutation } from "../graphql/generated";
import Image from "next/image";
import { useApolloClient } from "@apollo/client";
import useNavigator from "../hooks/useNavigator";
import useReadQuery from "../hooks/useReadQuery";
import Link from "next/link";
import { HomeOutlined } from "@ant-design/icons";
import { StatusType } from "../graphql/types";
import produce from "immer";

function Navbar() {
  const client = useApolloClient();
  const { replace } = useNavigator();
  const [logout, { loading }] = useLogoutMutation({ fetchPolicy: "no-cache" });
  const user = useReadQuery<MeQuery>(MeDocument)?.me.user;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Welcome Home, {user?.name}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href={"/home"}>
          <a>
            <HomeOutlined />
          </a>
        </Link>
        <Link href={"/home/profile"}>
          <a>
            <Image src={"/noAvatar.jpg"} alt="avatar" width={30} height={30} />
          </a>
        </Link>
        <Button
          loading={loading}
          onClick={() => {
            logout().then(({ data }) => {
              if (data?.logout.status === StatusType.SUCCESS) {
                client.cache.updateQuery<MeQuery>(
                  { query: MeDocument },
                  (old) =>
                    produce(old, (draft) => {
                      if (draft?.me) draft.me.user = null;
                    })
                );
                replace("/");
              }
            });
          }}
        >
          logout
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
