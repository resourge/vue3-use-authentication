<script setup lang="ts">
import {Encrypt} from './lib/utils/Crypto'


const run = async () => {
	const enc_value = await Encrypt.encryptValue('encryptedSecret', JSON.stringify({ name: 'helloo' }))
console.log('#encryptValue#', enc_value)
const  value = await Encrypt.decryptValue('encryptedSecret', enc_value)
console.log('#decryptValue#',JSON.parse(value))
}

run()
</script>
<template>
	<div />
</template>
