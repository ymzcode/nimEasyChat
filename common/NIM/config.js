const config = {
	NIMSDK: 'NIM_Web_SDK_miniapp_v8.2.0.js',
	// 是否开启调试, 如果开启调试, 将会在控制台输出一些log。默认false不输出日志, 可以传true来开启日志。
	ISDEBUG: false,
	// secure 模式下会通过 https 协议跟服务器建立连接, 非 secure 模式下会通过 http 协议跟服务器建立连接, 默认 true
	ISSECURE: true,
	// 在云信管理后台查看应用的 appKey
	APPKEY: 'fa52793da28cb2cedf86577c46a022de',
	// 是否使用数据库
	USEDb: false,
	// 默认用户头像
	defaultUserIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-icon.png',
	// 默认普通群头像
	defaultGroupIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-group.png',
	// 默认高级群头像
	defaultAdvancedIcon: 'http://yx-web.nos.netease.com/webdoc/h5/im/default-advanced.png',
}

export default config