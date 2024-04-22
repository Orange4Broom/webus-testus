import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/config';

interface User {
  email: string;
}

interface AuthState {
  user: User | null;
  authIsReady: boolean;
}

interface DefaultLayoutProps {
  children: ReactNode;
}

export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

type AuthAction =
  | { type: 'LOGIN'; payload: any }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_IS_READY'; payload: any };

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: DefaultLayoutProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser
        ? {
            email: firebaseUser.email,
          }
        : null;

      dispatch({ type: 'AUTH_IS_READY', payload: user });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  console.log('state', state);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
