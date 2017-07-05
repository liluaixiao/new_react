/**
 * 数据获取
 * @type {{}}
 */
import net from './net';
import context from './context';

let data = {

	//广告链接类型
	AdTypeYm: 1,
	AdTypeBanner: 2,
	AdTypeSubject: 3,

	/**
	 * 生成广告链接
	 * @param _type
	 * @param _id
	 * @param _url
	 */
	getAdUrl(_type, _id, _url){
		let param = Object.assign({_type, _id, _url}, context.app);
		let arr = [];
		for (let key in param) {
			arr.push(`${key}=${encodeURIComponent(param[key])}`);
		}
		let query = arr.join('&');
		return this.host + `page/jumpBank?` + query;
	},

	get host(){
		let host;
		if (context.app.environment == 'develop') {
			host = 'https://welfarestats-test.eclicks.cn/';
		} else {
			host = 'https://haomao.chelun.com/';
		}

		// host = 'http://haomao.chelun.com/';
		// host = 'http://welfarestats-test.eclicks.cn/';
		// host = 'http://10.10.1.24:10000/interface/faker/interfaceid/';

		return host;
	},

	get url() {
		//定义域名和请求地址
		let host = this.host;

		let url = {
			//首页
			getTodayTotal: host + 'user/dayTotal',
			getTodayMs: host + 'page/seckillSelect',
			getCategory: host + 'page/banner',
			getListByTypeId: host + 'item/recommendList',

			//日历
			getMyList: host + 'user/dayList',
			addSystemRemind: host + 'user/addSysTemRemind',
			removeItem: host + "user/cancel",

			//详情
			getDetail: host + "item/info",
			addRemind: host + "user/focus",

			//新增
			addHM: host + "user/add",

			//列表
			getTodayListByPage: host + "item/todaySeckill",
			getMoreListByPage: host + "item/tomorrowSeckill",

			//2.1新增接口部分
			commentList: host + "item/comments",
			addComment: host + "item/addComment",
			replyComment: host + "item/replyComment",

			//v3
			homeRecommendArticle: host + "article/page",
			homeRecommendSubject: host + "article/subjectList",
			getSlideList: host + "article/banner",
			getMaterList: host + "master/recommendList",
			addYmFavor: host + "item/upvote",
			getAllArticleByPage: host + "article/recommends",
			masterInfo: host + "master/info",
			masterArticleList: host + "master/article",
			masterArticleDetail: host + "article/info",
			subsMaster: host + "user/subscribe",
			profileComment: host + "user/myComments",
			profileFavor: host + "user/myCollect",
			profileSubs: host + "user/mySubscribe",
			subjectBanner: host + "article/subjectInfo",

			//v1.0.4
			favorArticle: host + "article/upvote",
			collectArticle: host + "user/collect",
			getUserinfo: host + "user/userInfo",
			getTaskList: host + "task/taskList",
			myExchange: host + "user/myProduct",
			homeArticleList: host + "article/page",
			getWoolData: host + "user/myScore",
			getGoodsDetail: host + "product/info",
			getGoodsList: host + "product/productList",
			exchangeGoods: host + "user/takeProduct",
			getArticleComment: host + "article/comments",
			addArticleComment: host + "article/addComment",
			replyArticleComment: host + "article/replyComment",
			homeRecommend: host + "page/daliySelectV4",
			subjectList: host + "article/subjectV4",
			shareWool: host + "user/share",
			slideListV4: host + "article/bannerV4",
			masterCancelSubs: host + "user/cancelSub",

			//v1.0.6
			search: host + "shop/search",
			searchDetail: host + "shop/info",
			cityList: host + "shop/city",
			filter: host + "shop/taste",

			//v1.0.8
			cardList: host + "card/linklist",

            //v1.1.0
            indexBanner: host + "page/carousel",
            indexMenu: host + "box/index",
            indexNews: host + "page/privilegeNews",
            loadDiscount: host + "422/index/discount",
            loadMaster: host + "Master/recommendList",
            cancelFavor: host + "user/cancelColl",
		};

		// let
         //    url = {
		// 	//首页
		// 	getTodayTotal: host + '301/main/myTotayTotal',
		// 	getTodayMs: host + '302/mian/getTodayMs',
		// 	getCategory: host + '303/main/getCategoryList',
		// 	getListByTypeId: host + '304/main/getListByTypeId',
        //
		// 	//日历
		// 	getMyList: host + '305/calendar/mylist',
		// 	addSystemRemind: host + '306/Calendar/addSystemRemind',
		// 	removeItem: host + "307/calendar/removeItem",
        //
        //
		// 	//详情
		// 	getDetail: host + "308/detail/item",
		// 	addRemind: host + "309/detail/addRemind",
        //
		// 	//新增
		// 	addHM: host + "310/hm/add",
        //
		// 	//列表
		// 	getTodayListByPage: host + "311/list/getTodayListByPage",
		// 	getMoreListByPage: host + "312/list/getMoreListByPage",
        //
		// 	//2.1新增接口部分
		// 	commentList: host + "321/detail/commentList",
		// 	addComment: host + "326/comment/add",
		// 	replyComment: host + "327/comment/reply",
        //
		// 	//v3
		// 	homeRecommendArticle: host + "/358/home/recommendArticle",
		// 	homeRecommendSubject: host + "359/home/recommendSubject",
		// 	getSlideList: host + "363/master/getSlideList",
		// 	getMaterList: host + "364/master/getMasterList",
		// 	addYmFavor: host + "330/detail/addFavor",
		// 	getAllArticleByPage: host + "365/master/articleList",
		// 	masterInfo: host + "360/master/masterInfo",
		// 	masterArticleList: host + "370/master/articleList",
		// 	masterArticleDetail: host + "/361/master/articleDetail",
		// 	subsMaster: host + "362/master/subsMaster",
		// 	profileComment: host + "366/profile/comment",
		// 	profileFavor: host + "367/profile/favor",
		// 	profileSubs: host + "377/user/mySubs",
		// 	subjectBanner: host + "368/subject/banner",
        //
		// 	//v1.0.4
		// 	favorArticle: host + "381/article/upvote",
		// 	collectArticle: host + "382/article/collect",
		// 	getUserinfo: host + "379/profile/userinfo",
		// 	getTaskList: host + "380/task/list",
		// 	myExchange: host + "384/my/exchange",
		// 	homeArticleList: host + "385/home/articles",
		// 	getWoolData: host + "387/profile/woolData",
	 	//  	getGoodsDetail: host + "388/mall/goodsDetail",
		//  	getGoodsList: host + "389/mall/goodsList",
		// 	exchangeGoods: host + "391/mall/exchangeGoods",
		// 	getArticleComment: host + "392/master/articleComment",
		// 	addArticleComment: host + "393/master/addComment",
		// 	replyArticleComment: host + "394/master/replyComment",
		// 	homeRecommend: host + "390/home/recommend",
		// 	subjectList: host + "396/subject/list",
		// 	shareWool: host + "397/share/shareWool",
		// 	slideListV4: host + "400/master/getSlideList",
		//  	masterCancelSubs: host + "401/master/cancelSubs",
        //
		// 	//v1.0.6
		// 	search: host + "402/search/search",
		// 	searchDetail: host + "403/search/searchDetail",
		// 	cityList: host + "405/search/cityList",
		// 	filter: host + "406/search/filter",
        //
		// 	//v1.0.8
		// 	cardList: host + "414/card/cardList",
        //
		// 	//v1.1.0
		// 	indexBanner: host + "419/index/banner",
		// 	indexMenu: host + "420/index/menu",
		// 	indexNews: host + "421/index/news",
		// 	loadDiscount: host + "422/index/discount",
		// 	loadMaster: host + "423/index/master",
		// 	cancelFavor: host + "428/profile/cancelFavor",
		// };

		return url;
	},
	////////v1.1.0
	//首页banner
	indexBanner(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.indexBanner).then((res)=>{
			callback(res)
		}, error)
	},
	//分类菜单
	indexMenu(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.indexMenu).then((res)=>{
			callback(res)
		}, error)
	},
	//滚动新闻
	indexNews(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.indexNews).then((res)=>{
			callback(res)
		}, error)
	},
	//首页折扣
	loadDiscount(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.loadDiscount, param).then((res)=>{
			callback(res)
		}, error)
	},
	//首页大师
	loadMaster(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.loadMaster, param).then((res)=>{
			callback(res)
		}, error)
	},
	//个人中心取消收藏文章
	cancelFavor(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.cancelFavor, param).then((res)=>{
			callback(res)
		}, error)
	},

	////////v1.0.8
	//办卡列表
	cardList(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.cardList, param).then((res)=>{
			callback(res)
		}, error)
	},

	////////v1.0.6
	//搜索
	search(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.search, param).then((res)=>{
			callback(res)
		}, error)
	},
	//获取店铺详情
	searchDetail(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.searchDetail, param).then((res)=>{
			callback(res)
		}, error)
	},
	//获取可选择城市
	cityList(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.cityList).then((res)=>{
			callback(res)
		}, error)
	},
	//获取筛选列表
	filter(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.filter, param).then((res)=>{
			callback(res)
		}, error)
	},


	////////v1.0.4
	//取消订阅大师
	cancelSubs(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.masterCancelSubs, param).then((res)=>{
			callback(res)
		}, error)
	},

	//分享羊毛获取积分
	shareWool(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.shareWool, param).then((res)=>{
			callback(res)
		}, error)
	},

	//大师文章回复评论
	replyArticleComment(param, callback = ()=>{}, error = ()=>{}){
		return net.post(this.url.replyArticleComment, param).then((res)=>{
			callback(res)
		}, error)
	},

	//大师文章发表评论
	addArticleComment(param, callback = ()=>{}, error = ()=>{}){
		return net.post(this.url.addArticleComment, param).then((res)=>{
			callback(res)
		}, error)
	},

	//大师文章评论列表
	getArticleComment(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.getArticleComment, param).then((res)=>{
			callback(res)
		}, error)
	},

	//兑换商品
	exchangeGoods(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.exchangeGoods, param).then((res)=>{
			callback(res)
		}, error)
	},


	//获取首页推荐
	homeRecommend(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.homeRecommend).then((res)=>{
			callback(res)
		}, error)
	},

    //获取商品详情
    getGoodsDetail(param, callback = ()=>{}, error = ()=>{}){
        return net.get(this.url.getGoodsDetail, param).then((res)=>{
            callback(res)
        }, error)
    },

    //获取商城商品列表
    getGoodsList(param, callback = ()=>{}, error = ()=>{}){
        return net.get(this.url.getGoodsList, param).then((res)=>{
            callback(res)
        }, error)
    },

	//首页获取多篇推荐的文章
	homeArticleList(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.homeArticleList).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},


	//根据月份获取羊毛信息
	getWoolData(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.getWoolData, param).then((res)=>{
			callback(res)
		}, error)
	},

	//获取我的优惠券列表
	myExchange(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.myExchange, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//获取我的任务列表
	getTaskList(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.getTaskList).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//我的获取用户信息
	getUserinfo(callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.getUserinfo).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//大师文章收藏
	collectArticle(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.collectArticle, param).then((res)=>{
			callback(res)
		}, error)
	},

	//大师文章点赞
	favorArticle(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.favorArticle, param).then((res)=>{
			callback(res)
		}, error)
	},

	//获取专题banner
	subjectBanner(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.subjectBanner, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//分页获取专题列表
	subjectList(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.subjectList, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//获取我订阅的大师
	profileSubs(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.profileSubs, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//分页获取我评论过的羊毛
	profileComment(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.profileComment, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//分页获取我收藏的文章
	profileFavor(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.profileFavor, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//获取大师信息
	masterInfo(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.masterInfo, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//分页获取大师文章列表
	masterArticleList(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.masterArticleList, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//获取大师文章详情
	masterArticleDetail(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.masterArticleDetail, param).then((res)=>{
			res.code == 200 && callback(res)
		}, error)
	},

	//订阅大师
	subsMaster(param, callback = ()=>{}, error = ()=>{}){
		return net.get(this.url.subsMaster, param).then((res)=>{
			callback(res)
		}, error)
	},

	//分页获取所有的文章列表
	getAllArticleByPage(param, callback = () => {}, error = () => {}){
		return net.get(this.url.getAllArticleByPage, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//对羊毛点赞
	addYmFavor(param, callback = () => {}, error = () => {}){
		return net.get(this.url.addYmFavor, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//分页获取入驻大师列表
	getMaterList(param, callback = () => {}, error = () => {}){
		return net.get(this.url.getMaterList, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取大师页头部轮播列表
	getSlideList(callback = () => {}, error = () => {}){
		return net.get(this.url.slideListV4).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取首页推荐的专题
	homeRecommendSubject(param, callback = () => {}, error = () => {}){
		return net.get(this.url.homeRecommendSubject, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取首页推荐的一篇文章
	homeRecommendArticle(callback = () => {}, error = () => {}){
		return net.get(this.url.homeRecommendArticle).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//发表评论
	addComment(param, callback = () => {}, error = () => {}){
		return net.post(this.url.addComment, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//回复评论
	replyComment(param, callback = () => {}, error = () => {}){
		return net.post(this.url.replyComment, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取一条羊毛的评论列表
	getCommentList(param, callback = () => {}, error = () => {}){
		return net.get(this.url.commentList, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},


	//获取我今日的薅毛事项总条数
	getTodayTotal(callback = () => {}, error = () => {}){
		return net.get(this.url.getTodayTotal).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取今日推荐列表
	getRecommend(callback = () => {}, error = () => {}){
		return net.get(this.url.getRecommend).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取秒杀资源
	getTodayMs(callback = () => {}, error = () => {}){
		return net.get(this.url.getTodayMs).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取分类列表
	getCategory(callback = () => {}, error = () => {}){
		return net.get(this.url.getCategory).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//根据分类id分页获取列表
	getListByTypeId(param, callback = () => {}, error = () => {}){
		return net.get(this.url.getListByTypeId, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//根据日期获取我关注的薅毛列表
	getMyList(param, callback = () => {}, error = () => {}){
		return net.get(this.url.getMyList, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//添加当前羊毛到系统日历提醒
	addSystemRemind(param, callback = () => {}, error = () => {}){
		return net.get(this.url.addSystemRemind, param).then((res) => {
			callback(res);
		}, error);
	},

	//删除我关注的一条薅毛信息
	removeItem(param, callback = () => {}, error = () => {}){
		return net.get(this.url.removeItem, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//获取一条羊毛信息详情
	getDetail(param, callback = () => {}, error = () => {}){
		return net.get(this.url.getDetail, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//添加羊毛到日历关注列表
	addRemind(param, callback = () => {}, error = () => {}){
		return net.get(this.url.addRemind, param).then((res) => {
			// res.code == 200 && callback(res);
			callback(res);
		}, error);
	},

	//新增一条自定义羊毛
	addHM(param, callback = () => {}, error = () => {}){
		return net.post(this.url.addHM, param).then((res) => {
			callback(res);
		}, error);
	},

	//分页获取今日秒杀列表
	getTodayListByPage(param, callback = () => {}, error = () => {}){
		return net.get(this.url.getTodayListByPage, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},

	//分页获取更多秒杀列表
	getMoreListByPage(param, callback = () => {}, error = () => {}){
		return net.get(this.url.getMoreListByPage, param).then((res) => {
			res.code == 200 && callback(res);
		}, error);
	},
};

export default data;