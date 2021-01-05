import store from '@/store/index';

class NimHandle {
	constructor() {
	}

	/*
	*
	* 	
		连接建立后的回调, 会传入一个对象, 包含登录的信息, 有以下字段

		lastLoginDeviceId: 上次登录的设备的设备号
		customTag: 客户端自定义tag,登录时多端同步改字段，最大32个字符
		connectionId: 本次登录的连接号
		ip: 客户端IP
		port: 客户端端口
		country: 本次登录的国家
	*/
	onConnect(data): void {
		console.log('------- onConnect', data);
	}
	
	/*
	*
	* 同步登录用户名片的回调, 会传入用户名片
	*/
	onMyInfo(data): void {
		console.log('------- onMyInfo', data);
		store.commit('initNim/setNimUserNim', data);
		store.commit('initNim/setNimId', data.account);
	}
	
	/*
	*
	* 同步好友用户名片的回调, 会传入用户名片数组
	*/
	onusers(data): void {
		console.log('------- onusers', data);
	}

	/*
	*
	* 当前登录用户在其它端修改自己的个人名片之后的回调, 会传入用户名片
	*/
	onUpdateMyInfo(data): void {
		console.log('------- onUpdateMyInfo', data);
		store.commit('initNim/setNimUserNim', data);
		store.commit('initNim/setNimId', data.account);
	}
	
	/*
	*
	* 用户名片更新后的回调, 会传入用户名片
	*/
	onupdateuser(data): void {
		console.log('------- onupdateuser', data);
	}
	
	/*
	*
	* 	
		同步群列表的回调, 会传入群数组teams
		teams的属性invalid包含退出的群
	*/
	onteams(data): void {
		console.log('------- onteams', data);
		store.commit('initNim/saveTeamData', data)
	}
	
	/*
	*
	* 	
		群成员信息更新后的回调, 会传入群成员对象, 不过此时的信息是不完整的, 只会包括被更新的字段。当前登录帐号在其它端修改自己在群里面的昵称时也会收到此回调。
	*/
	onupdateteammember(data): void {
		console.log('------- onupdateteammember', data);
	}
	
	/*
	*
	* 	
		创建群的回调, 此方法接收一个参数, 包含群信息和群主信息
	*/
	onCreateTeam(data): void {
		console.log('------- onCreateTeam', data);
	}
	
	/*
	*
	* 	
		更新群的回调, 此方法接收一个参数, 更新后的群信息
	*/
	onUpdateTeam(data): void {
		console.log('------- onUpdateTeam', data);
	}
	
	/*
	*
	* 	
		新成员入群的回调, 此方法接收一个参数, 包含群信息和群成员信息
	*/
	onAddTeamMembers(data): void {
		console.log('------- onAddTeamMembers', data);
	}
	
	/*
	*
	* 	
		有人出群的回调, 此方法接收一个参数, 包含群信息和群成员账号
	*/
	onRemoveTeamMembers(data): void {
		console.log('------- onRemoveTeamMembers', data);
	}
	
	/*
	*
	* 	
		更新群管理员的回调, 此方法接收一个参数, 包含群信息和管理员信息
	*/
	onUpdateTeamManagers(data): void {
		console.log('------- onUpdateTeamManagers', data);
	}
	
	/*
	*
	* 	
		解散群的回调, 此方法接收一个参数, 包含被解散的群id
	*/
	onDismissTeam(data): void {
		console.log('------- onDismissTeam', data);
	}
	
	/*
	*
	* 	
		移交群的回调, 此方法接收一个参数, 包含群信息和新老群主信息
	*/
	onTransferTeam(data): void {
		console.log('------- onTransferTeam', data);
	}
	
	/*
	*
	* 	
		更新群成员禁言状态的回调, 此方法接收一个参数, 包含群信息和禁言状态信息
	*/
	onUpdateTeamMembersMute(data): void {
		console.log('------- onUpdateTeamMembersMute', data);
	}
	
	/*
	*
	* 批量更新会话的回调, 传出会话列表数组。此函数优先级高于上面的 onupdatesession，若定义了此函数，会话更新回调只会走这个函数。
	收到消息
	发送消息
	设置当前会话
	重置会话未读数
	*/
	onupdatesessions(data) :void {
		console.log('------- onupdatesessions', data)
	}
	
	/*
	*
	* 	
		同步置顶会话列表, 会传入会话列表
	*/
	onStickTopSessions(data): void {
		console.log('------- onStickTopSessions', data);
	}
	
	/*
	*
	* 	
		同步漫游消息(包括超大群漫游消息和其他漫游消息)的回调, 每个会话对应一个回调, 会传入消息数组
	*/
	onroamingmsgs(data): void {
		console.log('------- onroamingmsgs', data);
	}
	
	/*
	*
	* 	
		同步离线消息的回调, 每个会话对应一个回调, 会传入消息数组
	*/
	onofflinemsgs(data): void {
		console.log('------- onofflinemsgs', data);
	}
	
	/*
	*
	* 	
		收到消息的回调, 会传入消息对象
		当前登录帐号在其它端发送消息之后也会收到此回调, 注意此时消息对象的from字段就是当前登录的帐号
	*/
	onmsg(data): void {
		console.log('------- onmsg', data);
	}
	
	/*
	*
	* 	
		收到快捷评论，会传入两个参数，分别是对应的消息和评论
	*/
	onQuickComment(data): void {
		console.log('------- onQuickComment', data);
	}
	
	/*
	*
	* 	
		收到删除了快捷评论，会传入两个参数，分别是对应的消息和评论
	*/
	onDeleteQuickComment(data): void {
		console.log('------- onDeleteQuickComment', data);
	}
	
	/*
	*
	* 	
		同步离线系统通知的回调, 会传入系统通知数组
	*/
	onofflinesysmsgs(data): void {
		console.log('------- onofflinesysmsgs', data);
	}
	
	/*
	*
	* 	
		同步漫游系统通知的回调, 会传入系统通知数组
	*/
	onroamingsysmsgs(data): void {
		console.log('------- onroamingsysmsgs', data);
	}
	
	/*
	*
	* 	
		收到系统通知的回调, 会传入系统通知
	*/
	onsysmsg(data): void {
		console.log('------- onsysmsg', data);
	}
	
	/*
	*
	* 	
			
		更新系统通知后的回调, 会传入系统通知
		
		以下情况会收到此回调
		通过好友申请
		拒绝好友申请
		接受入群邀请
		拒绝入群邀请
		通过入群申请
		拒绝入群申请
		这些操作的发起方会收到此回调, 接收被更新的系统通知, 根据操作的类型系统通知会被更新为下面两种状态
		'passed': 已通过
		'rejected': 已拒绝
	*/
	onupdatesysmsg(data): void {
		console.log('------- onupdatesysmsg', data);
	}
	
	/*
	*
	* 	
			
		收到系统通知未读数的回调
		
		SDK 会管理内建系统通知的未读数, 此回调接收的对象包括以下字段
		total: 总共的未读数
		friend: 所有跟好友相关的系统通知的未读数
		addFriend: 直接加为好友的未读数
		applyFriend: 申请加为好友的未读数
		passFriendApply: 通过好友申请的未读数
		rejectFriendApply: 拒绝好友申请的未读数
		deleteFriend: 删除好友的未读数
		team: 所有跟群相关的系统通知的未读数
		teamInvite: 入群邀请的未读数
		rejectTeamInvite: 接受入群邀请的未读数
		applyTeam: 入群申请的未读数
		rejectTeamApply: 拒绝入群申请的未读数
	*/
	onsysmsgunread(data): void {
		console.log('------- onsysmsgunread', data);
	}
	
	/*
	*
	* 	
		更新系统通知未读数的回调
	*/
	onupdatesysmsgunread(data): void {
		console.log('------- onupdatesysmsgunread', data);
	}
	
	/*
	*
	* 	
		同步离线自定义系统通知的回调, 会传入系统通知数组
	*/
	onofflinecustomsysmsgs(data): void {
		console.log('------- onofflinecustomsysmsgs', data);
	}
	
	/*
	*
	* 	
		收到自定义系统通知的回调, 会传入系统通知
	*/
	oncustomsysmsg(data): void {
		console.log('------- oncustomsysmsg', data);
	}
	
	/*
	*
	* 	
		收到单向撤回消息的回调, 会传入被删除的消息数组
	*/
	onDeleteMsgSelf(data): void {
		console.log('------- onDeleteMsgSelf', data);
	}
	
	/*
	*
	* 	
		收到清除会话历史消息的回调, 会传入被删除的 sessionId 以及删除时间
	*/
	onClearServerHistoryMsgs(data): void {
		console.log('------- onClearServerHistoryMsgs', data);
	}
	
	/*
	*
	* 	
		当上面各个同步（不包括下面的同步群成员）完成后, 会调用此回调；注意, SDK保证在onsyncdone调用的时候上面的同步肯定完成了, 但是不保证各个同步回调的顺序。
	*/
	onsyncdone(data): void {
		console.log('------- onsyncdone', data);
	}
	

	onError(data): void {
		console.log('------- onError', data);
	}
	/*
	*断开连接后的回调
	此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
	此回调会收到一个对象, 包含错误的信息, 有以下字段
		code: 出错时的错误码, 可能为空
		302: 账号或者密码错误, 请跳转到登录页面并提示错误
		417: 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
		'kicked': 被踢
	当code为'kicked'的时候, 此对象会有以下字段
		reason: 被踢的原因
		samePlatformKick: 不允许同一个帐号在多个地方同时登录
		serverKick: 被服务器踢了
		otherPlatformKick: 被其它端踢了
		message: 文字描述的被踢的原因
		custom：被服务器踢的扩展字段，调用服务器API踢用户时可以自定义
		from: 踢人操作方的客户端类型，有以下几种：Android, iOS, PC, Web, Server, Mac, WindowsPhone,
		customClientType: 踢人操作方的自定义客户端类型，仅当操作方登录时指定了自定义客户端类型时才有
	*/
	onDisconnect(data): void {
		console.log('------- onDisconnect', data);
		switch (data.code) {
			// 账号或者密码错误, 请跳转到登录页面并提示错误
			case 302:
				store.state.initNim.errCommon.uploadInfo(data.message)
				break;
			// 重复登录, 当前账号已经在其它端登录了
			case 417:
				store.state.initNim.errCommon.uploadInfo('重复登录, 当前账号已经在其它端登录了')
				break;
			// 被踢, 请提示错误后跳转到登录页面
			case 'kicked':
				store.state.initNim.errCommon.uploadInfo('你的帐号已被踢出下线，请确定帐号信息安全!')
				store.dispatch('initNim/logOut');
				break;
			case 'logout':
				store.state.initNim.errCommon.successInfo('退出登录成功')
				break;
			default:
				break;
		}
	}

	error(data): void {
		console.log(data);
	}
}

export default NimHandle;