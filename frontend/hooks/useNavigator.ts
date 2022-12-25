import { useRouter } from "next/router";

export default function useNavigator() {
  const router = useRouter();
  return {
    push: router.push,
    replace: router.replace,
    back: router.back,
    path: router.asPath,
  };
}
