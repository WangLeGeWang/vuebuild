<template>
	<div id="app">
		<img @click="reload" alt="Vue logo" src="@/assets/logo.png" width="25%" />
		<HelloWorld msg="Hello Vue in CodeSandbox!" />
	</div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue"

export default {
    name: "Home",
    components: {
        HelloWorld
    },
    inject: ['reload']
}
</script>
