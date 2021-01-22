<template>
	<view class="im-flex im-align-center im-ml-3 im-pr-3 im-py-2 im-border-bottom" @tap="onClick">
		<session-item-avatar :scene="$attrs.session.scene" :to="$attrs.session.to"></session-item-avatar>
		<text class="im-font-32 im-ml-2 im-text-ellipsis" style="max-width: 550rpx;">{{sessionName}}</text>
	</view>
</template>

<script>
	import sessionItemAvatar from '@/components/easy-chat/session-item-avatar.vue'
	export default {
		computed: {
			userObj() {
				return this.$store.getters['initNim/userObj']
			},
			teamObj() {
				return this.$store.getters['initNim/teamObj']
			},
			sessionName() {
				if (this.$attrs.session.scene === 'p2p') {
					return (this.userObj[this.$attrs.session.to] && this.userObj[this.$attrs.session.to].nick) || '未知用户'
				} else {
					return (this.teamObj[this.$attrs.session.to] && this.teamObj[this.$attrs.session.to].name) || '未知群'
				}
			}
		},
		components: {
			sessionItemAvatar
		},
		methods: {
			onClick() {
				this.$emit('itemClick', {
					session: this.$attrs.session,
					name: this.sessionName
				})
			}
		}
	}
</script>

<style>
</style>
