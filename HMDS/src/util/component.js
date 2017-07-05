import React from 'react';

/**
 * 组件基类，增加事件代理逻辑
 */
// export default class Component extends React.Component {
export default class Component extends React.PureComponent {
	constructor(props){
		super(props);
		Component.id ++;
		this._id = Component.id;

		this._events = [];
	}

	/**
	 * 触发事件
	 * @param eventType
	 * @param data
	 */
	emit(eventType, data = null){
		if(!eventType || typeof eventType != 'string') {
			return ;
		}

		if(!Component.event[eventType]) {
			return ;
		}

		let list = Component.event[eventType];
		for(let id in list) {
			list[id].forEach((handler)=>{
				handler(data);
			});
		}
	}

	/**
	 * 事件监听
	 * @param eventType
	 * @param handler
	 */
	on(eventType, handler = null){
		if(!eventType || typeof eventType != 'string') {
			return ;
		}

		if(!handler || typeof handler != 'function') {
			return ;
		}

		if(!Component.event[eventType]) {
			Component.event[eventType] = {};
		}

		if(!Component.event[eventType][this._id]){
			Component.event[eventType][this._id] = [handler];
		} else {
			Component.event[eventType][this._id].push(handler);
		}

		if(this._events.indexOf(eventType) === -1) {
			this._events.push(eventType);
		}
	}

	/**
	 * 解除绑定
	 * @param eventType
	 * @param handler
	 */
	off(eventType, handler = null){
		if(!eventType || typeof eventType != 'string') {
			return ;
		}

		if(!Component.event[eventType] || !Component.event[eventType][this._id]) {
			return ;
		}

		let handlers = Component.event[eventType][this._id];
		let findIndex = -1;
		for(let i=0;i<handlers.length;i++) {
			if(handlers[i] == handler) {
				fromIndex = i;
				break;
			}
		}

		if(findIndex >= 0) {
			handlers.splice(findIndex, 1);
		}

		if(handlers.length == 0) {
			delete Component.event[eventType][this._id];
			let index = this._events[eventType];
			if(index >= 0) {
				this._events.splice(index,  1);
			}
		}
	}

	/**
	 * 组件卸载时要移除绑定，防止内存泄漏
	 */
	componentWillUnmount(){
		this._events.forEach((eventType)=>{
			if(Component.event[eventType]) {
				delete Component.event[eventType][this._id];
			}
 		});
	}
}

Component.event = {};
Component.id = 0;

