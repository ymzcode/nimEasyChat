import store from '@/store/index';

class NimHandle {
	private commit: any;
	private state: any;
	private dispatch: any;
	private getters: any;

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
		console.log(data);
	}

	onMyInfo(data): void {
		console.log(data);
		store.commit('initNim/setNimUserNim', data);
		store.commit('initNim/setNimId', data.account);
	}
	/*
	*
	* 同步好友用户名片的回调, 会传入用户名片数组
	*/
	onusers(data): void {
		console.log(data);
	}

	onUpdateMyInfo(data): void {
		console.log(data);
		store.commit('initNim/setNimUserNim', data);
		store.commit('initNim/setNimId', data.account);
	}
	
	/*
	*
	* 用户名片更新后的回调, 会传入用户名片
	*/
	onupdateuser(data): void {
		console.log(data);
	}
	
	/*
	*
	* 	
		同步群列表的回调, 会传入群数组teams
		teams的属性invalid包含退出的群
	*/
	onteams(data): void {
		console.log('onteams', data);
	}

	onError(data): void {
		console.log(data);
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
		console.log(data);
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