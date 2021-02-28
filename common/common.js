import StorageAgent from '@/common/NIM/storage-agent.js'

class Common {
	constructor(arg) {
		this._storage = new StorageAgent()
	}
	
	// 判断是否进入引导页 还是 进入首页
	isGuideOrIndex() {
		// console.log("this._storage.get('isGuide')", this._storage.get('isGuide'));
		if (this._storage.get('isGuide')) {
			uni.reLaunch({
				url: '/pages/login/app-login'
			})
		} else {
			uni.reLaunch({
				url: '/pages/login/guide'
			})
		}
	}
	
}

export default Common