import {net} from './net';
import alert from './alert';
import {App} from './const';

export let event = {
	es: {},
	emit(type, data = null){
		if(!type || typeof type != 'string'){
			return ;
		}
		if(!this.es[type]) {
			return ;
		}
		this.es[type].forEach((handler)=>{
			handler(data);
		});
	},
	on(type, handler = ()=>{}){
		if(!type || typeof type != 'string'){
			return ;
		}

		if(!this.es[type]){
			this.es[type] = [handler];
		} else if(this.es[type].indexOf(handler) > -1){
			return ;
		} else {
			this.es[type].push(handler);
		}
	}
};

export let listener = {
	showDot(e){
		this.setState({showDot: e.showDot});
	}
};