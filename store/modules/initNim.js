import config from '@/common/NIM/config.js'
import errorTrapping from '@/common/NIM/errorTrapping.ts'
import handleFunction from '@/common/NIM/handleFunction.ts'

const SDK = require(`@/common/NIM/${config.NIMSDK}`)

const ALLSTATE = {
	// 全局nim， 唯一
	nim: null,
	// 从nim返回的用户信息， 之后网页的用户信息都用这个信息。
	nimUserInfo: null,
	// 我的nimId
	userUID: null,
	// 实例化错误处理方法, 单一实例
	errCommon : new errorTrapping()
}


export default {
	namespaced: true,
	state: ALLSTATE,
	getters: {
		nimUserInfo: state => {
			return state.nimUserInfo
		},
		userUID: state => {
			return state.userUID
		},
		nim: state => {
			return state.nim
		},
		// 这样用会有问题
		// getters: state => {
		// 	return state.errCommon
		// }
	},
	mutations: {
		// 清空Nim state中的值
		clearInitNimState(state) {
			for (let key in state) {
				state[key] = null
			}
			console.log('清空state中的值', state)
		},
		initNimSDK(state, data) {
			// console.log('initnimSDK', data)
			state.nim = data.NIM
		},
		setNimUserNim(state, data) {
			state.nimUserInfo = data
			console.log('存储成功', data)
		},
		setNimId(state, data) {
			state.userUID = data.id
		}
	},
	actions: {
		initNimSDK({
			state,
			commit,
			dispatch,
			getters
		}, data) {
			if (state.nim) {
				console.log('当前已经登陆')
				return;
			}
			
			
			try {
				
				// 实例化nim处理方法
				let nimHandle = new handleFunction({commit: commit, state: state, dispatch: dispatch, getters: getters})
				
				let nim = new SDK.NIM({
					// 初始化SDK
					debug: config.ISDEBUG,
					db: config.USEDb,
					appKey: config.APPKEY,
					account: '122',
					token: 'e10adc3949ba59abbe56e057f20f883e',
					onconnect: nimHandle.onConnect,
					// 用户名片
					onmyinfo: nimHandle.onMyInfo,
					onupdatemyinfo: nimHandle.onUpdateMyInfo,
					// logFunc: nimHandle.error,
					onerror: nimHandle.onError,
					// 断开连接后的回调
					// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
					ondisconnect: nimHandle.onDisconnect
				})
				commit('initNimSDK', {
					NIM: nim
				})
			} catch (e) {
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
			
		},
		/*
		 * 代理nim sdk中对NIM的操作方法
		 * @functionName  nim sdk中的方法名
		 * @options 传递给sdk方法的参数
		 */
		delegateNimFunction({
			state
		}, {
			functionName,
			options
		}) {
			const nim = state.nim
			if (functionName && nim[functionName] && typeof nim[functionName] === 'function') {
				try {
					return nim[functionName](options).catch(err => {
						console.error('delegateNimFunction', err)
						// log.appErrorLog.get(err)
						throw Error(`调用NIM集成的函数 '${functionName}' 时出错`)
					})
				} catch (e) {
					console.error(e)
					// log.appErrorLog.get(e)
					throw Error(`调用NIM集成的函数 '${functionName}' 时出错`)
				}
			} else {
				throw (`There is not property of '${functionName}' in nim or '${functionName}' is not a function`)
			}
		},
		// 登出app
		logOut({
			state,
			commit
		}) {
			// state.nim && state.nim.disconnect()
			// 清除实例
			state.nim && state.nim.destroy({
				done: function(err) {
					console.log('实例已被完全清除', err)
					commit('clearInitNimState')
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			})
		}
	}
}
