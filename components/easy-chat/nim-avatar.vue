<template>
	<view class="">
		<image src="/static/logo.png" mode="aspectFill" class="easy-chat-img"></image>
	</view>
</template>

<script>
	export default {
		props: {
			// 用户的nim账号id
			account: {
				type: [Number, String],
				default: ''
			}
		},
		mounted() {
			console.log('当前传入的账号id', this.account)
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.easy-chat-img {
	width: 80rpx;
	height: 80rpx;
}
</style>
