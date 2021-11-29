// import Vue from "vue";

/**
 * 定义空的vue实例，作为 eventbus实现非父子组件之间的通信(vue2.x中去掉了broadcast)
 */
// const EventBus = new Vue({});

// export default EventBus;

/* import EventBus from 'eventbus.js';
EventBus.$emit('choiceHospital',hospital);
/* //每次激活时
activated(){
	EventBus.$on('choiceHospital', function(data){
		this.nearestOrg = data;
	}.bind(this));
} */



export default async function createEventBus () {
	const { default: Worker } = await import('./eventbus.worker')
	const worker = new Worker()
	console.log(worker)
}