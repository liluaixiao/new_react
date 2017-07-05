import {util} from './util';
import {App} from './const';
import {Alert} from 'react-native';
import alert from './alert';

export let net = {

	get url(){
		let fetchURL;
		if(App.info.environment == 'develop') {
			fetchURL = 'https://welfarestats-test.eclicks.cn/';
			// fetchURL = 'http://10.10.1.24:10000/interface/faker/interfaceid/';
		} else {
			fetchURL = 'https://haomao.chelun.com/';
		}

		return {
			main: {
				calendar: fetchURL + 'user/weekList',
				menu: fetchURL + 'page/banner',
				jx: fetchURL + 'item/daliySelect',
				mx: fetchURL + 'item/seckillList',
				recommend: fetchURL + 'page/recommend'
			},
			category: {
				list: fetchURL + 'item/recommendList'
			},
			detail: {
				info: fetchURL + 'item/Info'
			},
			common: {
				remind: fetchURL + 'user/focus'
			},
			calendar: {
				mylist: fetchURL + 'user/dayList',
				remove: fetchURL + 'user/cancel',
				add: fetchURL + 'user/add',
				hasNew: fetchURL + 'user/todayHasNew',
				latest: fetchURL + 'item/todayLatest'
			}
		};

		// return {
		// 	main: {
		// 		calendar: fetchURL + '216/User/weekList',
		// 		menu: fetchURL + '246/Page/banner',
		// 		jx: fetchURL + '247/Item/daliySelect',
		// 		mx: fetchURL + '248/Item/seckillList',
		// 		recommend: fetchURL + '249/Wool/recommend'
		// 	},
		// 	category: {
		// 		list: fetchURL + '250/Item/list'
		// 	},
		// 	detail: {
		// 		info: fetchURL + '251/Item/detail'
		// 	},
		// 	common: {
		// 		remind: fetchURL + '253/Wool/remind'
		// 	},
		// 	calendar: {
		// 		mylist: fetchURL + '254/Calendar/mylist',
		// 		remove: fetchURL + '255/Calendar/remove',
		// 		add: fetchURL + '256/Calendar/add',
		// 		hasNew: fetchURL + '257/Calendar/hasNew',
		// 		latest: fetchURL + '258/Calendar/latest'
		// 	}
		// };
	},

	_promise(url, param = {}, callback = () => {}, method = 'get'){
		return new Promise((suc, err) => {
			util[method](url, param, (res) => {
				res.code == 200 ? suc(res) : err(res);
			});
		}).then(callback, (res) => {
			alert(res.msg);
		}).catch((res)=>{
			//todo
		});
	},

	//------await-----------
	getCalendar(){
		return new Promise((suc, err)=>{
			util.get(this.url.main.calendar, {}, (res)=>{
				res.code == 200 ? suc(res) : err(res);
			});
		});
	},

	getMenu(){
		return new Promise((suc, err)=>{
			util.get(this.url.main.menu, {}, (res)=>{
				res.code == 200 ? suc(res) : err(res);
			});
		});
	},

	getJX(){
		return new Promise((suc, err)=>{
			util.get(this.url.main.jx, {}, (res)=>{
				res.code == 200 ? suc(res) : err(res);
			});
		});
	},
	getMX(){
		return new Promise((suc, err)=>{
			util.get(this.url.main.mx, {}, (res)=>{
				res.code == 200 ? suc(res) : err(res);
			});
		});
	},
	getRecommend(){
		return new Promise((suc, err)=>{
			util.get(this.url.main.recommend, {}, (res)=>{
				res.code == 200 ? suc(res) : err(res);
			});
		});
	},

	checkHasNew(){
		return new Promise((suc, err)=>{
			util.get(this.url.calendar.hasNew, {}, (res)=>{
				res.code == 200 ? suc(res) : err(res);
			});
		});
	},

	//------await-----------

	//列表，分页获取列表信息
	categoryList(param, callback){
		return this._promise(this.url.category.list, param, callback);
	},

	//获取薅毛信息详情
	detailInfo(param, callback) {
		return this._promise(this.url.detail.info, param, callback);
	},

	//提醒我
	commonRemind(param, callback) {
		return this._promise(this.url.common.remind, param, callback);
	},

	//根据日期获取我的薅毛列表
	calendarMyList(param, callback){
		return this._promise(this.url.calendar.mylist, param, callback);
	},

	//删除一条薅毛提醒
	calendarRemove(param, callback) {
		return this._promise(this.url.calendar.remove, param, callback);
	},
	//添加一条自定义提醒
	calendarAdd(param, callback) {
		return this._promise(this.url.calendar.add, param, callback, 'post');
	},

	//今日是否有新薅毛信息未读
	calendarHasNew(callback){
		return this._promise(this.url.calendar.hasNew, {}, callback);
	},

	//获取最新的一条秒杀时间
	calendarLatest(callback){
		return this._promise(this.url.calendar.latest, {}, callback);
	}
};