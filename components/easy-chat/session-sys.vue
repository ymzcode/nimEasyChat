<template>
	<navigator :url="``">
		<view class="im-flex im-border-bottom im-py-2 im-pl-2">
			<!-- 头像展示 -->
			<image src="/static/easy-chat/sys/sys-icon@2x.png" mode="aspectFill" style="width: 90rpx;height: 90rpx;"></image>
			<!-- 会话信息 -->
			<view class="im-flex-column im-flex-1 im-px-2">
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-32 im-font-black">系统消息</text>
					<text class="im-font-25 im-font-light">12月10日</text>
				</view>
				<view class="im-flex im-flex-1 im-justify-between im-align-center">
					<text class="im-font-28 im-text-ellipsis im-font-light" style="max-width: 540rpx;">新系统消息</text>
					<view class="im-bg-red-2 im-round-full im-flex im-justify-center im-align-center" style="width: 35rpx;height: 35rpx;">
						<text class="im-font-23 im-font-white">90</text>
					</view>
				</view>
			</view>
		</view>
	</navigator>
</template>

<script>
</script>

<style>
</style>
