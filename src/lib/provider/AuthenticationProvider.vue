<template>
  <slot />
</template>
  
<script setup lang="ts">
import { provideAuthentication } from './AuthenticationProvider';

const DEFAULT_STORAGE_SESSION_KEY = 'UA'

type AuthenticationProviderProps = {
    encrypted: boolean;
    encryptedSecret: string;
    localStorageSessionKey: string;
    onRefreshToken: (token: string) => void;
};

const props = withDefaults(defineProps<AuthenticationProviderProps>(), {
  encrypted: false,
  localStorageSessionKey: DEFAULT_STORAGE_SESSION_KEY,
  encryptedSecret: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRefreshToken: () => {}
});

// Use an IIFE to handle the async call
(async () => {
  await provideAuthentication(props);
})();
</script>