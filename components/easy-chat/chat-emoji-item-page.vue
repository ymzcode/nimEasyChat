<template>
	<view class="im-flex" style="height: 450rpx;">
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
		<view class="im-bg-blue-1" style="width: 200rpx;">
			<text>占位</text>
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
