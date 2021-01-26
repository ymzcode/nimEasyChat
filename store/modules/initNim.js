import config from '@/common/NIM/config.js'
import errorTrapping from '@/common/NIM/errorTrapping.ts'
import handleFunction from '@/common/NIM/handleFunction.ts'
import Vue from 'vue'

const SDK = require(`@/common/NIM/${config.NIMSDK}`)

const ALLSTATE = {
	// 全局nim， 唯一
	nim: null,
	// 从nim返回的用户信息， 之后网页的用户信息都用这个信息。
	nimUserInfo: {},
	// 我的nimId
	userUID: null,
	// 群列表的数组数据结构
	teamArr: [],
	// 当前用户名片的数组结构
	userArr: [],
	// 当前使用的会话id
	currentSessionId: '',
	// 所有消息的数组
	msgArr: [],
	// 会话列表的数组
	sessionArr: [],
	// 群成员列表数据
	teamMembersArr: [],
	
	// 当前正在播放的语音
	playAudioId: '',
	
	// 当前网络的类型
	networkType: '',
	
	// 当前正在输入的会话,使用数组形式存储正在输入的会话。
	writngSessionId: [],
	
	// 所有的系统消息
	systemMsgArr: [],
	

	// 实例化错误处理方法, 单一实例
	errCommon: new errorTrapping()
}


export default {
	namespaced: true,
	// 这里不能直接赋值 保持ALLSTATE 的独立性 方便后续 清空state中的值类型判断是对的
	state: Object.assign({}, ALLSTATE),
	getters: {
		nimUserInfo: state => {
			return state.nimUserInfo
		},
		userUID: state => {
			return String(state.userUID)
		},
		nim: state => {
			return state.nim
		},
		// 群聊的obj数据结构  以teamid作为key
		teamObj: state => {
			let obj = {}
			if (state.teamArr.length > 0) {
				state.teamArr.map(item => {
					obj[item.teamId] = item
				})
			}
			return obj
		},
		// 我的群组 数组数据
		teamArr: state => {
			return state.teamArr
		},
		// 用户资料 数组数据
		userArr: state => {
			return state.userArr
		},
		// 用户名片的obj数据结构， 以accid作为key
		userObj: state => {
			let obj = {}
			if (state.userArr.length > 0) {
				state.userArr.map(item => {
					obj[item.account] = item
				})
			}
			return obj
		},
		// 根据消息数据生成的消息对象数据结构, 以icClient作为消息的key
		msgObj: state => {
			let obj = {}
			if (state.msgArr.length > 0) {
				state.msgArr.map(item => {
					obj[item.idClient] = item
				})
			}
			return obj
		},
		// 根据会话生成的消息对象数据数组结构， 以sessionId作为key
		currentSessionMsg: state => {
			let obj = {}
			if (state.msgArr.length > 0) {
				state.msgArr.map(item => {
					if (!obj[item.sessionId]) {
						obj[item.sessionId] = []
					}
					obj[item.sessionId].push(item)
				})
			}
			return obj
		},
		// 当前会话的id
		currentSessionId: state => {
			return state.currentSessionId
		},
		// 所有会话的对象数据 以会话id作为key
		sessionObj: state => {
			let obj = {}
			if (state.sessionArr.length > 0) {
				state.sessionArr.map(item => {
					obj[item.id] = item
				})
			}
			return obj
		},
		// 所有会话的 数组数据
		sessionArr: state => {
			return state.sessionArr
		},
		// 所有群成员 数组数据
		teamMembersArr: state => {
			return state.teamMembersArr
		},
		// 所有群成员 对象数据
		teamMembersObj: state => {
			let obj = {}
			if (state.teamMembersArr.length > 0) {
				state.teamMembersArr.map(item => {
					obj[item.teamId] = item
				})
			}
			return obj
		},
		
		// 正在播放的语音id
		playAudioId: state => {
			return state.playAudioId
		},
		
		// networkType
		networkType: state => {
			return state.networkType
		},
		// 正在输入的会话
		writngSessionId: state => {
			return state.writngSessionId
		},
		// 系统消息
		systemMsgArr: state => {
			// 判断是否是自定义系统通知 
			// 如果是 过滤content
			let arr = [].concat(state.systemMsgArr)
			// 这里有一个隐患！！！！！
			// 可能在修改原数组的数据
			// 需要改进
			return arr.map(item => {
				if (item.type === 'custom' && typeof item.content === 'string') {
					item.content = JSON.parse(item.content)
				}
				return item
			})
			
		}
	},
	mutations: {
		// 清空Nim state中的值
		clearInitNimState(state) {
			try {
				// 将手动清空改为自动清空 (需注意清空后的变量类型) (错误处理函数不能清空)
				for(let key in ALLSTATE){
					if (key === 'errCommon') {
						continue;
					}
					// console.log('key', key, 'ALLSTATE[key].constructor', ALLSTATE[key] && ALLSTATE[key].constructor)
					
					if (ALLSTATE[key] === null) {
						state[key] = null
					} else if (Array.isArray(ALLSTATE[key])) {
						state[key] = new Array();
						// console.log('数组走了')
					} else if (ALLSTATE[key].constructor === Object) {
						state[key] = {}
					} else if (ALLSTATE[key].constructor === Number) {
						state[key] = 0
					} else if (ALLSTATE[key].constructor === String) {
						state[key] = ''
					}
				}
				console.log('清空state中的值', state)
			} catch (e) {
				state.errCommon.uploadInfo(e);
				console.error('清空state 中的值出现错误', e);
			}
		},
		initNimSDK(state, data) {
			// console.log('initnimSDK', data)
			state.nim = data.NIM
		},
		setNimUserNim(state, data) {
			state.nimUserInfo = data
			state.userArr = state.nim.mergeUsers(state.userArr, data)
			console.log('存储成功', data)
		},
		setNimId(state, id) {
			console.log('设置当前登录用户id', id);
			state.userUID = String(id)
		},
		// 保存群数组的数据
		saveTeamData(state, data) {
			try {
				const nim = state.nim
				let arr = []
				if (!Array.isArray(data)) {
					arr = [data]
				}
				state.teamArr = nim.mergeTeams(state.teamArr, data)
				console.log('合并群数据完成', state.teamArr)
			} catch (e) {
				//TODO handle the exception
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
		},
		// 保存好友的数据
		saveUserData(state, data) {
			try {
				const nim = state.nim
				let arr = []
				if (!Array.isArray(data)) {
					arr = [data]
				}
				state.userArr = nim.mergeUsers(state.userArr, data)
				console.log('合并用户卡片数据完成', state.userArr)

			} catch (e) {
				//TODO handle the exception
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
		},
		// 保存消息数据
		saveMsg(state, data) {
			try {
				const nim = state.nim
				let arr = []
				if (!Array.isArray(data)) {
					arr = [data]
				}
				state.msgArr = nim.mergeMsgs(state.msgArr, data)
				console.log('合并消息数据完成', state.msgArr)
			} catch (e) {
				//TODO handle the exception
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
		},
		// 保存会话数据
		saveSessionData(state, data) {
			try {
				const nim = state.nim
				let arr = []
				if (!Array.isArray(data)) {
					arr = [data]
				}
				state.sessionArr = nim.mergeSessions(state.sessionArr, data)
				
				// console.log(config.isShowtabBarUnread, config.tabBarUnreadIndex)
				
				// 计算所有会话的未读数
				if (config.isShowtabBarUnread) {
					let allUnreadNum = 0
					state.sessionArr.map(item => {
						allUnreadNum = allUnreadNum + item.unread
					})
					if (allUnreadNum > 0) {
						// console.log('设置未读数', allUnreadNum)
						// 设置消息的未读数
						uni.setTabBarBadge({
						  index: config.tabBarUnreadIndex,
						  text: allUnreadNum >= 99 ? '99+' : String(allUnreadNum)
						})
					} else {
						uni.removeTabBarBadge({
							index: config.tabBarUnreadIndex
						})
					}
				}
				
				
				console.log('合并会话数据完成', state.sessionArr)
			} catch (e) {
				//TODO handle the exception
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
		},
		// 保存群成员列表
		saveTeamMembersData(state, data) {
			try {
				const nim = state.nim
				state.teamMembersArr = nim.mergeMsgs(state.teamMembersArr, data)
				console.log('合并群成员完成', state.teamMembersArr)
			} catch (e) {
				//TODO handle the exception
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
		},
		// 保存系统消息
		saveSystemMsgArr(state, data) {
			try {
				const nim = state.nim
				
				let arr = []
				if (!Array.isArray(data)) {
					arr = [data]
				}
				
				// 计算系统消息的未读数
				let unread = uni.getStorageSync('systemUnreadNum') || 0
				unread = unread + arr.length
				uni.setStorageSync('systemUnreadNum', unread)
				
				state.systemMsgArr = nim.mergeSysMsgs(state.systemMsgArr, arr)
				console.log('合并系统通知完成', state.systemMsgArr)
			} catch (e) {
				//TODO handle the exception
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
		},
		// 更新系统通知的内容
		updateSystemMsgArr(state, data) {
			try{
				const nim = state.nim
				
				let sysObj = nim.findSysMsg(state.systemMsgArr, {
					keyPath: 'idServer',
					value: data.idServer
				})
				
				if (sysObj) {
					sysObj.state = data.state
					state.systemMsgArr = nim.mergeSysMsgs(state.systemMsgArr, sysObj)
					console.log('更新 系统通知完成', state.systemMsgArr)
				} else {
					console.log('不存在此系统通知, 不做处理')
				}
				
			}catch(e){
				//TODO handle the exception
				console.error(e);
				state.errCommon.uploadInfo(e)
			}
		},
		// 删除某个消息(只删除state中的缓存值) 传递消息对象
		deleteMsg(state, msg) {
			for (let i = 0; i <= state.msgArr.length; i++) {
				if (state.msgArr[i] && state.msgArr[i].idClient === msg.idClient) {
					state.msgArr.splice(i, 1)
					console.log('删除state中消息完成');
					break;
				}
			}
		},
		// 设置当前会话的id
		setSessionId(state, data) {
			state.currentSessionId = data
		},
		// 重置当前会话id
		resetSessionId(state, data) {
			state.currentSessionId = ''
		},
		
		//设置正在播放的语音
		setAudioId(state, id) {
			state.playAudioId = id
		},
		// 移除正在播放的语音
		removeAudioId(state) {
			state.playAudioId = ''
		},
		// 改变当前网络的类型
		changeNetworkType(state, type) {
			state.networkType = type
			if (type === 'none') {
				uni.showToast({
					title: '当前处于无网络状态，请连接网络后重试！',
					icon: 'none'
				})
			}
		},
		// 更改正在输入的会话列表（没有做清理）
		changeWritingSession(state, session) {
			console.log('更改正在输入的会话列表', session);
			// 重新赋值更改，触发组件数据中的对应监听
			let arr = state.writngSessionId.slice(0)
			if (arr.indexOf(session) === -1) {
				arr.push(session)
			}
			state.writngSessionId = [...arr]
		}
		
	},
	actions: {
		initNimSDK({
			state,
			commit,
			dispatch,
			getters
		}, loginData) {
			if (state.nim) {
				console.log('当前已经登陆')
				return;
			}

			try {
				// 实例化nim处理方法
				let nimHandle = new handleFunction()

				let nim = new SDK.NIM({
					// 初始化SDK
					debug: config.ISDEBUG,
					db: config.USEDb,
					appKey: config.APPKEY,
					account: loginData.account,
					token: loginData.userSig,
					onconnect: nimHandle.onConnect,
					onwillreconnect: nimHandle.onwillreconnect,
					// 用户名片
					onmyinfo: nimHandle.onMyInfo,
					onupdatemyinfo: nimHandle.onUpdateMyInfo,
					// 是否同步好友对应的用户名片列表, 默认true, 如果传false就收不到onusers回调.
					syncFriendUsers: true,
					onusers: nimHandle.onusers,
					onupdateuser: nimHandle.onupdateuser,
					// 是否同步群列表, 默认true. 如果传false就收不到群列表, 即不会收到onteams回调, 开发者后续可以调用获取群列表来获取群列表.
					syncTeams: true,
					// 是否同步额外的群信息, 默认true会同步额外的群信息, 目前包括

					// 当前登录用户是否开启某个群的消息提醒 (SDK 只是存储了此信息, 具体用此信息来做什么事情完全由开发者控制)
					// 调用接口NIM#updateInfoInTeam来关闭/开启某个群的消息提醒
					// 调用接口NIM#notifyForNewTeamMsg来查询是否需要群消息通知
					syncExtraTeamInfo: true,
					// 同步群列表的回调, 会传入群数组teams
					// teams的属性invalid包含退出的群
					onteams: nimHandle.onteams,
					/*
						不再推荐使用
						onteammembers: nimHandle.onteammembers,
					*/
					// 群成员信息更新后的回调, 会传入群成员对象, 不过此时的信息是不完整的, 只会包括被更新的字段。当前登录帐号在其它端修改自己在群里面的昵称时也会收到此回调。
					onupdateteammember: nimHandle.onupdateteammember,
					// 创建群的回调, 此方法接收一个参数, 包含群信息和群主信息
					onCreateTeam: nimHandle.onCreateTeam,
					// 更新群的回调, 此方法接收一个参数, 更新后的群信息
					onUpdateTeam: nimHandle.onUpdateTeam,
					// 新成员入群的回调, 此方法接收一个参数, 包含群信息和群成员信息
					onAddTeamMembers: nimHandle.onAddTeamMembers,
					// 有人出群的回调, 此方法接收一个参数, 包含群信息和群成员账号
					onRemoveTeamMembers: nimHandle.onRemoveTeamMembers,
					// 更新群管理员的回调, 此方法接收一个参数, 包含群信息和管理员信息
					onUpdateTeamManagers: nimHandle.onUpdateTeamManagers,
					// 解散群的回调, 此方法接收一个参数, 包含被解散的群id
					onDismissTeam: nimHandle.onDismissTeam,
					// 移交群的回调, 此方法接收一个参数, 包含群信息和新老群主信息
					onTransferTeam: nimHandle.onTransferTeam,
					// 更新群成员禁言状态的回调, 此方法接收一个参数, 包含群信息和禁言状态信息
					onUpdateTeamMembersMute: nimHandle.onUpdateTeamMembersMute,
					// 是否同步会话的未读数, 默认不同步
					// 如果选择同步
					// 那么在一个端读过的会话在其它端也会被标记为已读
					// 在调用NIM#setCurrSession的时候 SDK 会自动同步一次未读数, 此后如果收到当前会话的消息, 需要手动调用NIM#resetSessionUnread来同步未读数
					syncSessionUnread: true,
					onsessions: nimHandle.onsessions,
					// 批量更新会话的回调, 传出会话列表数组。此函数优先级高于上面的 onupdatesession，若定义了此函数，会话更新回调只会走这个函数。

					// 收到消息
					// 发送消息
					// 设置当前会话
					// 重置会话未读数
					onupdatesession: nimHandle.onupdatesession,
					// 是否同步置顶会话，默认false，如果传true，则在有置顶会话时，可以收到onStickTopSessions回调，传false则不会
					syncStickTopSessions: true,
					// 同步置顶会话列表, 会传入会话列表
					onStickTopSessions: nimHandle.onStickTopSessions,
					// 是否同步漫游消息, 默认true. 如果传false就收不到漫游消息, 即不会收到onroamingmsgs回调.
					syncRoamingMsgs: true,
					// 同步漫游消息(包括超大群漫游消息和其他漫游消息)的回调, 每个会话对应一个回调, 会传入消息数组
					onroamingmsgs: nimHandle.onroamingmsgs,
					// 同步离线消息的回调, 每个会话对应一个回调, 会传入消息数组
					onofflinemsgs: nimHandle.onofflinemsgs,
					// 收到消息的回调, 会传入消息对象
					// 当前登录帐号在其它端发送消息之后也会收到此回调, 注意此时消息对象的from字段就是当前登录的帐号
					onmsg: nimHandle.onmsg,
					// 收到快捷评论，会传入两个参数，分别是对应的消息和评论
					onQuickComment: nimHandle.onQuickComment,
					// 收到删除了快捷评论，会传入两个参数，分别是对应的消息和评论
					onDeleteQuickComment: nimHandle.onDeleteQuickComment,
					// 是否同步已读回执时间戳, 默认true. 如果传false就收不到已读回执时间戳.
					syncMsgReceipts: true,
					// 同步离线系统通知的回调, 会传入系统通知数组
					onofflinesysmsgs: nimHandle.onofflinesysmsgs,
					// 同步漫游系统通知的回调, 会传入系统通知数组
					onroamingsysmsgs: nimHandle.onroamingsysmsgs,
					// 收到系统通知的回调, 会传入系统通知
					onsysmsg: nimHandle.onsysmsg,
					// 更新系统通知后的回调, 会传入系统通知

					// 以下情况会收到此回调
					// 通过好友申请
					// 拒绝好友申请
					// 接受入群邀请
					// 拒绝入群邀请
					// 通过入群申请
					// 拒绝入群申请
					// 这些操作的发起方会收到此回调, 接收被更新的系统通知, 根据操作的类型系统通知会被更新为下面两种状态
					// 'passed': 已通过
					// 'rejected': 已拒绝
					onupdatesysmsg: nimHandle.onupdatesysmsg,
					// 收到系统通知未读数的回调

					// SDK 会管理内建系统通知的未读数, 此回调接收的对象包括以下字段
					// total: 总共的未读数
					// friend: 所有跟好友相关的系统通知的未读数
					// addFriend: 直接加为好友的未读数
					// applyFriend: 申请加为好友的未读数
					// passFriendApply: 通过好友申请的未读数
					// rejectFriendApply: 拒绝好友申请的未读数
					// deleteFriend: 删除好友的未读数
					// team: 所有跟群相关的系统通知的未读数
					// teamInvite: 入群邀请的未读数
					// rejectTeamInvite: 接受入群邀请的未读数
					// applyTeam: 入群申请的未读数
					// rejectTeamApply: 拒绝入群申请的未读数
					onsysmsgunread: nimHandle.onsysmsgunread,
					// 更新系统通知未读数的回调
					onupdatesysmsgunread: nimHandle.onupdatesysmsgunread,
					// 同步离线自定义系统通知的回调, 会传入系统通知数组
					onofflinecustomsysmsgs: nimHandle.onofflinecustomsysmsgs,
					// 收到自定义系统通知的回调, 会传入系统通知
					oncustomsysmsg: nimHandle.oncustomsysmsg,
					// 收到单向撤回消息的回调, 会传入被删除的消息数组
					onDeleteMsgSelf: nimHandle.onDeleteMsgSelf,
					// 收到清除会话历史消息的回调, 会传入被删除的 sessionId 以及删除时间
					onClearServerHistoryMsgs: nimHandle.onClearServerHistoryMsgs,
					// 当上面各个同步（不包括下面的同步群成员）完成后, 会调用此回调；注意, SDK保证在onsyncdone调用的时候上面的同步肯定完成了, 但是不保证各个同步回调的顺序。
					onsyncdone: nimHandle.onsyncdone,
					// 是否自动标记消息为已收到

					// 默认情况下SDK在收到服务器推送过来的消息后, 会在将消息推给开发者时将消息标记为已读状态, 下次登录后就不会收到标记为已读的消息。
					// SDK通过onofflinemsgs、onofflinesysmsgs、onofflinecustomsysmsgs等回调将离线消息推送给开发者
					// SDK通过onmsg、onsysmsg、oncustomsysmsg等回调将在线消息推送给开发者
					// 如果开发者想控制标记消息为已收到的时机, 那么可以传false, 这样SDK就不会自动标记消息已读, 此时需要开发者在适当的时机调用相关的方法来标记消息为已读, 否则下次登录后还会收到未标记为已读的消息。
					// 调用标记系统通知已读来标记系统通知和自定义系统通知为已读状态
					autoMarkRead: false,
					// SDK尝试重连的最大次数，超过后则不再尝试重连，并触发ondisconnect回调
					reconnectionAttempts: 5,
					// 是否开启快速自动重连，只有当needReconnect=true时该配置才有效
					quickReconnect: true,
					// 是否将动态图片缩略为静态图片，默认将动态图片缩略为静态图片

					// 仅在cover和contain缩略模式下，才支持将动态图片缩略为动态图片，其他模式下只能缩略为静态图片
					// 可以调用SDK的thumbnailImage，processImage等API生成图片的缩略图
					thumbnailToStatic: true,
					// 撤回消息后是否更新该消息影响的会话未读数。如某会话有两条消息未读，然后其中一条消息被撤回了，若该参数为true，则未读数变为1，否则未读数仍是2
					rollbackDelMsgUnread: false,
					// 默认 true，清除会话的消息时会去同时更新会话的未读数，lastmsg
					rollbackClearMsgsUnread: true,
					// 是否上报异常错误日志，可以将该项设为 false 来禁止上报错误日志
					// SDK会将部分错误及相关信息上传至云信统计平台，方便开发者统计及排查线上错误
					logReport: true,
					// 重置会话未读数时，若同步至服务器失败，是否仅重置本地会话未读数。当同步至服务器失败时，若为true，则本地未读数会被重置，服务器和其他端的未读数不会；若为false，则本地、服务器和其他端都不会被重置（重置失败），各端未读数会保持一致
					resetUnreadMode: false,

					// logFunc: nimHandle.error,
					onerror: nimHandle.onError,
					// 断开连接后的回调
					// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
					ondisconnect: nimHandle.onDisconnect
				})
				commit('initNimSDK', {
					NIM: nim
				})
				
				commit('setNimId', loginData.account)
				
				// 获取当前网络类型
				uni.getNetworkType({
					success: function (res) {
						// console.log(res);
						commit('changeNetworkType', res.networkType)
					}
				});
				// 注册监听网络改变事件
				uni.onNetworkStatusChange(function (res) {
					// console.log(res);
					commit('changeNetworkType', res.networkType)
				});
				
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

			if (!nim) {
				state.errCommon.uploadInfo('通讯还未初始化')
				throw Error(`NIM还未初始化`)
			}

			if (functionName && nim[functionName] && typeof nim[functionName] === 'function') {
				try {
					return nim[functionName](options)
					// .catch(err => {
					// 	console.error('delegateNimFunction', err)
					// 	state.errCommon.uploadInfo(`调用NIM集成的函数 '${functionName}' 时出错`)
					// 	throw Error(`调用NIM集成的函数 '${functionName}' 时出错`)
					// })
				} catch (e) {
					console.error('delegateNimFunction', e)
					state.errCommon.uploadInfo(`调用NIM集成的函数 ${functionName} 出错：${e.message}`)
					throw Error(`调用NIM集成的函数 '${functionName}' 时出错`)
				}
			} else {
				state.errCommon.uploadInfo(
					`There is not property of '${functionName}' in nim or '${functionName}' is not a function`)
				throw Error(`There is not property of '${functionName}' in nim or '${functionName}' is not a function`)
			}
		},
		// 设置当前会话id
		setCurrentSessionId({dispatch,commit}, data) {
			console.log('设置当前会话', data);
			dispatch('delegateNimFunction', {
				functionName: 'setCurrSession',
				options: data
			})
			
			let scene = data.split('-')[0];
			let to = data.split('-')[1];
			
			// 开始查询这个人
			if (scene === 'p2p') {
				dispatch('nimGetUser', to)
			}
			
			commit('setSessionId', data)
		},
		// 重置当前会话
		resetCurrentSession({dispatch,commit}) {
			console.log('重置当前会话');
			dispatch('delegateNimFunction', {
				functionName: 'resetCurrSession',
				options: {}
			})
			commit('resetSessionId')
		},
		
		// 发送消息
		nimSendMsg({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'sendText',
					options: {
						scene: options.scene,
						to: options.to,
						text: options.text,
						resend: false,
						cc: true,
						done: (error, msg) => {
							console.log('发送完成', error, msg)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								commit('saveMsg', msg)
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 发送文件消息（先预览 再发送）
		nimSendFile({dispatch, commit, state}, options) {
			uni.hideLoading()
			uni.showLoading({
				mask: true,
				title: '文件上传中···'
			})
			return new Promise((resolve, reject) => {
				try {
					dispatch('delegateNimFunction', {
						functionName: 'previewFile',
						options: {
							type: options.type,
							filePath: options.filePath,
							done: (error, file) => {
								console.log('预览文件完成', error, file)
								uni.hideLoading()
								if (error) {
									state.errCommon.uploadInfo(error);
									reject(error)
								} else {
									// 发送文件消息
									dispatch('delegateNimFunction', {
										functionName: 'sendFile',
										options: {
											scene: options.scene,
											to: options.to,
											type: options.type,
											// 文件对象, 开发者可以通过预览文件拿到文件对象
											file: file,
											cc: true,
											done: (error, msg) => {
												console.log('发送文件完成', error, msg)
												if (error) {
													state.errCommon.uploadInfo(error);
													reject(error)
												} else {
													commit('saveMsg', msg)
													resolve('')
												}
											}
										}
									})
								}
							}
						}
					})
				} catch (e) {
					//TODO handle the exception
					console.error(e);
					uni.hideLoading()
				}
				
			})
		},
		
		
		// 发送自定义消息
		nimSendCustomMsg({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'sendCustomMsg',
					options: {
						scene: options.scene,
						to: options.to,
						content: options.content,
						resend: false,
						cc: true,
						done: (error, msg) => {
							console.log('发送完成', error, msg)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								commit('saveMsg', msg)
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 发送自定义系统通知
		nimSendCustomSysMsg({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'sendCustomSysMsg',
					options: {
						scene: options.scene,
						to: options.to,
						content: options.content,
						// 是否只发送给在线用户
						// true时只发送给在线用户, 如果接收方不在线, 这条通知将被丢弃
						// false时假如接收方在线, 那么会立即收到该通知,假如接收方不在线, 会在其上线后推送过去。
						sendToOnlineUsersOnly: options.sendToOnlineUsersOnly,
						cc: true,
						done: (error, msg) => {
							console.log('发送自定义通知完成', error, msg)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 发送已读回执
		nimSendMsgReceipt({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'sendMsgReceipt',
					options: {
						msg: options.msg,
						done: (error, msg) => {
							console.log('发送已读回执完成', error, msg)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 语音转文字 仅支持通过预览文件或者发送文件消息拿到的音频 url, 或者收到的音频消息的 url
		nimAudioToText({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'audioToText',
					options: {
						url: options.url,
						done: (error, obj) => {
							console.log('语音转文字', error, obj)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 撤回消息 
		nimDeleteMsg({dispatch, commit, state, getters}, options) {
			
			let date = new Date().getTime() - 1000 * 60 * 5
			
			if (options.msg.time < date) {
				uni.showToast({
					title: '不能撤回发送时间超过5分钟的消息',
					icon: 'none'
				})
				return ;
			}
			
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'deleteMsg',
					options: {
						msg: options.msg,
						done: (error, obj) => {
							console.log('撤回消息', error, obj)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								try{
									commit('deleteMsg', options.msg)
									// 获取当前会话的信息 准备发送提醒消息
									let scene = getters.currentSessionId.split('-')[0]
									let to = getters.currentSessionId.split('-')[1]
									
									// 给提醒消息设置类型
									let tipContent = {
										// 撤回消息
										type: 'deleteMsg',
										data: {
											oldMsg: options.msg
										}
									}
									dispatch('nimSendTipMsg', {
										scene: scene,
										to: to,
										tip: JSON.stringify(tipContent)
									})
									resolve('')
								} catch(e) {
									//TODO handle the exception
									state.errCommon.uploadInfo(e);
									console.error(e)
									reject(e)
								}
							}
						}
					}
				})
			})
			
		},
		
		// 单向删除消息 不同与直接删除消息，单向删除消息后，自己看不到删除的消息，但对方仍能看到，也就是仅删除自己这侧的消息
		nimDeleteMsgSelf({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'deleteMsgSelf',
					options: {
						msg: options.msg,
						done: (error, obj) => {
							console.log('单向删除消息', error, obj)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								commit('deleteMsg', options.msg)
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 发送提醒消息 提醒消息用于会话内的状态提醒，如进入会话时出现的欢迎消息，或者会话命中敏感词后的提示消息等等.
		nimSendTipMsg({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'sendTipMsg',
					options: {
						scene: options.scene,
						to: options.to,
						tip: options.tip,
						cc: true,
						isLocal: options.isLocal || false,
						done: (error, msg) => {
							console.log('提醒消息', error, msg)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								commit('saveMsg', msg)
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 创建普通群
		nimCreateNormalTeam({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'createTeam',
					options: {
						type: 'normal',
						name: options.name,
						avatar: options.avatar,
						accounts: options.accounts,
						ps: '我建了一个普通群',
						done: (error, msg) => {
							console.log('创建普通群完成', error, msg)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 创建高级(会商)群
		nimCreateAdvancedTeam({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'createTeam',
					options: {
						type: 'advanced',
						name: options.name,
						avatar: options.avatar,
						accounts: options.accounts,
						intro: '群简介',
						announcement: '群公告',
						ps: '我建了一个普通群',
						done: (error, msg) => {
							console.log('创建普通群完成', error, msg)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 解散群 解散群后, 所有群成员会收到一条类型为'dismissTeam'的群通知消息。此类群通知消息的from字段为解散群的人的帐号, to字段的值为被对应的群ID。
		nimDismissTeam({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'dismissTeam',
					options: {
						teamId: options.teamId,
						done: (error, obj) => {
							console.log('解散群', error, obj)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 主动退群 
		nimLeaveTeam({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'leaveTeam',
					options: {
						teamId: options.teamId,
						done: (error, obj) => {
							console.log('主动退群', error, obj)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 标记系统通知为 已读
		nimMarkSysMsgRead({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'markSysMsgRead',
					options: {
						sysMsgs: options.sysMsgs,
						done: (error, obj) => {
							console.log('标记系统通知为已收到', error, obj)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve('')
							}
						}
					}
				})
			})
			
		},
		
		// 标记消息为 已收到  (和发送已读回执不同 , 标记后不会再从离线消息中收到)
		nimMarkMsgRead({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'markMsgRead',
					options: options.msgs
				})
			})
			
		},
		
		
		// 接受入群邀请
		nimAcceptTeamInvite({dispatch, commit, state}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'acceptTeamInvite',
					options: {
						idServer: options.idServer,
						teamId: options.teamId,
						from: options.from,
						done: (error, obj) => {
							console.log('接受入群邀请', error, obj)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								resolve(obj)
							}
						}
					}
				})
			})
			
		},
		
		// 获取云端的历史纪录
		nimGetHistoryMsgs({state,dispatch, commit}, data) {
			return new Promise((resolve, reject) => {
				console.log('拉取云端的历史消息');
				dispatch('delegateNimFunction', {
					functionName: 'getHistoryMsgs',
					options: {
						scene: data.scene,
						to: data.to,
						lastMsgId: data.lastMsgId,
						endTime: data.endTime,
						limit: 15,
						done: (error, allData) => {
							console.log('获取完成', error, allData)
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else {
								commit('saveMsg', allData.msgs)
								resolve(allData.msgs)
							}
						}
					}
				})
			})
		},
		
		// 搜索用户
		nimGetUser({state,getters,dispatch,commit}, account) {
			return new Promise((resolve, reject) => {
				// console.log('判断这个人是否已经存在', getters.userObj);
				if (!account || getters.userObj[String(account)]) {
					resolve(null)
					return ;
				}
				dispatch('delegateNimFunction', {
					functionName: 'getUser',
					options: {
						account: String(account),
						done: (error, user) => {
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else if (user) {
								commit('saveUserData', user);
								console.log('获取用户名片', error, user);
								resolve(user)
							}
						}
					}
				});
			})
		},
		
		// 获取群成员
		nimGetTeamMembers({state,getters,dispatch,commit}, teamId) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'getTeamMembers',
					options: {
						teamId: String(teamId),
						done: (error, obj) => {
							if (error) {
								state.errCommon.uploadInfo(error);
								reject(error)
							} else if (obj) {
								commit('saveTeamMembersData', obj)
								console.log('获取群成员', error, obj);
								resolve(obj)
							}
						}
					}
				});
			})
		},
		// 新增会话置顶
		nimAddStickTopSession({state,getters,dispatch,commit}, data) {
			return new Promise((resolve, reject) => {
				console.log(data);
				dispatch('delegateNimFunction', {
					functionName: 'addStickTopSession',
					options: {
						id: data.id,
						// 会话置顶的扩展字段
						topCustom: data.topCustom,
						done: (error, obj) => {
							if (error) {
								state.errCommon.uploadInfo(error);
								console.error(error);
								reject(error)
							} else if (obj) {
								console.log('新增会话置顶', error, obj);
								resolve(obj)
							}
						}
					}
				});
			})
		},
		// 取消会话置顶
		nimDeleteStickTopSession({state,getters,dispatch,commit}, options) {
			return new Promise((resolve, reject) => {
				dispatch('delegateNimFunction', {
					functionName: 'deleteStickTopSession',
					options: {
						id: options.id,
						done: (error, obj) => {
							if (error) {
								state.errCommon.uploadInfo(error);
								console.error(error);
								reject(error)
							} else if (obj) {
								console.log('取消会话置顶', error, obj);
								resolve(obj)
							}
						}
					}
				});
			})
		},
		
		// 登出app
		logOut({
			state,
			commit
		}) {
			// state.nim && state.nim.disconnect()
			return new Promise((resolve, reject) => {
				// 清除实例
				state.nim && state.nim.destroy({
					done: function(err) {
						console.log('实例已被完全清除', err)
						commit('clearInitNimState')
						resolve('')
					}
				})
			})
			
		}
	}
}
