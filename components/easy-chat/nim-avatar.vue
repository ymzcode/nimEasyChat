<template>
	<view class="" @tap="searchUser"><image :src="main_img" mode="aspectFill" class="easy-chat-img" @error="imageError" lazy-load></image></view>
</template>

<script>
import config from '@/common/NIM/config.js';
export default {
	props: {
		// 用户的nim账号id
		account: {
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
			defaultUserIcon: config.defaultUserIcon,
			imgErr: false
		};
	},
	computed: {
		userObj() {
			return this.$store.getters['initNim/userObj'];
		},
		main_img() {
			if (this.imgErr) {
				return this.defaultUserIcon;
			}
			if (this.src != '') {
				return this.src;
			}
			if (this.userObj[this.account] && this.userObj[this.account].avatar) {
				return this.userObj[this.account].avatar;
			}
			return this.defaultUserIcon;
		}
	},
	mounted() {
		console.log('当前传入的账号id', this.account);
		if (this.account != '' && !this.userObj[this.account]) {
			this.searchUser()
		}
	},
	methods: {
		imageError(e) {
			console.error('imageError', e);
			this.imgErr = true;
		},
		// 搜索用户
		searchUser() {
			this.$store.dispatch('initNim/nimGetUser', this.account)
		}
	}
};
</script>

<style scoped>
.easy-chat-img {
	width: 90rpx;
	height: 90rpx;
}
</style>
