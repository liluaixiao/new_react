import {AsyncStorage} from 'react-native';
/**
 * 本地缓存操作
 * @type {{getItem: ((key)), setItem: ((key, value)), removeItem: ((key)), clear: (())}}
 */
let cache = {
	getItem(key, callback = ()=>{}){
		AsyncStorage.getItem(key).then((value)=>{
			callback(value);
		}).catch(()=>{
			callback(null);
		});
	},
	setItem(key, value, callback = ()=>{}){
		value = String(value);
		AsyncStorage.setItem(key, value).then(()=>{
			callback(true);
		}).catch(()=>{
			callback(false);
		});
	},
	removeItem(key, callback = ()=>{}){
		AsyncStorage.removeItem(key).then(()=>{
			callback(true);
		}).catch(()=>{
			callback(false);
		});
	}
};

export default cache;