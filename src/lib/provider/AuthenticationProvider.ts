// authenticationProvider.ts
import { Ref, computed, inject, provide, readonly } from 'vue';
import { Store, useAuthenticationStorage } from '../store/useAuthGlobalStore'; // Import your existing code

const AUTH_SYMBOL_KEY = 'AuthenticationContext'

type AuthenticationProviderProps = {
  encrypted: boolean;
  encryptedSecret: string;
  localStorageSessionKey: string;
  onRefreshToken: (token: string) => void;
};

const AuthenticationSymbol = Symbol(AUTH_SYMBOL_KEY);

export const provideAuthentication = async (props: AuthenticationProviderProps) => {
  const authentication = await useAuthenticationStorage(props);

  provide(AuthenticationSymbol, authentication);
};

export const useAuthenticationProvider = <U, P>() => {
  const authentication = inject<Store<U,P>>(AuthenticationSymbol);

  if (!authentication) {
    throw new Error('useAuthenticationProvider must be used within a component with provideAuthentication.');
  }

  const isAuthenticated = readonly(computed(() => !!authentication.state.token));

  // added readonly for auth state where cannot be mutated internally unless the user make the login again
  // only actions can mutate state
  return {
    isAuthenticated: readonly(isAuthenticated),
    profile: authentication.state.profile as U as unknown as Ref<U>,
    login: authentication.login,
    logout: authentication.logout
  };
};

export const usePermissionsProvider = <U, P>() => {
  const authentication = inject<Store<U, P>>(AuthenticationSymbol);

  if (!authentication) {
    throw new Error('usePermissionsProvider must be used within a component with provideAuthentication.');
  }

  // @ts-expect-error no type ref
  return authentication.state.permissions.value as unknown as P;
};
