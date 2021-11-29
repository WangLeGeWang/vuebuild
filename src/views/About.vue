<template>
	<div id="about">
		<div @click="reload">{{count}}</div>
		<input v-model.number="message" />
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'About',
    computed: {
        ...mapState(['count']),
        message: {
            get () {
                return this.$store.state.count
            },
            set (value) {
                this.$store.commit('increment', value)
            }
        }
    },
    inject: ['reload'],
    created () {
        this.$once('hook:beforeDestroy', () => {
            console.log('hook:beforeDestroy')
        })
    }
}
</script>