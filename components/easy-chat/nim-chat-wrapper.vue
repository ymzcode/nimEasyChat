<template>
	<view class="im-flex">
		<!-- 左箭头 -->
		<image v-if="flow === 'in'" src="/static/easy-chat/chat/leftarrow.png" style="width: 40rpx;height: 40rpx;margin-top: 25rpx;" mode="aspectFill"></image>
		<!-- 插入的消息主体 -->
		<view :class="msgWrapperClass">
			<slot></slot>
		</view>
		<!-- 右箭头 -->
		<image v-if="flow === 'out'" src="/static/easy-chat/chat/rightarrow.png" style="width: 40rpx;height: 40rpx;margin-top: 25rpx;" mode="aspectFill"></image>
	</view>
</template>

<script>
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
			}
		},
		computed: {
			msgWrapperClass() {
				let style = 'leftMsg im-bg-white'
				// 对自己发出的消息 单独做样式处理
				if (this.flow === 'out') {
					style = 'rightMsg'
					this.type === 'text' ? style += ' blue' : style += ' im-bg-white'
				}
				return style
			}
		}
	}
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
	background-color: #BAE3FE;
}
</style>
