<template>
	<view class="im-flex-column" style="width: 450rpx;" @tap="onClick">
		<text class="im-font-32 im-font-black im-line-height-45">{{ title }}</text>
		<text class="im-font-28 im-font-light im-my-3 im-line-height-40">{{ detail }}</text>
		<view class="im-border-top im-flex im-pt-1">
			<image src="/static/easy-chat/chat/app-logo@2x.png" mode="aspectFill" style="width: 30rpx;height: 30rpx;"></image>
			<text class="im-font-28 im-font-light im-ml-2">{{ appName }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			// 读取传入的自定义消息的内容
			msgContent() {
				return JSON.parse(this.$attrs.msg.content)
			},
			// 跳转的链接
			url() {
				if (this.msgContent.data) {
					return this.msgContent.data.url
				}
				return ''
			},
			// 标题
			title() {
				if (this.msgContent.data) {
					return this.msgContent.data.title
				}
				return '未知链接'
			},
			// 详情
			detail() {
				if (this.msgContent.data) {
					return this.msgContent.data.detail
				}
				return '未知详情'
			},
			// 应用名称
			appName() {
				if (this.msgContent.data) {
					return this.msgContent.data.appName
				}
				return '未知应用'
			}
		},
		methods: {
			onClick(event) {
				// uni.showToast({
				// 	title: `当前传递的链接${this.url}`,
				// 	icon: 'none'
				// })
				uni.navigateTo({
					url: this.url
				})
				event.stopPropagation()
			}
		}
	}
</script>

<style>
</style>
