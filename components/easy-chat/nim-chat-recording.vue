<template>
	<view class="im-flex im-align-center im-justify-center im-bg-white im-round-3" hover-class="im-bg-grey-2" :hover-stay-time='0' @touchstart="touchstart" @touchend="touchend">
		<text class="im-font-30 im-font-black">{{ tipText }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 是否正在录制中
				isRecording: false
			}
		},
		computed: {
			// 提示文字
			tipText() {
				if (this.isRecording) {
					return '松开  发送'
				} else {
					return '按住  说话'
				}
			}
		},
		methods: {
			touchstart(e) {
				console.log('touchstart', e);
				this.isRecording = true
			},
			touchend(e) {
				console.log('touchend', e);
				this.isRecording = false
			}
		}
	}
</script>

<style>
</style>
