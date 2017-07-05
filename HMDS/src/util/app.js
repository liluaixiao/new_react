import {NativeModules,Platform,BackHandler} from 'react-native';

/**
 * 原生相关逻辑
 * @type {{_info: *, _login: *, _share: *, _pay: *, _stat: *, _geo: *, _webview: *, _calendar: *, _scan: *, _ios: *, exit: (()), info: (()=>Promise.<{appName: *, appVersion: *, versionCode: *, appChannel: *, deviceBrand: *, deviceModel: *, osVersion: *, openUdid: *, cUdid: *, isJailbroken: number, environment: *}>), login: (()=>Promise.<*>), loginPassive: (()), open: ((url?)), remind: ((option?)=>Promise.<*>)}}
 */
let App = {
	_version: '1.1.0',	//HMDS版本号,每次版本迭代都会更改
	_info: NativeModules.CLRNAppAttributeModule, //获取基本信息
	_login: NativeModules.CLRNLoginModule, //登录
	_share: NativeModules.CLRNShareModule, //分享
	_pay: NativeModules.CLRNPayModule, //支付
	_stat: NativeModules.CLRNAnalysisModule, //事件统计
	_geo: NativeModules.CLRNGDLocationModule, //高德定位
	_webview: NativeModules.CLRNUrlModule, //URL处理（打开内部浏览器）
	_calendar: NativeModules.CLRNCalendarModule, //日历
	_scan: NativeModules.CLRNScanModule, //扫一扫
	_ios: NativeModules.CLRNBaseModuleIOS, //iOS基础模块
	_push: NativeModules.CLRNPushActionModule, //推送到达模块


	/**
	 * 退出RN模块
	 */
	exit(){
		if(Platform.OS == 'android') {
			BackHandler.exitApp();
		} else if(Platform.OS == 'ios'){
			NativeModules.CLRNBaseModuleIOS.pop();
		}
	},

	/**
	 * 获取环境信息
	 * @returns {Promise.<{appName: *, appVersion: *, versionCode: *, appChannel: *, deviceBrand: *, deviceModel: *, osVersion: *, openUdid: *, cUdid: *, isJailbroken: number, environment: *}>}
	 */
	async info(){
		//app信息
		let appName = await this._info.getAppName();
		let appVersion = await this._info.getAppVersion();
		let versionCode = await this._info.getAppVersionCode();
		let appChannel = await this._info.getAppChannel();
		let deviceBrand = await this._info.getDeviceBrand();
		let deviceModel = await this._info.getDeviceModel();
		let osVersion = await this._info.getOsVersion();
		let openUdid = await this._info.getOpenUdid();
		let cUdid = await this._info.getCUdid();
		let isJailbroken = await this._info.isJailbroken();
		let environment = await this._info.getSystemServerStyle();

		let info = {
			appName,
			appVersion,
			versionCode,
			appChannel,
			deviceBrand,
			deviceModel,
			osVersion,
			openUdid,
			cUdid,
			isJailbroken: isJailbroken ? 1 : 0,
			environment //develop | production | production_pre
		};

		//用户信息
		let isLogin = await this._login.isLogin();
		if(isLogin) {
			let userinfo = await this._login.getLoginUserInfo();
			info.actoken = userinfo.actoken;
			info.uid = userinfo.uid;
			info.phone = userinfo.phone;
			info.nickname = userinfo.nickname;
			info.avatar = userinfo.avatar;
		}
		info.isLogin = isLogin ? 1 : 0;

		return info;
	},

	/**
	 * 登录逻辑
	 * @returns {Promise.<*|Promise|{screen}>}
	 */
	login(){
		return this._login.login();
	},
	loginPassive(){
		return this._login.loginPassive();
	},

	/**
	 * 打开链接或者App可识别的schema
	 * @param url
	 */
	open(url){
		this._webview.openWithBrowser(url);
	},

	/**
	 * 写入新提醒到系统日历
	 * @param option
	 * @returns {Promise.<*>}
	 */
	async remind(option){

		if(typeof option != 'object') {
			return Promise.reject('param need to be object');
		}

		if(!option.title) {
			return Promise.reject('field `title` must be specified');
		}

		if(!option.startDate) {
			return Promise.reject('field `startDate` must be specified');
		}

		if(!option.endDate) {
			return Promise.reject('field `endDate` must be specified');
		}
		let isAuth = await this._calendar.isAuthorization();

		if(isAuth == true) {
			let writeObject = {
				title: option.title,
				startDate: String(option.startDate),
				endDate: String(option.endDate)
			};

			option.detail && (writeObject.notes = option.detail);
			option.url && (writeObject.url = option.url);

			return await this._calendar.write(writeObject);
		}
		return Promise.reject('Unauthorized to handle calendar');
	},

	/**
	 * 事件统计
	 * @param eventId
	 * @param label
	 */
	stat(eventId, label){
		this._stat.event(String(eventId), String(label));
	},
	/**
	 * 组事件统计
	 * @param eventId
	 * @param groupLabel
	 */
	groupStat(eventId, groupLabel){
		this._stat.eventMap(String(eventId), groupLabel);
	},

	/**
	 * 获取启动本组件时传递的参数信息
	 * @param moduleName
	 * @returns {*}
	 */
	getParam(moduleName){
		return this._push.getPushAction(moduleName);
	},

	/**
	 * 获取用户定位
	 * @return Promise
	 */
	 getLocation(){
		return new Promise((resolve)=>{
			// this._geo.getLocationStat().then((res)=>{
			// 	console.log('第一步返回：', res);
			// 	if (res == 'ok' || res === true){
					this._geo.getUserLocation().then((res)=>{
						// console.log('第二步返回：', res);
						if (!res.city){
							this._geo.updateUserLocation().then((res)=>{
								// console.log('第三步返回：', res);
								if (!res.city){
									resolve({
										city: '城市'
									})
								}else{
									resolve(res);
								}
							})
						}else{
							resolve(res);
						}
					});
				// }else{
				// 	resolve({
				// 		city: '城市'
				// 	})
				// }
			// });
		});
	}
};

export default App;