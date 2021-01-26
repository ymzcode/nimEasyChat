<template>
	<view class="im-flex im-flex-wrap im-justify-center im-align-center im-my-3 im-px-5">
		<text class="im-text-center im-bg-grey-2 im-font-28 im-font-light im-round-1 im-p-1 im-flex im-flex-wrap" style="max-width: 620rpx;">{{ content }}</text>
	</view>
</template>

<script>
	export default {
		computed: {
			content() {
				let text = '群通知消息'
				let msg = this.$attrs.msg
				let attach = msg.attach
				let type = attach.type
				switch (type) {
					case 'acceptTeamInvite':
						text = `${msg.fromNick} 加入了本群`
						break;
					case 'leaveTeam':
						text = `${msg.fromNick} 退出了本群`
						break;
				}
				return text
			}
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
