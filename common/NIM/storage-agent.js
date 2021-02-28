// uni storage代理方法 
// 方便做集中的管理

class Storage {
	constructor(StorageName) {
		this.StorageName = StorageName
	}
	
	// 初始化 
	_init() {}
	
	// 检查方法 判断是否已经注册缓存名称
	checkName(key) {
		if (this.StorageName.hasOwnProperty(key)) {
			return true
		} else {
			throwError(`传入的key: ${key} 未在方法中注册`)
			return false
		}
	}
	
	// 存储storage的同步方法
	setStorageSync(key, value) {
		if (this.checkName(key)) {
			uni.setStorageSync(key, value)
		}
	}
	
	// 存储storage的异步方法
	setStorage(key, value) {
		if (this.checkName(key)) {
			return uni.setStorage({
				key: key,
				data: value
			});
		}
	}
	
	// 读取storage的同步方法
	getStorageSync(key) {
		if (this.checkName(key)) {
			uni.getStorageSync(key)
		}
	}
	
	// 读取storage的异步方法
	getStorage(key) {
		if (this.checkName(key)) {
			return uni.getStorage({
				key: key
			});
		}
	}
}

class StorageAgent {
	constructor() {
		// 初始化 所用storage名称
		this.initName()
		this._storage = new Storage(this.StorageName)
	}
	
	initName() {
		// 注册缓存名称
		this.StorageName = {
			// 判断是否已经查看过引导页
			"isGuide": "isGuide"
		}
	}
	
	// 创建缓存的方法
	set(key, value, isSync = true) {
		if(isSync) {
			this._storage.setStorageSync(key, value)
		} else {
			this._storage.setStorage(key, value)
		}
	}
	
	// 获取缓存的方法
	get(key, isSync = true) {
		if(isSync) {
			this._storage.getStorageSync(key)
		} else {
			this._storage.getStorage(key)
		}
	}
	
	// 向外导出当前所有名称
	exportName() {
		return Object.assign({}, this.StorageName)
	}
}

// 抛出错误
function throwError(str) {
	if (typeof str !== 'string') {
		str = '传入的报错信息无法识别(非string类型), 请检查用法是否正确!'
	}
	str = 'storag-agent Error: ' + str
	throw new Error(str);
}

export default StorageAgent