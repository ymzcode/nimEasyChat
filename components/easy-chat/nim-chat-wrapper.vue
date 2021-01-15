<template>
	<view ref="chatWrapper" class="im-flex" @longpress="longpress">
		<!-- 左箭头 -->
		<image v-if="flow === 'in'" :src="arrowImg" style="width: 40rpx;height: 40rpx;margin-top: 25rpx;" mode="aspectFill"></image>
		<!-- 插入的消息主体 -->
		<view :class="msgWrapperClass"><slot></slot></view>
		<!-- 右箭头 -->
		<image v-if="flow === 'out'" :src="arrowImg" style="width: 40rpx;height: 40rpx;margin-top: 25rpx;" mode="aspectFill"></image>
	</view>
</template>

<script>
// #ifdef APP-NVUE
const dom = weex.requireModule('dom');
// #endif
export default {
	props: {
		// 消息的流向 in 收到 out 发出
		flow: {
			type: String,
			default: 'in'
		},
		// 消息的类型
		type: {
			type: String,
			default: ''
		},
		// 后期添加的消息体
		msg: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	computed: {
		msgWrapperClass() {
			let style = 'leftMsg im-bg-white';
			// 对自己发出的消息 单独做样式处理
			if (this.flow === 'out') {
				style = 'rightMsg';
				this.type === 'text' ? (style += ' blue') : (style += ' im-bg-white');
			}
			return style;
		},
		// 箭头图标
		arrowImg() {
			if (this.flow === 'out') {
				switch (this.type) {
					case 'text':
						return '/static/easy-chat/chat/rightarrow-blue.png';
						break;
					default:
						return '/static/easy-chat/chat/rightarrow.png';
						break;
				}
			} else {
				return '/static/easy-chat/chat/leftarrow.png';
			}
			return '';
		}
	},
	methods: {
		longpress(e) {
			console.log('消息长按事件', e);
			let data = {
				msg: this.msg,
				getComponentRect: null
			}
			const result = dom.getComponentRect(this.$refs.chatWrapper, option => {
				console.log('getComponentRect:', option);
				data.getComponentRect = option
				this.$emit('longpress', data)
			});
			e.stopPropagation()
		}
	}
};
</script>

<style scoped>
.leftMsg,
.rightMsg {
	padding: 20rpx;
	border-radius: 10rpx;
	margin-top: 10rpx;
	flex: 1;
}

.leftMsg {
	background-color: #fff;
	margin-left: -15rpx;
}

.rightMsg {
	margin-right: -15rpx;
}
.blue {
	background-color: #bae3fe;
}
</style>
