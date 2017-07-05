import app from './app';
import context from './context';

export default function(onLogin = ()=>{}){
	if(!context.app.isLogin) {
		app.login().then((res)=>{
			//登录成功，更新context信息
			app.info().then((app)=>{
				context.app = app;
				//执行成功回调
				onLogin(res);
			});
		}).catch(()=>{
			//取消登录或登录失败 todo
		});
	} else {
		onLogin();
	}
}