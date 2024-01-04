import { FC, ReactNode } from "react";

// import { useAppDispatch } from "@/app/providers/rtk-provider";
// import { get } from "@/features/serve";

type AppRouterProps = {
  children: ReactNode;
};

export const AppRouter: FC<AppRouterProps> = ({ children }) => {
  // TODO демонстрация обновления токена
  // const [token] = useState(window.localStorage.getItem("token"));
  //
  // const dispatch = useAppDispatch();
  //
  // useEffect(() => {
  //   if (token) {
  //     dispatch(get({}));
  //   }
  // }, [token]);

  return <main className="bb__main">{children}</main>;
};
