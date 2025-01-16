/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, computed, reactive, ref, toRefs, watch } from 'vue';
import { useLocalStorage } from '../hooks/useLocalStorage';

type AuthenticationProviderProps = {
  encrypted: boolean;
  encryptedSecret: string;
  localStorageSessionKey: string;
  onRefreshToken: (token: string) => void;
};

export type State<U, P> = {
  cookieRef: string | null;
  permissions: P;
  profile: U;
  token: string | null;
};


export type Store<U, P> = {
  isAuthenticated: boolean
  login: (profile: U, permissions: P, token: string, cookieRef: string) => void;
  logout: () => void;
  state: State<U, P>;
};

type AuthenticationStorage = {
  clearValue: (string: string) => void,
  getValue: (string: string) => string | null,
  localStorageSessionKey: string
  onRefreshToken: (token: string) => void;
}

/**
 * Checks if the token is valid and not expired.
 * @param token - JWT token.
 * @returns boolean - True if the token is valid, false otherwise.
 */
const isTokenValid = (token: string): boolean => {
  try {
    // Split the token into parts: header, payload, and signature
    const [, payload] = token.split('.');
    if (!payload) {
      throw new Error('Invalid token structure.');
    }

    // Decode the payload from Base64
    const decodedPayload = JSON.parse(atob(payload));

    // Check if the 'exp' field exists and verify expiration
    if (!decodedPayload.exp) {
      throw new Error('Token has no expiration field.');
    }
    const isExpired = Date.now() >= decodedPayload.exp * 1000;
    return !isExpired;
  } catch (error) {
    return false;
  }
};

const createState = <U, P>({ localStorageSessionKey, getValue, clearValue, onRefreshToken }: AuthenticationStorage) => {
  // @ts-expect-error no type
  const state: Ref<State<U, P>> = ref(
    reactive<State<U, P>>({
      profile: {} as U,
      permissions: {} as P,
      token: null,
      cookieRef: null
    })
  );

  // Load data from local storage on store initialization
  try {
    const storedData = getValue(localStorageSessionKey) as unknown as State<U, P>;
    if (storedData) {
      if(storedData && storedData.token && isTokenValid(storedData.token)) {
        state.value = storedData;
        onRefreshToken(storedData.token)
      } else {
        throw new Error('Invalid/Expired token')
      }
    }
  } catch {
    // resetting the localstorage
    clearValue(localStorageSessionKey)
  }

  return state;
};

const login = <U, P>(state: Ref<State<U, P>>, storageKey: string, setValue: (key: string, value: any) => void) => (profile: U, permissions: P, token: string, cookieRef: string) => {
  state.value.profile = profile;
  state.value.permissions = permissions;
  state.value.token = token;
  state.value.cookieRef = cookieRef;

  // Save data to local storage when the store changes
  setValue(storageKey, JSON.stringify(state.value));
};

const logout = <U, P>(state: Ref<State<U, P>>, storageKey: string, clearValue: (key: string) => void) => () => {
  state.value.profile = {} as U;
  state.value.permissions = {} as P;
  state.value.token = null;
  state.value.cookieRef = null;

  // Remove data from local storage
  clearValue(storageKey);
};

export function useAuthenticationStorage<U, P>({ encrypted, localStorageSessionKey, encryptedSecret, onRefreshToken }: AuthenticationProviderProps) {
  const { clearValue, getValue, setValue } = useLocalStorage({ encrypted, encryptedSecret })

  const state = createState<U, P>({
    localStorageSessionKey,
    getValue,
    clearValue,
    onRefreshToken
  });

  const loginAction = login(state, localStorageSessionKey, setValue);
  const logoutAction = logout(state, localStorageSessionKey, clearValue);

  const isAuthenticated = computed(() => !!state.value.token);

  watch(
    () => state,
    (newValue) => {
      // updating localstorage
      setValue(localStorageSessionKey, JSON.stringify(newValue.value));
    },
    { deep: true }
  )

  return {
    state: toRefs(state.value),
    isAuthenticated,
    login: loginAction,
    logout: logoutAction
  };
}

export function useGlobalStore<U, P>({ encrypted, localStorageSessionKey, onRefreshToken }: AuthenticationProviderProps) {
  const { clearValue, getValue, setValue } = useLocalStorage({ encrypted })

  const state = createState<U, P>({
    localStorageSessionKey,
    getValue,
    clearValue,
    onRefreshToken
  });

  const loginAction = login<U, P>(state, localStorageSessionKey, setValue);
  const logoutAction = logout<U, P>(state, localStorageSessionKey, clearValue);

  return {
    state: toRefs(state.value),
    login: loginAction,
    logout: logoutAction
  };
}