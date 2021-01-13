<template>
	<view class="im-flex im-flex-wrap" style="max-width: 450rpx;height: auto;">
		<view v-for="(textVal, textIndex) in textNode" :key="textIndex" >
			<image v-if="textVal.type === 'img'" :src="textVal.src" mode="aspectFill" style="width:20px;height:20px;"></image>
			<text v-if="textVal.type === 'text'" class="im-font-30 im-flex im-flex-wrap" style="max-width: 450rpx;  word-wrap: break-word;word-break: break-all;">{{ textVal.text }}</text>
		</view>
		<!-- 不解析表情的文本样式 -->
		<!-- <text class="im-font-30 im-flex-1" style="max-width: 450rpx;min-width:210rpx;word-wrap: break-word;word-break: break-all;">{{ $attrs.msg.text }}</text> -->
	</view>
	
</template>

<script>
	import emoji from '@/common/NIM/emoji.js'
	export default {
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
		}
	}
</script>

<style scoped>
</style>
