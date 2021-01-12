<template>
	<view class="im-flex-column" @tap="onClick"><image :style="`width: ${imgSize.width}rpx; height: ${imgSize.height}rpx`" :src="mainImg" mode="aspectFit" style="max-width: 450rpx;" lazy-load></image></view>
</template>

<script>
export default {
	computed: {
		mainImg() {
			let url = ''
			url = this.$attrs.msg.file.url
			// console.log('this.$attrs.msg.file.url', url);
			// 处理图片
			let newImageUrl = this.$store.getters['initNim/nim'].viewImageSync({
				url: url, // 必填
				strip: true, // 去除图片元信息 true or false 可选填
				quality: 80, // 图片质量 0 - 100 可选填
				interlace: true, // 渐变清晰， 可选填
				thumbnail: {
					// 生成缩略图， 可选填
					width: this.setImageSize().width * 2,
					height: this.setImageSize().height * 2,
					mode: 'cover'
				}
			});
			url = newImageUrl
			console.log(newImageUrl);
			return url;
		},
		imgSize() {
			let imgSize = this.setImageSize()
			// console.log('当前图片的大小', imgSize);
			return imgSize
		}
	},
	methods: {
		onClick() {
			uni.previewImage({
				urls: [this.$attrs.msg.file.url]
			});
		},
		setImageSize() {
			let imgSize = {
				width: 100,
				height: 100
			}
			let width = this.$attrs.msg.file.w
			let height = this.$attrs.msg.file.h
			let coe = 0
			if (width > 450) {
				coe = 450 / width
				imgSize.width = 450
				imgSize.height = Math.round(coe * height)
			} else {
				imgSize.width = width
				imgSize.height = height
			}
			return imgSize
		}
	}
};
</script>

<style scoped></style>
