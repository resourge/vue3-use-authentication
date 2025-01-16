<script lang="ts" setup>
import { AuthenticationProvider } from '../lib/index';
import Example from './Example.vue';
</script>

<template>
  <Suspense>
      <AuthenticationProvider :localStorageSessionKey="'UA'" encrypted :encryptedSecret="'encryption'"  :onRefreshToken="() => console.log('onRefreshToken') ">
          <Example />
      </AuthenticationProvider>
  </Suspense>
</template>