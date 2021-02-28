// // 业务代码
// // nvue 暂不支持使用ts 遂放弃 暂时改用js实现

class HandleBusiness {
	constructor(STORE) {
		this._STORE = STORE
	}
}

class Session extends HandleBusiness {
	constructor(STORE) { super(STORE); }
	
	// 保存历史会话
	saveHistory() {
		let arr = this._STORE.getters['initNim/sessionArr']
		let userId = this._STORE.getters['initNim/userUID']
		if (arr) {
			uni.setStorage({
			key: `historySession-${userId}`,
			data: arr,
			success: function() {
					console.log('保存历史会话成功');
				}
			});
		}
	}
	
	// 读取历史会话
	readHistory() {
		let userId = this._STORE.getters['initNim/userUID']
		let sessionArr = uni.getStorageSync(`historySession-${userId}`) || []
		
		sessionArr.map(item => {
			// 查询这个会话的信息
			if (item.scene === 'p2p') {
				this._STORE.dispatch('initNim/nimGetUser', item.to)
			}
		})
		
		this._STORE.commit('initNim/saveSessionData', sessionArr)
	}
	
}

class Team extends HandleBusiness {
	constructor(STORE) { super(STORE); }
	
	// 添加成员
	addMember(teamId, accounts) {
		let arr = []
		if (!Array.isArray(accounts)) {
			arr = [accounts]
		}
		
		this._STORE.dispatch('initNim/nimAddTeamMembers', {
			teamId: teamId,
			accounts: arr
		}).then(res => {
			uni.showToast({
				title: '发送邀请成功'
			})
		})
	}
	
}

class Login extends HandleBusiness {
	constructor(STORE) { super(STORE); }
	
	// 登录app
	loginApp(account, password) {
		this._STORE.dispatch('initNim/initNimSDK', {
			account: account,
			userSig: password
		}).then(res => {
			// console.log(res);
			uni.reLaunch({
				url: '/pages/index/index'
			})
		})
		
	}
	
}


export {
	Session,
	Team,
	Login
}