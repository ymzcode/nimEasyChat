<template>
	<view @tap="onClick" style="max-width: 450rpx;min-width:210rpx;">
		<text class="im-font-30">语音，点我播放 {{ isPlay }} {{ dur | filterDur }}''</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				innerAudioContext : uni.createInnerAudioContext(),
				// 判断是否播放中
				isPlay: false,
				dur: this.$attrs.msg.file.dur
			}
		},
		computed: {
			playAudioId() {
				return this.$store.getters['initNim/playAudioId']
			}
		},
		watch: {
			playAudioId(n) {
				console.log('新数据', n);
				if (n != this.$attrs.msg.idClient) {
					this.innerAudioContext.stop()
				}
			},
			isPlay(n) {
				if (!n) {
					this.dur = this.$attrs.msg.file.dur
				}
			}
		},
		filters: {
			// 过滤显示播放时间
			filterDur(n) {
				if (n > 0) {
					return Math.round(n / 1000)
				} else {
					return 0
				}
			}
		},
		mounted() {
			this.innerAudioContext.onPlay(() => {
				console.log('开始播放');
				this.isPlay = true
				this.censusDur()
				this.$store.commit('initNim/setAudioId', this.$attrs.msg.idClient)
			});
			this.innerAudioContext.onError((res) => {
				console.error('播放遇到错误', res);
				this.isPlay = false
				this.$store.commit('initNim/removeAudioId')
			});
			this.innerAudioContext.onStop(() => {
				console.log('停止播放');
				this.isPlay = false
			})
			this.innerAudioContext.onEnded(() => {
				console.log('音频自然播放结束事件');
				this.isPlay = false
				this.$store.commit('initNim/removeAudioId')
			})
		},
		methods: {
			onClick() {
				this.innerAudioContext.stop()
				this.innerAudioContext.src = this.$attrs.msg.file.url
				
				this.innerAudioContext.play()
			},
			// 计算时间
			censusDur() {
				this.dur = this.dur - 500
				setTimeout(() => {
					if (this.dur > 0 && this.isPlay) {
						this.censusDur()
					}
				}, 500)
			}
		},
		beforeDestroy() {
			this.innerAudioContext.destroy()
			
			this.$store.commit('initNim/removeAudioId')
		},
	}
</script>

<style>
</style>
