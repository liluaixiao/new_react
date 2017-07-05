import app from './common';
import {App} from './const';
import {event} from './event';

export default function loginCheck(afterLogin = ()=>{}){
	if(!App.info.isLogin) {
		app.login().then((res)=>{
			//登录成功
			// console.log('suc', res);
			//刷新首页数据
			event.emit('refreshMain');
			afterLogin();
		},(res)=>{
			//登录失败
			// console.log('err', res);
		});
	} else {
		afterLogin();
	}
}