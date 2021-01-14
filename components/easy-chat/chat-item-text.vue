<template>
	<view class="im-flex im-flex-wrap im-position-relative" :style="boxStyle" style="max-width: 450rpx;min-width: 230rpx; height: auto;">
		<view v-for="(textVal, textIndex) in textNode" :key="textIndex">
			<image v-if="textVal.type === 'img'" :src="textVal.src" mode="aspectFit" style="width:40rpx;height:40rpx;"></image>
			<text v-else-if="textVal.type === 'text'" space="emsp" class="im-font-30 im-flex im-flex-wrap" style="max-width: 450rpx;word-wrap: break-word;word-break: break-all;">{{ textVal.text }}</text>
		</view>
		<!-- 不解析表情的文本样式 -->
		<!-- <text class="im-font-30 im-flex-1" style="max-width: 450rpx;min-width:210rpx;word-wrap: break-word;word-break: break-all;">{{ $attrs.msg.text }}</text> -->
	</view>
	
</template>

<script>
	import emoji from '@/common/NIM/emoji.js'
	export default {
		data() {
			return {
				textWidth: 0
			}
		},
		mounted() {
			this.textWidth = this.$attrs.msg.text.length * 30
		},
		computed: {
			textNode() {
				let arr = [];
				let msgArr = this.$attrs.msg.text.split(/(\[[^[\]]+\])/);
				
				msgArr.map(text => {
					if (text && text != '') {
						if (emoji.emojiList[text]) {
							let emo = {
								type: 'img',
								src: emoji.emojiBaseUrl + emoji.emojiList[text].file
							};
							
							arr.push(emo);
						} else {
							let rich = {
								type: 'text',
								text: text
							};
							
							arr.push(rich)
						}
					}
				});
				
				console.log(arr);
				return arr;
			},
			// 这里有一个坑
			// 如果不写死 最外层的宽度 里面的内容就会显示不全
			// 目前的解决办法暂时这样
			boxStyle() {
				if (this.textWidth === 0) {
					return ''
				}
				let width = this.textWidth < 230 ? 230 : this.textWidth > 450 ? 450 : this.textWidth
				return `width:${width}rpx`
			}
		}
	}
</script>

<style scoped>
</style>
