import { useState } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToastify } from '../hooks/useToastify';

export const useLogin = () => {
  interface loginData {
    email: string;
    password: string;
  }

  const [error, setError] = useState<string | null>(null);
  const { dispatch } = useAuthContext();
  const { notify } = useToastify();

  const login = async ({ email, password }: loginData) => {
    try {
      setError(null);
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      notify('success', 'Uživatel byl přihlášen');
      dispatch({ type: 'LOGIN', payload: res.user });
    } catch (error) {
      notify('error', 'Špatný email nebo heslo');
      setError((error as Error).message);
    }
  };

  return {
    error,
    login,
  };
};
