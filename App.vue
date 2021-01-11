<script>
// 当前自定义消息的类型
/*
*
* type: 'votes' 投票消息
* type: 'navigateTo' 跳转消息
* 格式： type: 'navigateTo',
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
</style>
