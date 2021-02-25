<script>
// 当前自定义消息的类型
/*
*
* type: 'msgCard'
* 格式： type: 'msgCard',
		data: {
			// 跳转的地址
			url: '/pageBook?id=1001',
			// 标题
			title: '四川凉山西昌发生森林大火是什么原因引起的呢？',
			// 详细内容
			detail: '一大早就看到弹出新闻一大早就看到弹 出新闻一大早就看到弹出新闻一大早就 看到弹出新闻…',
			// 封面
			appName: '防火码'
		}
* type: 'votes' 投票消息
* 格式： type: 'votes',
		data: {
			// 跳转的地址
			url: '',
			// 标题
			title: '',
			// 详细内容
			detail: '',
			// 封面
			cover: ''
		}
*/

export default {
	globalData: {
		// 节流函数
		throttle: function(fn, wait = 500, isImmediate = false) {
			let flag = true;
			if (isImmediate) {
				return function() {
					if (flag) {
						fn.apply(this, arguments);
						flag = false;
						setTimeout(() => {
							flag = true;
						}, wait);
					}
				};
			}
			return function() {
				if (flag == true) {
					flag = false;
					setTimeout(() => {
						fn.apply(this, arguments);
						flag = true;
					}, wait);
				}
			};
		},
		// 防抖函数
		debounce: function(fn, wait = 500, isImmediate = false) {
			let timerId = null;
			let flag = true;
			if (isImmediate) {
				return function() {
					clearTimeout(timerId);
					if (flag) {
						fn.apply(this, arguments);
						flag = false;
					}
					timerId = setTimeout(() => {
						flag = true;
					}, wait);
				};
			}
			return function() {
				// console.log(timerId);
				clearTimeout(timerId);
				timerId = setTimeout(() => {
					fn.apply(this, arguments);
				}, wait);
			};
		}
	},
	onLaunch: function() {
		console.log('App Launch');
		uni.onTabBarMidButtonTap(() => {
			console.log('监听中间按钮点击事件');
			uni.navigateTo({
				url: '/pages/address/address-list'
			})
		})
		
		// 加载字体图标
		
		const dom = weex.requireModule('dom');
		dom.addRule('fontFace', {
		    fontFamily: 'iconfont',
		    src: "url('https://at.alicdn.com/t/font_2387608_l365wnbndeg.ttf')"
		});
		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onError(e) {
		console.log('应用报错', e);
	}
};
</script>

<style>
/*每个页面公共css */
@import './common/NIM/easyChat.css';

.iconfont {
    font-family: iconfont;
}
</style>
