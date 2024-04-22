import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToastify } from '../hooks/useToastify';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { notify } = useToastify();
  const logout = () => {
    signOut(auth)
      .then(() => {
        notify('success', 'Uživatel byl odhlášen');
        dispatch({ type: 'LOGOUT' });
      })
      .catch((error) => {
        notify('error', 'Odhlášení se nezdařilo');
        console.log(error.message);
      });
  };

  return { logout };
};
