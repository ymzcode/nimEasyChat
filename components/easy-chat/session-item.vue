<template>
	<navigator :url="`/pages/easy-chat/chat?sessionId=${session.id}`">
		<view class="im-flex im-border-bottom im-py-2 im-pl-2">
			<!-- 头像展示 -->
			<session-item-avatar :scene="session.scene" :to="session.to"></session-item-avatar>
			<!-- 会话信息 -->
			<view class="im-flex-column im-flex-1 im-px-2">
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-32 im-text-ellipsis" style="max-width: 440rpx;">{{sessionName}}</text>
					<text class="im-font-25 im-font-light">{{session.updateTime | formatTime}}</text>
				</view>
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-28 im-text-ellipsis im-font-light" style="max-width: 540rpx;">{{lastMsgText}}</text>
					<view v-if="session.unread > 0" class="im-bg-red-2 im-round-full im-flex im-justify-center im-align-center" style="width: 35rpx;height: 35rpx;">
						<text class="im-font-23 im-font-white">{{ session.unread >= 99 ? 99 : session.unread}}</text>
					</view>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script>
import sessionItemAvatar from '@/components/easy-chat/session-item-avatar.vue'
import useDayjs from '@/common/NIM/useDayjs.js'


export default {
	props: {
		session: {
			type: Object,
			default: () => {
				return {}
			}
		}
	},
	components: {
		sessionItemAvatar
	},
	data() {
		return {}
	},
	computed: {
		userObj() {
			return this.$store.getters['initNim/userObj']
		},
		teamObj() {
			return this.$store.getters['initNim/teamObj']
		},
		sessionName() {
			if (this.session.scene === 'p2p') {
				return (this.userObj[this.session.to] && this.userObj[this.session.to].nick) || '未知用户'
			} else {
				return (this.teamObj[this.session.to] && this.teamObj[this.session.to].name) || '未知群'
			}
		},
		// 显示最后一条消息的简略信息
		lastMsgText() {
			let lastMsg = this.session.lastMsg
			let text = '[新消息]'
			switch(lastMsg.type) {
				case 'text':
					text = lastMsg.text
					break;
				case 'image':
					text = '图片消息'
					break;
				case 'audio':
					text = '音频消息'
					break;
				case 'video':
					text = '视频消息'
					break;
				case 'file':
					text = '文件消息'
					break;
				case 'custom':
					text = '自定义消息'
					break;
				case 'tip':
					text = '提醒消息'
					break;
				case 'notification':
					text = '群通知消息'
					let attach = lastMsg.attach
					let type = attach.type
					switch (type) {
						case 'acceptTeamInvite':
							text = `${lastMsg.fromNick} 加入了本群`
							break;
					}
					break;
			}
			return text
		}
	},
	filters: {
		formatTime(n) {
			return useDayjs.formatRelative24(n)
		}
	},
	methods: {
		
	}
}
</script>

<style scoped>
</style>
