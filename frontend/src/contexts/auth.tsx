/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "~/lib";

export enum AuthStatus {
  LOADING = "LOADING",
  SIGNED_IN = "SIGNED_IN",
  SIGNED_OUT = "SIGNED_OUT",
}

type Auth = {
  status: AuthStatus;
  setStatus: React.Dispatch<React.SetStateAction<AuthStatus>>;
};

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<Auth>({} as Auth);

export const AuthProvider = (props: AuthProviderProps) => {
  const [status, setStatus] = useState(AuthStatus.LOADING);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      firebaseAuth,
      async (firebaseUser) => {
        if (firebaseUser) {
          setStatus(AuthStatus.SIGNED_IN);
        } else {
          setStatus(AuthStatus.SIGNED_OUT);
        }
      },
    );

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const value = useMemo(() => ({ status, setStatus }), [status]);

  return (
    <AuthContext.Provider value={value} {...props}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
