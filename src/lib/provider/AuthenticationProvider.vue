<template>
  <slot />
</template>
  
<script setup lang="ts">
import { provideAuthentication } from './AuthenticationProvider';

const DEFAULT_STORAGE_SESSION_KEY = 'UA'

type AuthenticationProviderProps = {
    localStorageSessionKey: string;
    onRefreshToken: (token: string) => void;
};

const props = withDefaults(defineProps<AuthenticationProviderProps>(), {
  localStorageSessionKey: DEFAULT_STORAGE_SESSION_KEY,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onRefreshToken: () => {}
});

provideAuthentication(props)
</script>