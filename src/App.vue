<script setup lang="ts">
import {Encrypt} from './lib/utils/Crypto'


const run = async () => {
	const enc_value = await Encrypt.encryptValue( JSON.stringify({ name: 'helloo', test: { sue: { ge: 'hello twice'}, bam: []} }), 'secret%&/(/&(&))')
console.log('#encryptValue#', enc_value)
const  value = await Encrypt.decryptValue( enc_value, 'secret%&/(/&(&))')
console.log('#decryptValue#',value)
}

run()
</script>
<template>
	<div />
</template>
