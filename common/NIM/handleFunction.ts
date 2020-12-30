// 
interface storeData {
	commit: any;
	state: any;
	dispatch: any;
	getters: any;
}

class NimHandle {
	private commit: any;
	private state: any;
	private dispatch: any;
	private getters: any;
	
	constructor(option: storeData) {
		this.commit = option.commit
		this.state = option.state
		this.dispatch = option.dispatch
		this.getters = option.getters
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
	}
	
	onUpdateMyInfo(data): void {
		console.log(data);
	}
	
	onUpdateMyInfo(data): void {
		console.log(data);
	}
	
	onError(data): void {
		console.log(data);
	}
	
	onDisconnect(data): void {
		console.log(data);
	}
}

export default NimHandle;

/*
// 同步登录用户名片的回调, 会传入用户名片
export function onMyInfo(data) {
    console.log('同步我的信息', data)
    store.commit('setNimUserNim', {
        userInfo: data
    })
}

// 当前登录用户在其它端修改自己的个人名片之后的回调, 会传入用户名片
export function onUpdateMyInfo(data) {
    console.log('更新我的信息', data)
}

// 发生错误的回调, 会传入错误对象
export function onError(error, obj) {
    store.commit('optionLoading', null)
    console.log('发生错误', error, obj);
}


// 断开连接后的回调
// 此时说明 SDK 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
export function onDisconnect(error) {
    store.commit('optionLoading', null)
    console.error('onDisconnect error', error)
    switch (error.code) {
        // 账号或者密码错误, 请跳转到登录页面并提示错误
        case 302:
            MessageBox.alert('通讯账号或者密码错误，请重新登录','通讯断开连接',{
                type: 'warning',
                roundButton: true,
                callback: action => {
                    console.log('跳转登录')
                    store.dispatch('logOut')
                }
            })
            break
        case 417:
            MessageBox.alert('重复登录, 当前账号已经在其它端登录了','通讯断开连接',{
                type: 'warning',
                roundButton: true,
                callback: action => {
                    console.log('跳转登录')
                    store.dispatch('logOut')
                }
            })
            break
        // 被踢, 请提示错误后跳转到登录页面
        case 'kicked':
            MessageBox.alert('你的帐号已被踢出下线，请确定帐号信息安全!','下线通知',{
                type: 'warning',
                roundButton: true,
                callback: action => {
                    console.log('跳转登录')
                    store.dispatch('logOut')
                }
            })
            break
        case 'logout':
            Notification.success({
                title: '登出成功',
                duration: 1000
            })
            break;
        default:
            break
    }
}
*/
