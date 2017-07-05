import {NativeModules,Platform,BackAndroid} from 'react-native';

let App = {
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

	/**
	 * 退出RN
	 */
	exit(){
		if(Platform.OS == 'android') {
			BackAndroid.exitApp(0);
		} else {
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
			await Promise.reject('param need to be object');
		}

		if(!option.title) {
			await Promise.reject('field `title` must be specified');
		}

		if(!option.startDate) {
			await Promise.reject('field `startDate` must be specified');
		}

		if(!option.endDate) {
			await Promise.reject('field `endDate` must be specified');
		}
		let isAuth = await this._calendar.isAuthorization();

		if(isAuth == true) {
			let writeObject = {
				title: option.title,
				startDate: option.startDate,
				endDate: option.endDate
			};

			option.notes && (writeObject.notes = option.notes);
			option.url && (writeObject.url = option.url);

			return await this._calendar.write(writeObject);
		}
		return false;
	}
};

export default App;

