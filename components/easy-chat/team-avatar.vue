<template>
	<view class=""><image :src="main_img" mode="aspectFill" class="easy-chat-img" @error="imageError" lazy-load></image></view>
</template>

<script>
import config from '@/common/NIM/config.js';
export default {
	props: {
		// 用户的nim账号id
		teamId: {
			type: [Number, String],
			default: ''
		},
		// 图片的地址
		src: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			defaultGroupIcon: config.defaultGroupIcon,
			defaultAdvancedIcon: config.defaultAdvancedIcon,
			imgErr: false
		};
	},
	computed: {
		teamObj() {
			return this.$store.getters['initNim/teamObj'];
		},
		main_img() {
			if (this.imgErr) {
				if (this.teamObj[this.teamId] && this.teamObj[this.teamId].type === 'advanced') {
					return this.defaultAdvancedIcon
				} else {
					return this.defaultGroupIcon
				}
			}
			if (this.src != '') {
				return this.src;
			}
			if (this.teamObj[this.teamId] && this.teamObj[this.teamId].avatar) {
				return this.teamObj[this.teamId].avatar;
			}
			return this.defaultGroupIcon;
		}
	},
	mounted() {
		console.log('当前传入的账号id', this.teamId);
	},
	methods: {
		imageError(e) {
			console.error('imageError', e);
			this.imgErr = true;
		}
	}
};
</script>

<style scoped>
.easy-chat-img {
	width: 80rpx;
	height: 80rpx;
}
</style>
