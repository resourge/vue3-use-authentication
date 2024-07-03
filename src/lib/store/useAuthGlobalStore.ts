/* eslint-disable @typescript-eslint/no-explicit-any */
import { Ref, computed, reactive, ref, toRefs, watch } from 'vue';
import { useLocalStorage } from '../hooks/useLocalStorage';

type AuthenticationProviderProps = {
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
      state.value = storedData;
      if(state.value.token) {
        onRefreshToken(state.value.token)
      }
    }
  } catch  (error) {
    // resetting the localstorage
    clearValue(localStorageSessionKey)
    // eslint-disable-next-line no-console
    console.warn('Failed to load information from local storage.', error);
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

export function useAuthenticationStorage<U, P>({ localStorageSessionKey, onRefreshToken }: AuthenticationProviderProps) {
  const { clearValue, getValue, setValue } = useLocalStorage()

  const state = createState<U, P>({
    localStorageSessionKey,
    getValue,
    clearValue,
    onRefreshToken
  });

  const loginAction = login(state, localStorageSessionKey, setValue);
  const logoutAction = logout(state, localStorageSessionKey, clearValue);

  const isAuthenticated = computed(() => !!state.value.token).value;

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

export function useGlobalStore<U, P>({ localStorageSessionKey, onRefreshToken }: AuthenticationProviderProps) {
  const { clearValue, getValue, setValue } = useLocalStorage()

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