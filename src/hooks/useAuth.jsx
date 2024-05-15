import React, { useContext } from 'react';
import { AuthContext } from '../authprovider/Authprovider';

const useAuth = () => {
    const auth = useContext(AuthContext)
    return auth
};

export default useAuth;