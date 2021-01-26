<template>
	<view class="im-flex-column im-position-relative im-w-100">
		<view class="status-bg" :style="{ height: statusBarHeight }"></view>
		
		<view class="im-flex im-align-center im-bg-white im-justify-between im-px-3 im-position-relative im-border-bottom" style="height: 44px;">
			<!-- 中 -->
			<view class="im-position-absolute im-flex-1 im-top-0 im-bottom-0 im-left-0 im-right-0 im-justify-center im-align-center">
				<slot></slot>
			</view>
			<!-- 左 -->
			<view class="">
				<slot name="left">
					<view class="im-flex im-align-center" @tap="back">
						<image src="/static/easy-chat/chat/back.png" mode="aspectFill" style="width: 30rpx;height: 35rpx;"></image>
						<!-- <text class="im-font-34 im-font-black im-py-2 im-ml-1">返回</text> -->
					</view>
				</slot>
			</view>
			<!-- 右 -->
			<view class="">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script>
	let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
	export default {
		data() {
			return {
				statusBarHeight: statusBarHeight,
			}
		},
		methods: {
			back() {
				uni.navigateBack()
			}
		}
	}
</script>

<style scoped>
.status-bg {
	background-color: #787878;
}
</style>
