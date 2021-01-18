<template>
	<navigator :url="`/pages/easy-chat/chat-system`" @tap="onClick">
		<view class="im-flex im-border-bottom im-py-2 im-pl-2">
			<!-- 头像展示 -->
			<image src="/static/easy-chat/sys/sys-icon@2x.png" mode="aspectFill" style="width: 90rpx;height: 90rpx;"></image>
			<!-- 会话信息 -->
			<view class="im-flex-column im-flex-1 im-px-2">
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-32 im-font-black">系统消息</text>
					<text class="im-font-25 im-font-light">{{ newMsg.time | formatTime }}</text>
				</view>
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-28 im-text-ellipsis im-font-light" style="max-width: 540rpx;">{{ detailInfo }}</text>
					<view v-if="systemUnreadNum > 0" class="im-bg-red-2 im-round-full im-flex im-justify-center im-align-center" style="width: 35rpx;height: 35rpx;">
						<text class="im-font-23 im-font-white">{{ systemUnreadNum }}</text>
					</view>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script>
	import useDayjs from '@/common/NIM/useDayjs.js'
	export default {
		data() {
			return {
				systemUnreadNum: 0
			}
		},
		computed: {
			systemMsgArr() {
				this.updateSystemUnreadNum()
				return this.$store.getters['initNim/systemMsgArr']
			},
			newMsg() {
				let sysmsg = this.systemMsgArr[0]
				if (sysmsg) {
					return sysmsg
				} else {
					return {}
				}
			},
			// 要展示的详情内容
			detailInfo() {
				let text = '暂无系统消息'
				if (this.newMsg.content) {
					let content = this.newMsg.content
					switch(content.type) {
						case 'tipSysMsg':
							text = content.data.detail
							break;
					}
				}
				return text
			}
		},
		mounted() {
			this.updateSystemUnreadNum()
		},
		filters: {
			formatTime(n) {
				if (!n) {
					return ''
				}
				return useDayjs.formatRelative24(n)
			}
		},
		methods: {
			onClick() {
				this.systemUnreadNum = 0
				uni.setStorageSync('systemUnreadNum', 0)
			},
			updateSystemUnreadNum() {
				console.log('更新系统消息的未读数');
				this.systemUnreadNum = uni.getStorageSync('systemUnreadNum') || 0
			}
		}
	}
</script>

<style>
</style>
