import React, {createContext, useContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

interface AuthContextProps {
  uid: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps>({uid: ''});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [uid, setUid] = useState<string>('');

  useEffect(() => {
    const signInAnonymously = async () => {
      try {
        const {user} = await auth().signInAnonymously();
        setUid(user.uid);
      } catch (error) {
        console.error('Помилка анонімної автентифікації:', error);
      }
    };

    signInAnonymously();
  }, []);

  return <AuthContext.Provider value={{uid}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
