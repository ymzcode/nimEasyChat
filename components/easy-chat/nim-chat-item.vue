<template>
	<view>
		<!-- 整体消息结构 -->
		<view class="im-flex cell" :style="msgBoxStyle">
			<!-- 对方的头像 -->
			<nim-avatar v-if="msg.flow === 'in'" :account="msg.from"></nim-avatar>
			<!-- 消息盒子 -->
			<view class="im-flex-column im-align-start">
				<!-- 消息体 -->
				<nim-chat-wrapper :flow="msg.flow" :type="msg.type">
					<!-- 普通文本消息 -->
					<text v-if="msg.type === 'text'" class="text" style="max-width: 450rpx;min-width:210rpx;word-wrap: break-word;word-break: break-all;">{{ msg.text }}</text>
					<!-- 图片消息 -->
					<chat-item-image v-else-if="msg.type === 'image'" :msg="msg"></chat-item-image>
					<!-- 视频消息 -->
					<chat-item-video v-else-if="msg.type === 'video'" :msg="msg"></chat-item-video>
					<!-- 自定义消息 -->
					<template v-else-if="msg.type === 'custom'">
						<!-- 跳转消息类型 -->
						<chat-item-navigate v-if="customType === 'votes'" :msg="msg"></chat-item-navigate>
						<chat-item-msgcard v-else-if="customType === 'msgCard'" :msg="msg"></chat-item-msgcard>
						<text v-else class="im-font-28">未定义的类型</text>
					</template>
					
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
import chatItemNavigate from '@/components/easy-chat/chat-item-navigate.vue'
import chatItemMsgcard from '@/components/easy-chat/chat-item-msgcard.vue'
import chatItemImage from '@/components/easy-chat/chat-item-image.vue'
import chatItemVideo from '@/components/easy-chat/chat-item-video.vue'

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
		nimChatWrapper,
		chatItemNavigate,
		chatItemMsgcard,
		chatItemImage,
		chatItemVideo
	},
	computed: {
		// 控制消息左右显示
		msgBoxStyle() {
			let style = ''
			if (this.msg.flow === 'out') {
				style += 'justify-content: flex-end;'
			}
			return style
		},
		// 过滤自定义消息类型
		customType() {
			let type = ''
			let contentObj = JSON.parse(this.msg.content)
			if (contentObj && contentObj.type) {
				type = contentObj.type
			}
			return type
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
	flex-direction: row;
	font-size: 30rpx;
	flex: 1;
	line-height: 42rpx;
	flex-wrap: wrap;
	overflow: hidden;
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
