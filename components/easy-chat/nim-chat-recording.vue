<template>
	<view class="im-flex im-align-center im-justify-center im-bg-white im-round-3" hover-class="im-bg-grey-2" :hover-stay-time='0' @touchstart="touchstart" @touchcancel="touchcancel" @touchmove="touchmove" @touchend="touchend">
		<text class="im-font-30 im-font-black">{{ tipText }}</text>
		
		<!-- 提示框 悬浮于整体之外 -->
		<view v-if="isRecording" class="im-position-fixed im-flex im-justify-center im-w-100" style="top: 400rpx;">
			<view class="im-flex-column im-align-center im-px-2 im-py-4 im-round-2" :class="boxBg">
				<image :src="iconImg" mode="aspectFit" style="width: 100rpx;height: 100rpx;"></image>
				<text class="im-font-white im-font-28 im-mt-3">{{ toastText }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	const recorderManager = uni.getRecorderManager();
	
	// 简单节流
	let moveFlag = false
	
	export default {
		data() {
			return {
				// 是否正在录制中
				isRecording: false,
				// 录制的文件地址
				voicePath: '',
				// 判断录音文件是否有效
				fileOk: false,
				// 判断是否取消发送
				isCancel: false
			}
		},
		computed: {
			// 文本框提示文字
			tipText() {
				if (this.isRecording) {
					return '松开  发送'
				} else {
					return '按住  说话'
				}
			},
			// 展示框中的提示文字
			toastText() {
				if (this.isCancel) {
					return '松开手指，取消发送'
				} else {
					return '松开发送，上滑取消'
				}
			},
			// 当前会话的id
			currentSessionId() {
				return this.$store.getters['initNim/currentSessionId']
			},
			// 图标
			iconImg() {
				return this.isCancel ? '/static/easy-chat/audio/cancel.png' : '/static/easy-chat/audio/recording.gif'
			},
			// boxBg
			boxBg() {
				return this.isCancel ? 'im-bg-red-3' : 'im-bg-grey-3'
			}
		},
		mounted() {
			let _self = this;
			// 注册停止事件
			recorderManager.onStop(function (res) {
				// 文件无效
				if (!_self.fileOk) {
					uni.showToast({
						title: '说话时间过短，请重新录制',
						icon: 'none'
					})
					return ;
				}
				
				// 取消发送
				if (_self.isCancel) {
					console.log('——————取消发送');
					return ;
				}
				
				_self.voicePath = res.tempFilePath;
				console.log('录制结束' , res);
				_self.$store.dispatch('initNim/nimSendFile', {
					type: 'audio',
					filePath: res.tempFilePath,
					scene: _self.currentSessionId.split('-')[0],
					to: _self.currentSessionId.split('-')[1]
				}).then(res => {
					_self.tipAudio()
				})
			});
			// 注册录音错误事件
			recorderManager.onError(function (error) {
				console.error('录制出现错误', error);
			})
		},
		methods: {
			touchcancel(e) {
				console.log('录制被中断');
				this.isCancel = true
				// 结束录制
				this.touchend()
			},
			touchmove(e) {
				let _self = this
				if (moveFlag) {
					return;
				}
				// console.log('移动', e);
				moveFlag = true;
				
				if (e.touches[0].pageY < 0) {
					_self.isCancel = true
				} else {
					_self.isCancel = false
				}
				
				setTimeout(() => {
					moveFlag = false
				}, 200)
				
				e.stopPropagation()
			},
			// 语音发送完成的提示音
			tipAudio() {
				let inner2 = uni.createInnerAudioContext()
				inner2.src = '/static/easy-chat/mp3/audio-send.wav'
				inner2.autoplay = true
				inner2.play()
				inner2.onEnded(() => {
					console.log('tishixin jieshu');
					inner2.destroy()
				})
			},
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
				// 录制时间超过1s 才算有限录音
				setTimeout(() => {
					this.fileOk = true
				}, 1000)
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
