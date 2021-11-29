var portList = []

onconnect = function (e) {
	var port = e.ports[0]
	ensurePorts(port)
	port.onmessage = function (e) {
		var data = e.data
		disptach(port, data)
	}
	port.start()
}

function ensurePorts (port) {
	if (portList.indexOf(port) < 0) {
		portList.push(port)
	}
}

function disptach (selfPort, data) {
	portList.filter(port => selfPort !== port).forEach(port => port.postMessage(data))
}

// let websocket
// const portList = []
// console.log('hello from worker')
// var initSocket = () => {
// 	if (websocket == null) {
// 		websocket = new WebSocket('ws://localhost:8080') //WebSocket服务端地址
// 	}
// 	websocket.onopen = (event) => {
// 		portList.map(item => {
// 			item.postMessage(event.data)
// 		})
// 	}
// 	websocket.onmessage = (events) => {
// 		portList.map(item => {
// 			// item!=port&&item.postMessage(workerResult);  /**不发给自己 */
// 			item.postMessage(events.data)
// 		})
// 	}
// 	websocket.onclose = (event) => {
// 		console.log('关闭websocket!')
// 	}
// 	websocket.onerror = (event) => {
// 		console.log('websocket异常!')
// 	}
// }
// onconnect = (e) => {
// 	var port = e.ports[0]
// 	portList.push(port)

// 	port.onmessage = ({ data }) => {
// 		console.log('worker got message', data)
// 		if (data === 'open') {
// 			port.postMessage('oooook')
// 			initSocket()
// 		}
// 	}
// }