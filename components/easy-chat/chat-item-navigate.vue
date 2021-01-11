<template>
	<view class="im-flex-column" style="width: 450rpx;" @tap="onClick">
		<text class="im-font-red im-font-28">{{ title }}</text>
		<text class="im-font-32 im-font-black im-my-2">{{ detail }}</text>
		<image v-if="cover" :src="cover" mode="aspectFill" style="width: 450rpx;height: 300rpx;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
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
			// 封面
			cover() {
				if (this.msgContent.data) {
					return this.msgContent.data.cover
				}
				return ''
			}
		},
		methods: {
			onClick() {
				uni.showToast({
					title: `当前传递的链接${this.url}`,
					icon: 'none'
				})
			}
		}
	}
</script>

<style scoped>
	
</style>
