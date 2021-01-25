<template>
	<view class="im-flex im-mt-5 im-pl-3 im-pr-5">
		<image :src="attachTeam.avatar || '/static/easy-chat/sys/sys-icon-2@2x.png'" mode="aspectFill" style="width: 80rpx;height: 80rpx;"></image>
		<view class="im-flex-column im-flex-1 im-ml-2">
			<text class="im-font-28 im-font-light">[ {{userInfo.nick}} ] 入群邀请</text>
			<view class="im-flex-column im-border im-round-2 im-bg-white im-mt-1 im-px-2 im-pt-2" style="width: 570rpx;">
				<text class="im-font-32 im-font-black im-weight-500 im-py-1">群名称: {{ attachTeam.name }}</text>
				<text class="im-font-30 im-font-black im-weight-400 im-mt-2">邀请说明: {{ $attrs.sysmsg.ps }}</text>
				<text class="im-font-30 im-font-black im-weight-400 im-mt-2">群简介: {{ attachTeam.intro }}</text>
				<text class="im-font-30 im-font-black im-weight-400 im-mt-2">邀请时间: {{ $attrs.sysmsg.time | formatTime }}</text>
				<text class="im-font-30 im-font-black im-weight-400 im-mt-2">邀请人: {{ userInfo.nick }}</text>
				<view class="im-flex im-flex-1 im-justify-between im-align-center im-border-top im-mt-3">
					<text class="im-font-36 im-font-blue im-py-2 im-flex-1 im-text-center" @tap="accept">同意</text>
					<view style="width: 1px;height: 60rpx; background-color: #dee2e6;"></view>
					<text class="im-font-36 im-font-blue im-py-2 im-flex-1 im-text-center" @tap="refuse">拒绝</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import useDayjs from '@/common/NIM/useDayjs.js'
	
	export default {
		computed: {
			userObj() {
				return this.$store.getters['initNim/userObj'] || {}
			},
			// 来信人信息
			userInfo() {
				return this.userObj[this.$attrs.sysmsg.from] || {}
			},
			attachTeam() {
				return this.$attrs.sysmsg.attach.team
			}
		},
		filters: {
			formatTime(n) {
				if (!n) {
					return ''
				}
				return useDayjs.defaultFormat(n)
			}
		},
		methods: {
			accept() {
				console.log('接受');
			},
			refuse() {
				console.log('拒绝');
			}
		}
	}
</script>

<style>
</style>
