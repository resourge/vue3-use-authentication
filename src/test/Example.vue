<script  lang="ts" setup>
import { useAuthentication } from '../lib/index';

const { isAuthenticated, login, logout, profile } = useAuthentication()
const onLogin = ( ) => {
    login({ name: 'hello'}, { isAdmin: true}, 'example_token', 'cookie')
}
</script>
<template>
    <div>Hello World</div>
    <span>isAuthenticated: {{ isAuthenticated }} profile: {{ profile }}</span>
    <button @click="onLogin">Login</button>
    <button @click="logout">Logout</button>

</template>