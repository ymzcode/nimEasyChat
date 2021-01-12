<template>
	<view class="im-flex-column im-position-relative im-justify-center im-align-center" @tap="gotoVideoPage" style="width: 400rpx;height: 400rpx;">
		<image :src="coverImg" mode="aspectFill" style="width: 400rpx;height: 400rpx;"></image>
		<view class="im-bg-grey-3 im-flex-1 im-position-absolute im-top-0 im-left-0 im-right-0 im-bottom-0" style="opacity: 0.6;"></view>
		<image class="im-position-absolute" src="/static/easy-chat/chat/play-video.png" mode="aspectFill" style="width: 80rpx;height: 80rpx;"></image>
	</view>
</template>

<script>
	export default {
		computed: {
			coverImg() {
				/*
				vframe	视频截图的操作标记	是
				offset	从第几秒开始截，缺省为0	否
				resize	widthxheight,宽和高	否
				crop	crop=x_y_width_height 表示从原坐标(x, y)处截取width*height的子图片	否
				type	图片格式，默认为jpg	否
				*/
				return this.$attrs.msg.file.url + '&vframe'
			}
		},
		methods: {
			gotoVideoPage() {
				console.log('前往视频页', this.$attrs.msg.file.url);
				uni.navigateTo({
					url: '/pages/easy-chat/video?url=' + this.$attrs.msg.file.url
				})
			}
		}
	}
</script>

<style scoped>
</style>
