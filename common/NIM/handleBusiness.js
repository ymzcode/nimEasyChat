// 业务代码

import store from '@/store/index.js'

let handleBusiness = {}

// im 会话相关
handleBusiness.session = {
	// 保存历史会话
	saveHistory() {
		let arr = store.getters['initNim/sessionArr']
		let userId = store.getters['initNim/userUID']
		if (arr) {
			uni.setStorage({
			key: `historySession-${userId}`,
			data: arr,
			success: function() {
					console.log('保存历史会话成功');
				}
			});
		}
	},

	// 读取历史会话
	readHistory() {
		let userId = store.getters['initNim/userUID']
		let sessionArr = uni.getStorageSync(`historySession-${userId}`) || []
		store.commit('initNim/saveSessionData', sessionArr)
	}
}

// im 群组相关
handleBusiness.team = {
	// 添加成员
	addMember(teamId,accounts) {
		let arr = []
		if (!Array.isArray(accounts)) {
			arr = [accounts]
		}
		
		store.dispatch('initNim/nimAddTeamMembers', {
			teamId: teamId,
			accounts: arr
		}).then(res => {
			uni.showToast({
				title: '发送邀请成功'
			})
		})
	}
}

export default handleBusiness
