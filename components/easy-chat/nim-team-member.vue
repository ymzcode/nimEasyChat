<template>
	<view class="im-flex-column im-bg-white im-py-3 im-mt-3 im-px-3" @tap="onClick">
		<view class="im-flex im-align-center im-justify-between">
			<text class="im-font-32 im-font-black">群成员</text>
			<text class="im-font-light im-font-25">{{ $attrs.detailInfo.memberNum }}人 ></text>
		</view>
		<view class="im-flex im-align-center im-pt-2">
			<view class="im-flex-column im-mx-1 im-align-center" v-for="item in membersArr" :key="item.account">
				<nim-avatar :account="item.account" style="height: 72rpx;width: 72rpx;"></nim-avatar>
				<text v-if="item.nickInTeam" class="im-font-light im-font-25 im-mt-1 im-text-ellipsis" style="width: 90rpx;">{{ item.nickInTeam }}</text>
			</view>
			
			<!-- 加号 -->
			<image class="im-mx-1" src="/static/easy-chat/details/create-team@2x.png" mode="aspectFill" style="width: 72rpx;height: 72rpx;"></image>
		</view>
	</view>
</template>

<script>
	import nimAvatar from '@/components/easy-chat/nim-avatar.vue'
	
	export default {
		computed: {
			teamMembersObj() {
				return this.$store.getters['initNim/teamMembersObj']
			},
			// 当前群组的群成员
			membersArr() {
				if (this.teamMembersObj[this.$attrs.detailInfo.teamId]) {
					return this.teamMembersObj[this.$attrs.detailInfo.teamId].members.slice(0, 7)
				}
				return []
			}
		},
		components: {
			nimAvatar
		},
		mounted() {
			this.$store.dispatch('initNim/nimGetTeamMembers', this.$attrs.detailInfo.teamId)
		},
		methods: {
			onClick() {
				console.log('点击群成员');
			}
		}
	}
</script>

<style>
</style>
