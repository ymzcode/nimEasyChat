<template>
	<view class="im-flex im-bottom-menu-box im-bottom-menu-box">
		<list class="im-flex-1">
			<cell v-for="(item, index) in emojiList" :key="index">
				<view class="im-flex im-align-center im-justify-around im-mt-2">
					<image class="im-mx-1" v-for="(item2, index2) in item" :key="item2.text" :src="`${emojiBaseUrl}${item2.file}`" lazy-load mode="aspectFill" style="width: 60rpx;height: 60rpx;"></image>
				</view>
			</cell>
			<cell>
				<view style="height: 60rpx;"></view>
			</cell>
		</list>
		<view class="im-border-left im-flex-column im-align-center im-justify-around" style="width: 200rpx;">
			<view class="im-round-2 im-bg-grey-2 im-flex im-justify-center im-align-center" style="width: 150rpx;height: 150rpx;">
				<text class="im-font-28">删除</text>
			</view>
			<view class="im-round-2 im-bg-grey-2 im-flex im-justify-center im-align-center" style="width: 150rpx;height: 250rpx;">
				<text class="im-font-28">发送</text>
			</view>
		</view>
	</view>
	
</template>

<script>
import emoji from '@/common/NIM/emoji.js'
export default {
	data() {
		return {
			emojiBaseUrl: emoji.emojiBaseUrl
		}
	},
	computed: {
		emojiList() {
			let arr = []
			let lineArr = []
			for (let i in emoji.emojiList) {
				if (lineArr.length >= 6) {
					arr.push(lineArr)
					lineArr = []
				}
				let obj = {}
				obj.text = i
				obj.file = emoji.emojiList[i].file
				lineArr.push(obj)
			}
			console.log(arr);
			return arr
		}
	}
}
</script>

<style>
</style>
