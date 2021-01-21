<template>
	<view class="im-flex im-mt-5 im-pl-3 im-pr-5">
		<image :src="$attrs.sysmsg.content.data.icon || '/static/easy-chat/sys/sys-icon-2@2x.png'" mode="aspectFill" style="width: 80rpx;height: 80rpx;"></image>
		<view class="im-flex-column im-flex-1 im-ml-2">
			<text class="im-font-28 im-font-light">{{ $attrs.sysmsg.content.data.subtitle || '' }}</text>
			<view class="im-border im-round-2 im-py-3 im-px-1 im-bg-white im-mt-1 im-pl-3">
				<text class="im-font-32 im-font-black im-weight-500">{{ $attrs.sysmsg.content.data.title || '默认系统通知标题' }}</text>
				<text class="im-font-30 im-font-black im-weight-400 im-mt-2">{{ $attrs.sysmsg.content.data.detail || '暂无详情' }}</text>
				<view @tap="onClick" class="im-flex im-flex-1 im-justify-center im-align-center im-border-top im-mt-3">
					<text class="im-font-36 im-font-blue im-pt-2">{{ $attrs.sysmsg.content.data.buttonText || '查看详情' }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			onClick() {
				console.log('消息', this.$attrs.sysmsg);
				
				uni.showToast({
					title: this.$attrs.sysmsg.content.data.url,
					icon: 'none'
				})
				
			}
		}
	}
</script>

<style>
</style>
