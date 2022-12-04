import { ViewUserModelDto } from "api/axios-client";
import axios from "axios";
import { useAsync } from "hooks/useAsync";
import {
  useContext,
  ReactNode,
  useCallback,
  useEffect,
  createContext,
  useMemo,
  Suspense,
} from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "utils/auth";
import * as auth from "../utils/auth";

const bootstrapAppData = async () => {
  let user = null;
  const token = await getToken();
  try {
    if (token) {
      const {
        data: { email, id, login, password },
      } = await axios.get<ViewUserModelDto>(
        `/User/Get/${localStorage.getItem(auth.actualUserIdKey)}`
      );

      user = {
        email,
        id,
        login,
        password,
      };
    }
    return user;
  } catch (err) {
    auth.logout();
    throw new Error("Fix api");
  }
};

interface AuthContextType {
  user?: ViewUserModelDto[] | null;
  login: (form: any) => Promise<{
    data: any;
  }>;
  logout: () => void;
  refreshUser: () => void;
}

const AuthContext = createContext({} as AuthContextType);
interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const {
    data: user,
    status,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync<ViewUserModelDto[]>();

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = useCallback(
    (form: any) =>
      auth.login(form).then((data) => {
        setData({
          data,
        });
        return {
          data,
        };
      }),
    [setData]
  );

  const refreshUser = useCallback(
    () => bootstrapAppData().then((data) => setData(data)),
    [setData]
  );

  const navigate = useNavigate();

  const logout = useCallback(() => {
    navigate("/", { replace: true });
    auth.logout();
    setData(null);
  }, [navigate, setData]);

  const value = useMemo(
    () => ({ user, login, logout, refreshUser }),
    [login, logout, user, refreshUser]
  );

  if (isLoading || isIdle) {
    return <img src="/loader.svg" className="mx-auto mt-12" alt="loader" />;
  }

  if (isError) {
    return (
      <Suspense
        fallback={
          <img src="/loader.svg" className="mx-auto mt-12" alt="loader" />
        }
      >
        error
      </Suspense>
    );
  }

  if (isSuccess) {
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
