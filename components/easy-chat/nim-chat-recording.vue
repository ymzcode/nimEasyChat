<template>
	<view class="im-flex im-align-center im-justify-center im-bg-white im-round-3" hover-class="im-bg-grey-2" :hover-stay-time='0' @touchstart="touchstart" @touchend="touchend">
		<text class="im-font-30 im-font-black">{{ tipText }}</text>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();

	export default {
		data() {
			return {
				// 是否正在录制中
				isRecording: false,
				// 录制的文件地址
				voicePath: '',
				// 判断录音文件是否有效
				fileOk: false
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
			},
			// 当前会话的id
			currentSessionId() {
				return this.$store.getters['initNim/currentSessionId']
			}
		},
		mounted() {
			let _self = this;
			// 注册停止事件
			recorderManager.onStop(function (res) {
				if (!_self.fileOk) {
					uni.showToast({
						title: '说话时间过短，请重新录制',
						icon: 'none'
					})
					return ;
				}
				_self.voicePath = res.tempFilePath;
				console.log('录制结束' , res);
				_self.$store.dispatch('initNim/nimSendFile', {
					type: 'audio',
					filePath: res.tempFilePath,
					scene: _self.currentSessionId.split('-')[0],
					to: _self.currentSessionId.split('-')[1]
				});
			});
			// 注册录音错误事件
			recorderManager.onError(function (error) {
				console.error('录制出现错误', error);
			})
		},
		methods: {
			touchstart(e) {
				console.log('touchstart', e);
				this.isRecording = true
				this.startRecord()
				e.stopPropagation()
			},
			touchend(e) {
				console.log('touchend', e);
				this.isRecording = false
				this.endRecord()
				e.stopPropagation()
			},
			startRecord() {
				console.log('开始录音');
				this.fileOk = false
				recorderManager.start({
					duration: 1000 * 60 ,// 1分钟
					format: 'mp3',
				});
				setTimeout(() => {
					this.fileOk = true
				}, 1500)
			},
			endRecord() {
				console.log('录音结束');
				recorderManager.stop();
			}
		}
	}
</script>

<style>
</style>
