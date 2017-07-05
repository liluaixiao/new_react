import app from '../common/common';
import {net} from '../common/net';
import {App} from '../common/const';
import {util} from '../common/util';
import {event} from '../common/event';
// import alert from '../common/alert';

export default async function(component){
	let info = await app.info();

	//app相关信息必须在网络请求之前初始化
	App.info = info;
	util.init();

	component.setState({canShowHead: true});

	//--------在此之前登录判断就已经完成--------
	let calendar = await net.getCalendar();
	let menu = await net.getMenu();
	let JX = await net.getJX();
	let MX = await net.getMX();
	let recommend = await net.getRecommend();

	//基础信息拉取成功，存储为全局数据
	App.calendar = calendar.data.list;
	App.menu = menu.data.typeMenu;

	if(App.info.isLogin){
		let hasNew = await net.checkHasNew();
		event.emit('dotStatusChange', {showDot: hasNew ? true : false});
	}

	let tab = menu.data.typeMenu.map((type) => {
		return {
			icon: {uri: type.icon},
			name: type.name,
			id: type.id,
			subTypeMenu: type.subTypeMenu
		}
	});

	let jx = JX.data.map((item) => {
		return {
			id: item.id,
			img: {uri: item.img}
		};
	});

	let todayMX = MX.data.todayMx.map((item) => {
		return {
			id: item.id,
			title: item.title,
			statusText: item.statusText,
			flag: item.flag,
			hasRemind: item.hasRemind
		};
	});
	let laterMX = MX.data.laterMx.map((item) => {
		return {
			id: item.id,
			title: item.title,
			statusText: item.statusText,
			flag: item.flag,
			hasRemind: item.hasRemind
		};
	});

	component.setState({
		recommend: recommend.data,
		// calendar: calendar.data.list,
		latest: calendar.data.latest || null,
		todayMX,
		laterMX,
		jx,
		tab,
		canShowView: true
	});



	return true;
}
