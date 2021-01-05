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
			this.searchUser();
		}
	},
	methods: {
		imageError(e) {
			console.error('imageError', e);
			this.imgErr = true;
		},
		// 搜索用户
		searchUser() {
			this.$store.dispatch('initNim/delegateNimFunction', {
				functionName: 'getUser',
				options: {
					account: String(this.account),
					done: (error, user) => {
						try {
							if (error) {
								this.$store.state.initNim.errCommon.uploadInfo(error);
							} else if (user) {
								this.$store.commit('initNim/saveUserData', user);
								console.log('获取用户名片', error, user);
							}
						} catch (e) {
							//TODO handle the exception
							console.error('getUser', e);
							this.$store.state.initNim.errCommon.uploadInfo(e);
						}
					}
				}
			});
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
