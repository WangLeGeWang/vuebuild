<template>
	<div id="home">
		<div @click="reload">{{count}}</div>
		<input v-model.number="message" />
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: "Home",
    components: {},
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
    methods: {
        increment () {
            this.$store.commit('increment')
            // console.log(this.$store.state.count)
        }
    },
    created () {
        let t = setInterval(() => {
            this.increment()
        }, 2 * 1000)
        this.$once('hook:beforeDestroy', () => {
            console.log('hook:beforeDestroy')
            clearInterval(t)
        })
    }
}
</script>
