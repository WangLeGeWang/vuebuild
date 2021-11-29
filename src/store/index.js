import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import app from './modules/app'

// import Worker from './store.worker'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0
	},
	mutations: {
		increment (state, payload) {
			if (Number(payload) || Number(payload) === 0) {
				state.count = payload
			} else {
				state.count++
			}
		}
	},
	actions: {},
	modules: {
		app
	},
	plugins: [
		createPersistedState({
			key: 'VUEX_STATE'
		}),
		createBroadcastChannelPlugin()
	]
})

export function createBroadcastChannelPlugin () {
	try {
		const channel = new BroadcastChannel('channel-vuex')
		return store => {
			channel.addEventListener('message', function (e) {
				let { state = {} } = e.data
				store.replaceState(Object.assign({}, store.state, state))
			})
			store.subscribe((mutation, state) => {
				channel.postMessage({
					...mutation,
					state
				})
			})
		}
	} catch (error) {
		return store => {
			window.addEventListener('storage', (e) => {
				// console.log(e.key, e.newValue, e.oldValue)
				if (e.key === 'VUEX_STATE') {
					try {
						let state = JSON.parse(e.newValue) || {}
						store.replaceState(Object.assign({}, store.state, state))
					} catch (error) { }
				}
			})
		}
	}
}

/* export function createBroadcastChannelPlugin () {
	// const { default: Worker } = import('./store.worker')
	// const worker = new Worker()

	const Worker = import('./store.worker')

	console.log(Worker)

	return store => {
		// worker.port.start()
		// worker.port.onmessage = e => {
		// 	let { state = {} } = e.data
		// 	store.replaceState(Object.assign({}, store.state, state))
		// }
		// store.subscribe((mutation, state) => {
		// 	worker.port.postMessage({
		// 		...mutation,
		// 		state
		// 	})
		// })
	}
} */

// const plugin = createWebSocketPlugin(socket)
// export function createWebSocketPlugin (socket) {
// 	return store => {
// 		socket.on('data', data => {
// 			store.commit('receiveData', data)
// 		})
// 		store.subscribe(mutation => {
// 			if (mutation.type === 'UPDATE_DATA') {
// 				socket.emit('update', mutation.payload)
// 			}
// 		})
// 	}
// }