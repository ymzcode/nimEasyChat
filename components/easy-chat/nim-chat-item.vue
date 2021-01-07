<template>
	<view>
		<!-- 整体消息结构 -->
		<view class="im-flex cell" :style="msgBoxStyle">
			<!-- 对方的头像 -->
			<nim-avatar v-if="msg.flow === 'in'" :account="msg.from"></nim-avatar>
			<!-- 消息盒子 -->
			<view class="im-flex-column im-align-start">
				<!-- 消息体 -->
				<nim-chat-wrapper :flow="msg.flow">
					<text class="text" style="max-width: 450rpx;min-width:210rpx;">{{ msg.text }}</text>
				</nim-chat-wrapper>
				<!-- 消息的时间 -->
				<text :class="msg.flow === 'in' ? 'leftDate' : 'rightDate' ">{{msg.time | formatTime}}</text>
			</view>
			<!-- 自己的头像 -->
			<nim-avatar v-if="msg.flow === 'out'" :account="msg.from"></nim-avatar>
		</view>
	</view>
</template>

<script>
// 引入dayjs 过滤时间
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')

import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
import nimChatWrapper from '@/components/easy-chat/nim-chat-wrapper.vue'

export default {
	props: {
		msg: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	components: {
		nimAvatar,
		nimChatWrapper
	},
	computed: {
		// 控制消息左右显示
		msgBoxStyle() {
			let style = ''
			if (this.msg.flow === 'out') {
				style += 'justify-content: flex-end;'
			}
			return style
		}
	},
	filters: {
		formatTime(n) {
			if (dayjs(n).isAfter(dayjs().subtract(24, 'hour'))) {
				return dayjs(n).locale('zh-cn').fromNow()
			} else {
				return dayjs(n).format('YYYY/MM/DD HH:mm')
			}
		}
	}
}
</script>

<style scoped>
.cell {
	margin-top: 40rpx;
	padding: 0 20rpx;
}

.text {
	font-size: 30rpx;
	flex: 1;
	line-height: 42rpx;
}

.leftDate,
.rightDate {
	font-size: 24rpx;
	color: #999;
	margin-top: 10rpx;
}

.leftDate {
	margin-left: 40rpx;
}

.rightDate {
	margin-left: 20rpx;
}

.errMsg {
	background-color: rgba(0, 0, 0, 0.1);
	padding: 10rpx 40rpx;
	border-radius: 5px;
	color: #fff;
	font-size: 30rpx;
	margin: 40rpx 0;
}

.round {
	border-radius: 100;
}
</style>
