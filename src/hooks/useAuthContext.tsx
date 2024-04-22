import { useContext } from 'react';
import { AuthContext } from '../components/context/Authcontext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  console.log('context', context);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};
