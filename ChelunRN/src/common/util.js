import {Alert} from 'react-native';
import {App} from './const';
import alert from './alert';

export let util = {
	init(){
		this.appinfo = Object.assign({}, App.info);
	},

	formatSecondByDay(second){
		if(second <= 0){
			return '00 : 00 : 00';
		}
		let h, m, s, tm;
		s = second % 60;
		tm = (second - s)/60;
		m = tm % 60;
		h = (tm - m)/60;

		if(s < 10) s = '0' + s;
		if(m < 10) m = '0' + m;
		if(h < 10) h = '0' + h;

		return `${h} : ${m} : ${s}`;
	},

	_generateQuery(param = null){
		if(!param || typeof param != 'object'){
			return '';
		}
		let arr = [];
		for(let key in param) {
			arr.push(`${key}=${encodeURIComponent(param[key])}`);
		}
		return arr.join('&');
	},

	get(url, param = null, fn = ()=>{}){
		if(!url || typeof url != 'string') {
			throw new Error('url must specify as a string');
		}

		if(!param || typeof param != 'object') {
			param = {};
		}

		param = Object.assign(param, this.appinfo);

		url = url.replace(/\?*$/, '');
		let query = this._generateQuery(param);
		if(query) {
			if(/\?/.test(url)) {
				url += `&${query}`;
			} else {
				url += `?${query}`;
			}
		}

		fetch(url, {
			method: 'GET',
			cache: 'no-cache'
		}).then((response)=>{
			return response.json();
		}).then((res)=>{
			fn && typeof fn=='function' && fn(res);
		}).catch((err)=>{
			// console.log(err);
			alert('很抱歉，网络出错了');
		});
	},
	post(url, param = null, fn = ()=>{}){
		if(!url || typeof url != 'string') {
			throw new Error('url must specify as a string');
		}

		if(!param || typeof param != 'object') {
			param = {};
		}

		url = url.replace(/\?*$/, '');
		let query = this._generateQuery(this.appinfo);
		if(query) {
			if(/\?/.test(url)) {
				url += `&${query}`;
			} else {
				url += `?${query}`;
			}
		}

		fetch(url, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: this._generateQuery(param)
		}).then((response)=>{
			return response.json();
		}).then((res)=>{
			fn && typeof fn=='function' && fn(res);
		}).catch((err)=>{
			// console.log(err);
			alert('很抱歉，网络出错了');
		});
	}
};