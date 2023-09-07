"use client";
import React, { useState, createContext, useEffect } from "react";
import { useRouter } from 'next/navigation'

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobileNo: string;
}

interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => {},
  });

function AuthContext({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });

    try {
      const response: any = await fetch("http://localhost:3000/api/user-registration/me").then(res=>res.json());
      if(response.user) router.push('/')
      setAuthState({
        data: response.user,
        error: null,
        loading: false,
      });
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthContext;
