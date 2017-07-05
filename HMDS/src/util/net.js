import context from './context';

/**
 * 网络请求相关
 * @type {{_generateQuery: ((param?)), get: ((url?, param?)=>Promise.<void>), post: ((url?, param?)=>Promise.<*>)}}
 */
let net = {
	_generateQuery(param = null){
		if (!param || typeof param != 'object') {
			return '';
		}
		let arr = [];
		for (let key in param) {
			arr.push(`${key}=${encodeURIComponent(param[key])}`);
		}
		return arr.join('&');
	},

	/**
	 * 为所有请求加上基础参数
	 * @private
	 */
	_addBaseParam(url){
		let baseQuery = this._generateQuery(context.app);
		url = url.replace(/(\?|\&)*$/g, '');

		if (baseQuery && /\?/.test(url)) {
			url += `&${baseQuery}`;
		} else {
			url += `?${baseQuery}`;
		}

		return url;
	},

	/**
	 * GET请求
	 * @param url 请求的地址
	 * @param param 参数，对象类型
	 * @param method 请求方法，默认get
	 * @returns {Promise.<void>}
	 */
	get(url, param = null){
		if (!url || typeof url != 'string') {
			return Promise.reject('url must specify as a string');
		}

		if (!param || typeof param != 'object') {
			param = {};
		}

		//添加app基础请求参数
		Object.assign(param, context.app);

		//首先进行url拼接
		url = url.replace(/\?*$/, '');
		let query = this._generateQuery(param);
		if (query && /\?/.test(url)) {
			url += `&${query}`;
		} else {
			url += `?${query}`;
		}

		return fetch(url, {
			method: 'GET',
			cache: 'no-cache'
		}).then((response) => {
			return response.json();
		});
	},

	/**
	 * POST请求
	 * @param url 请求的url
	 * @param param 请求的参数
	 * @returns {Promise.<Promise.<*>|Promise.<T>>}
	 */
	post(url, param){
		if (!url || typeof url != 'string') {
			return Promise.reject('url must specify as a string');
		}

		if (!param || typeof param != 'object') {
			param = {};
		}

		//添加app基础请求参数GET
		url = this._addBaseParam(url);

		//添加app基础请求参数POST
		Object.assign(param, context.app);

		return fetch(url, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: this._generateQuery(param)
		}).then((response) => {
			return response.json();
		});
	}
};

export default net;