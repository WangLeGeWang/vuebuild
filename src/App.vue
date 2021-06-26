<script>
export default {
    name: "App",
    data () {
        return {
            isRouterAlive: true
        }
    },
    provide () {
        return {
            reload: this.reload
        }
    },
    methods: {
        reload () {
            this.isRouterAlive = false
            this.$nextTick(function () {
                console.log('reload')
                this.isRouterAlive = true
            })
        }
    },
    render () {
        return (
            <div id="app">
                {this.isRouterAlive && <router-view />}
            </div>
        )
    }
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
