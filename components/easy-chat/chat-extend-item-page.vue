<template>
	<view class="im-flex-column">
		<swiper
		 class="im-bottom-menu-box"
		 :circular="false"
		 :indicator-dots="true"
		 indicator-active-color="#ffffff"
		 >
			<swiper-item v-for="(swiper, index) in main_menuList" :key="index" class="im-flex im-flex-wrap im-align-start im-py-2">
				<view class="im-flex-column im-align-center im-ml-3 im-mb-2" v-for="(item, index2) in swiper" :key="item.id">
					<view class="im-bg-white im-p-4 im-round-2">
						<image src="/static/logo.png" mode="aspectFill" style="width: 70rpx;height: 70rpx;"></image>
					</view>
					<text class="im-font-28 im-mt-1 im-font-black">{{item.name}}</text>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuList: [{
					id: 1,
					name: '照片',
					icon: ''
				}, {
					id: 2,
					name: '视频',
					icon: ''
				}, {
					id: 3,
					name: '语音通话',
					icon: ''
				}, {
					id: 4,
					name: '视频通话',
					icon: ''
				}, {
					id: 5,
					name: '文件',
					icon: ''
				}, {
					id: 6,
					name: '阅后即焚',
					icon: ''
				}, {
					id: 7,
					name: '投票消息',
					icon: ''
				}, {
					id: 8,
					name: '投票消息',
					icon: ''
				}, {
					id: 8,
					name: '投票消息',
					icon: ''
				}, {
					id: 8,
					name: '投票消息',
					icon: ''
				}]
			}
		},
		methods: {
			
		},
		computed: {
			main_menuList() {
				let newArr = []
				for(let i = 0; i < this.menuList.length; i += 8) {
					newArr.push(this.menuList.slice(i, i + 8))
				}
				console.log(newArr);
				return newArr
			}
		}
	}
</script>

<style scoped>
</style>
