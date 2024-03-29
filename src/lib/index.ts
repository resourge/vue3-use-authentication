import useAuthentication from './hooks/useAuthentication';
import { usePermissions } from './hooks/usePermissions';

import AuthenticationProvider from './provider/AuthenticationProvider.vue';
import { useAuthenticationStorage } from './store/useAuthGlobalStore';

type AuthenticationProviderProps = {
    encrypted: boolean;
    encryptedSecret: string;
    localStorageSessionKey: string;
};

export {
    AuthenticationProvider, useAuthentication,
    useAuthenticationStorage,
    usePermissions, type AuthenticationProviderProps
};

