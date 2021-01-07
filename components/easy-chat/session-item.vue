<template>
	<navigator :url="`/pages/easy-chat/chat?sessionId=${session.id}`">
		<view class="im-flex im-border-bottom im-py-2 im-pl-2">
			<!-- 头像展示 -->
			<nim-avatar v-if="session.scene === 'p2p'" :account="session.to"></nim-avatar>
			<team-avatar v-else :teamId="session.to"></team-avatar>
			<!-- 会话信息 -->
			<view class="im-flex-column im-flex-1 im-px-2">
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-32">{{sessionName}}</text>
					<text class="im-font-25 im-font-light">{{session.updateTime | formatTime}}</text>
				</view>
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-28 im-text-ellipsis im-font-light" style="max-width: 540rpx;">{{lastMsgText}}</text>
					<view class="im-bg-red-2 im-round-full im-flex im-justify-center im-align-center im-p-1">
						<text class="im-font-23 im-font-white">9</text>
					</view>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script>
import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
import teamAvatar from '@/components/easy-chat/team-avatar.vue'

// 引入dayjs 过滤时间
const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
require('dayjs/locale/zh-cn')

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
		nimAvatar,
		teamAvatar
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
			}
			return text
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
	},
	methods: {
		
	}
}
</script>

<style scoped>
</style>
