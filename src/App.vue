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
                setTimeout(() => {
                    console.log('reload')
                    this.isRouterAlive = true
                }, 1000)
            })
        }
    },
    render () {
        return (
            <div id="app">
                <div id="nav">
                    <router-link to="/">Home</router-link>|
                    <router-link to="/about">About</router-link>
                </div>
                {this.isRouterAlive ? <router-view /> : <div>loading...</div>}
            </div>
        )
    }
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	padding: 30px;

	a {
		font-weight: bold;
		color: #2c3e50;

		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>