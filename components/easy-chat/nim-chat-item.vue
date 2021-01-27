<template>
	<view class="im-position-relative">
		<!-- 展示提醒消息 -->
		<template v-if="msg.type === 'tip'">
			<chat-item-tipmsg :msg="msg"></chat-item-tipmsg>
		</template>
		
		<!-- 展示群通知消息 -->
		<template v-else-if="msg.type === 'notification'">
			<chat-item-notification :msg="msg"></chat-item-notification>
		</template>
		
		<template v-else>
			<!-- 整体消息结构 -->
			<view class="im-flex cell" :style="msgBoxStyle">
				<!-- 对方的头像 -->
				<nim-avatar v-if="msg.flow === 'in'" :account="msg.from"></nim-avatar>
				<!-- 消息盒子 -->
				<view class="im-flex-column im-align-start">
					<!-- 消息体 -->
					<nim-chat-wrapper :flow="msg.flow" :type="msg.type" :msg="msg" v-on="$listeners">
						<!-- 普通文本消息 -->
						<chat-item-text v-if="msg.type === 'text'" :msg="msg"></chat-item-text>
						<!-- 图片消息 -->
						<chat-item-image v-else-if="msg.type === 'image'" :msg="msg"></chat-item-image>
						<!-- 视频消息 -->
						<chat-item-video v-else-if="msg.type === 'video'" :msg="msg"></chat-item-video>
						<!-- 语音消息 -->
						<chat-item-audio v-else-if="msg.type === 'audio'" :msg="msg"></chat-item-audio>
						<!-- 自定义消息 -->
						<template v-else-if="msg.type === 'custom'">
							<!-- 跳转消息类型 -->
							<chat-item-navigate v-if="customType === 'votes'" :msg="msg"></chat-item-navigate>
							<chat-item-msgcard v-else-if="customType === 'msgCard'" :msg="msg"></chat-item-msgcard>
							<text v-else class="im-font-28">未定义的类型</text>
						</template>
						
					</nim-chat-wrapper>
					<!-- 消息体下方显示栏 -->
					<view class="im-flex im-align-center im-mt-1">
						<!-- 单聊消息的已读未读状态显示 -->
						<text v-if="msg.flow === 'out'" class="im-font-23 im-font-light">{{$attrs.nowSessionInfo.msgReceiptTime && $attrs.nowSessionInfo.msgReceiptTime > msg.time ? '已读' : '未读' }}</text>
						<!-- 消息的时间 -->
						<text :class="msg.flow === 'in' ? 'leftDate' : 'rightDate' ">{{msg.time | formatTime}}</text>
					</view>
					
				</view>
				<!-- 自己的头像 -->
				<nim-avatar v-if="msg.flow === 'out'" :account="msg.from"></nim-avatar>
			</view>
		</template>
		
	</view>
</template>

<script>
import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
import nimChatWrapper from '@/components/easy-chat/nim-chat-wrapper.vue'
import chatItemNavigate from '@/components/easy-chat/chat-item-navigate.vue'
import chatItemMsgcard from '@/components/easy-chat/chat-item-msgcard.vue'
import chatItemImage from '@/components/easy-chat/chat-item-image.vue'
import chatItemVideo from '@/components/easy-chat/chat-item-video.vue'
import chatItemAudio from '@/components/easy-chat/chat-item-audio.vue'
import chatItemText from '@/components/easy-chat/chat-item-text.vue'
import chatItemTipmsg from '@/components/easy-chat/chat-item-tipMsg.vue'
import chatItemNotification from '@/components/easy-chat/chat-item-notification.vue'

import useDayjs from '@/common/NIM/useDayjs.js'

export default {
	props: {
		msg: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	data() {
		return {
		}
	},
	components: {
		nimAvatar,
		nimChatWrapper,
		chatItemNavigate,
		chatItemMsgcard,
		chatItemImage,
		chatItemVideo,
		chatItemAudio,
		chatItemText,
		chatItemTipmsg,
		chatItemNotification
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
			return useDayjs.formatChatItemTime(n)
		}
	},
	methods: {
	}
}
</script>

<style scoped>
.cell {
	margin-top: 40rpx;
	padding: 0 20rpx;
}


.leftDate,
.rightDate {
	font-size: 24rpx;
	color: #999;
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
